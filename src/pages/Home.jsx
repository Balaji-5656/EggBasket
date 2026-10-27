import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg";

function Home() {
  const [buttonHover, setButtonHover] = React.useState(false);
  const [cardHover, setCardHover] = React.useState([false, false, false]);

  const styles = {
    homeContainer: {
      fontFamily: "'Poppins', sans-serif",
      color: "#b73333ff",
      margin: 0,
      padding: 0,
      lineHeight: 1.6,
    },
    bannerWrapper: {
      position: "relative",
      width: "100%",
      minHeight: "500px",
      overflow: "hidden",
      borderRadius: "16px",
    },
    bannerImage: {
      width: "100%",
      height: "500px",
      objectFit: "cover",
      filter: "brightness(0.75)",
      transition: "transform 0.5s ease",
    },
    overlayContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "90%",
      maxWidth: "700px",
    },
    bannerTitle: {
      fontSize: "clamp(2rem, 6vw, 3rem)",
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: "0.5rem",
      textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
    },
    bannerSubtitle: {
      fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
      color: "#f0f0f0",
      textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
      marginBottom: "1.5rem",
    },
    shopButton: {
      padding: "14px 36px",
      background: buttonHover ? "linear-gradient(90deg, #fbb034, #ffdd00)" : "linear-gradient(90deg, #ffdd00, #fbb034)",
      color: "#222",
      fontWeight: 600,
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: buttonHover ? "0 6px 20px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.15)",
    },
    highlights: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1.5rem",
      margin: "4rem 5%",
    },
    highlightCard: {
      flex: "1 1 250px",
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "2rem 1.5rem",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    highlightCardTitle: {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
      color: "#333",
    },
    highlightCardText: {
      fontSize: "1rem",
      color: "#555",
    },
  };

  const highlightItems = [
    { title: "🚜 Farm Fresh", text: "Eggs directly sourced from local farms." },
    { title: "🌿 100% Organic", text: "Healthy, chemical-free & natural." },
    { title: "🚚 Fast Delivery", text: "Get your eggs delivered within hours." },
  ];

  return (
    <div style={styles.homeContainer}>
      <div
        style={styles.bannerWrapper}
      >
        <img
          src={banner}
          alt="Fresh Eggs Banner"
          style={{ ...styles.bannerImage }}
        />

        <div style={styles.overlayContent}>
          <h1 style={styles.bannerTitle}>🥚 Fresh & Healthy Eggs</h1>
          <p style={styles.bannerSubtitle}>
            Delivered straight from farm to your home
          </p>
          <Link to="/shop">
            <button
              style={styles.shopButton}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              🛒 Shop Now
            </button>
          </Link>
        </div>
      </div>

      <div style={styles.highlights}>
        {highlightItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.highlightCard,
              transform: cardHover[index] ? "translateY(-6px)" : "translateY(0)",
              boxShadow: cardHover[index]
                ? "0 12px 24px rgba(0,0,0,0.15)"
                : "0 4px 12px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={() =>
              setCardHover((prev) =>
                prev.map((v, i) => (i === index ? true : v))
              )
            }
            onMouseLeave={() =>
              setCardHover((prev) =>
                prev.map((v, i) => (i === index ? false : v))
              )
            }
          >
            <h2 style={styles.highlightCardTitle}>{item.title}</h2>
            <p style={styles.highlightCardText}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
