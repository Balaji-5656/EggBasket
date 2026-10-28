const express = require("express");
const rateLimit = require("express-rate-limit");
const { GoogleGenAI } = require("@google/genai");
const Product = require("../models/Product");

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 503/429 vasthe retry chesi, tarvata fallback model try chestundi
async function generateWithRetry(params) {
  const models = [MODEL, FALLBACK_MODEL].filter(Boolean);

  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await ai.models.generateContent({ ...params, model });
      } catch (err) {
        const retryable = err.status === 503 || err.status === 429;
        console.warn(`Gemini ${model} attempt ${attempt} failed (${err.status})`);
        if (!retryable) throw err; // vere error ayithe vెంటనే aapu
        await sleep(attempt * 1000); // 1s, 2s, 3s wait
      }
    }
  }

  const error = new Error("All Gemini models unavailable");
  error.status = 503;
  throw error;
}

// Spam nundi kapadadaniki
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please wait a minute." },
});

router.post("/", chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array required" });
    }

    // Last 10 messages, content length limit
    const history = messages.slice(-10).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 1000) }],
    }));

    // First message "user" tho start avvali
    while (history.length > 0 && history[0].role !== "user") {
      history.shift();
    }
    if (history.length === 0) {
      return res.status(400).json({ error: "at least one user message required" });
    }

    // Products DB nundi
    const products = await Product.find().limit(50).lean();
    const productInfo =
      products.length === 0
        ? "No products available right now."
        : products
            .map(
              (p) =>
                `- ${p.name} | Category: ${p.category} | ₹${p.price} | ${
                  p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"
                }${p.description ? ` | ${p.description}` : ""}`
            )
            .join("\n");

    const system = `You are the EggBasket shopping assistant.
Answer ONLY using the information below. If something is not in it, say you don't know and suggest contacting support.
Keep answers short and friendly. Reply in the same language the customer uses.

PRODUCTS:
${productInfo}

STORE INFO:
- Delivery: (mee delivery details rayandi)
- Returns: (mee return policy rayandi)`;

    const response = await generateWithRetry({
      contents: history,
      config: {
        systemInstruction: system,
        maxOutputTokens: 500,
      },
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error("Chat error FULL:", err);
    const busy = err.status === 503 || err.status === 429;
    res.status(busy ? 503 : 500).json({
      error: busy
        ? "Assistant is busy right now. Please try again in a few seconds."
        : "Assistant unavailable, please try again.",
    });
  }
});

module.exports = router;