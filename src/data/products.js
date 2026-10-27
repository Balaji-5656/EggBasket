import whiteEggs from "../assets/white-eggs.jpg";
import brownEggs from "../assets/brown-eggs.jpg";
import freeRange from "../assets/free-range-eggs.jpg";
import cageFree from "../assets/cage-free-eggs.jpg";
import organicEggs from "../assets/organic-eggs.jpg";
import duckEggs from "../assets/duck-eggs.jpg";
import quailEggs from "../assets/quail-eggs.jpg";
import omegaEggs from "../assets/omega3-eggs.jpg";
import vitaminEggs from "../assets/vitamin-eggs.jpg";
import desiEggs from "../assets/desi-eggs.jpg";

export const products = [
  {
    id: 1,
    name: "White Eggs (30 Pack)",
    price: 200,
    image: whiteEggs,
    category: "White Eggs",
    description:
      "Fresh white chicken eggs sourced directly from trusted local farms. Rich in protein and perfect for daily nutrition.",
    rating: 4.7,
    stock: 100,
    nutrition: {
      protein: "6g",
      calories: "70",
      fat: "5g",
      vitaminD: "10%"
    },
    benefits: [
      "High Protein",
      "Farm Fresh",
      "Rich in Vitamins"
    ]
  },

  {
    id: 2,
    name: "Brown Eggs (12 Pack)",
    price: 110,
    image: brownEggs,
    category: "Brown Eggs",
    description:
      "Naturally nutritious brown eggs with a rich taste and excellent nutritional value.",
    rating: 4.8,
    stock: 80,
    nutrition: {
      protein: "6.5g",
      calories: "72",
      fat: "5g",
      vitaminD: "12%"
    },
    benefits: [
      "Rich Taste",
      "Natural Nutrition",
      "Healthy Choice"
    ]
  },

  {
    id: 3,
    name: "Free-Range Eggs (6 Pack)",
    price: 95,
    image: freeRange,
    category: "Free Range",
    description:
      "Eggs from hens raised in open environments, ensuring better quality and nutrition.",
    rating: 4.9,
    stock: 60,
    nutrition: {
      protein: "7g",
      calories: "75",
      fat: "5.5g",
      vitaminD: "15%"
    },
    benefits: [
      "Free Range",
      "Better Nutrition",
      "Premium Quality"
    ]
  },

  {
    id: 4,
    name: "Cage-Free Eggs (12 Pack)",
    price: 130,
    image: cageFree,
    category: "Cage Free",
    description:
      "Premium cage-free eggs produced by hens raised in comfortable environments.",
    rating: 4.8,
    stock: 70,
    nutrition: {
      protein: "6.8g",
      calories: "73",
      fat: "5.2g",
      vitaminD: "13%"
    },
    benefits: [
      "Premium Quality",
      "Healthy Choice",
      "Farm Fresh"
    ]
  },

  {
    id: 5,
    name: "Organic Eggs (12 Pack)",
    price: 150,
    image: organicEggs,
    category: "Organic",
    description:
      "Certified organic eggs produced without chemicals, antibiotics, or synthetic feed.",
    rating: 5.0,
    stock: 50,
    nutrition: {
      protein: "7g",
      calories: "75",
      fat: "5g",
      vitaminD: "16%"
    },
    benefits: [
      "100% Organic",
      "Chemical Free",
      "Premium Nutrition"
    ]
  },

  {
    id: 6,
    name: "Duck Eggs (6 Pack)",
    price: 180,
    image: duckEggs,
    category: "Duck Eggs",
    description:
      "Large duck eggs with a richer flavor and higher protein content compared to chicken eggs.",
    rating: 4.7,
    stock: 40,
    nutrition: {
      protein: "9g",
      calories: "130",
      fat: "9.5g",
      vitaminD: "20%"
    },
    benefits: [
      "High Protein",
      "Rich Flavor",
      "Nutrient Dense"
    ]
  },

  {
    id: 7,
    name: "Quail Eggs (24 Pack)",
    price: 200,
    image: quailEggs,
    category: "Quail Eggs",
    description:
      "Small but nutrient-packed eggs known for their unique taste and health benefits.",
    rating: 4.8,
    stock: 35,
    nutrition: {
      protein: "1.2g",
      calories: "14",
      fat: "1g",
      vitaminD: "4%"
    },
    benefits: [
      "Rich Minerals",
      "Unique Taste",
      "Healthy Snack"
    ]
  },

  {
    id: 8,
    name: "Omega-3 Enriched Eggs (12 Pack)",
    price: 160,
    image: omegaEggs,
    category: "Omega-3",
    description:
      "Specially enriched eggs containing higher levels of Omega-3 fatty acids for heart health.",
    rating: 4.9,
    stock: 65,
    nutrition: {
      protein: "6.5g",
      calories: "74",
      fat: "5g",
      vitaminD: "12%"
    },
    benefits: [
      "Omega-3 Rich",
      "Heart Friendly",
      "Premium Quality"
    ]
  },

  {
    id: 9,
    name: "Vitamin-Enriched Eggs (12 Pack)",
    price: 170,
    image: vitaminEggs,
    category: "Vitamin Enriched",
    description:
      "Eggs enriched with additional vitamins and nutrients for a healthier lifestyle.",
    rating: 4.8,
    stock: 55,
    nutrition: {
      protein: "6.5g",
      calories: "72",
      fat: "5g",
      vitaminD: "20%"
    },
    benefits: [
      "Extra Vitamins",
      "Healthy Lifestyle",
      "Nutrient Rich"
    ]
  },

  {
    id: 10,
    name: "Country (Desi) Eggs (12 Pack)",
    price: 140,
    image: desiEggs,
    category: "Desi Eggs",
    description:
      "Traditional country eggs from naturally raised hens, known for their rich taste and nutrition.",
    rating: 4.9,
    stock: 90,
    nutrition: {
      protein: "7g",
      calories: "78",
      fat: "5.5g",
      vitaminD: "14%"
    },
    benefits: [
      "Traditional Taste",
      "Naturally Raised",
      "High Nutrition"
    ]
  }
];