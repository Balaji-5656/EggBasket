import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Footer from "./components/Footer";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar onLoginClick={() => setIsLoginOpen(true)} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/signin"
                element={<SignIn isOpen={true} onClose={() => setIsLoginOpen(false)} />}
              />
            </Routes>
          </main>

          <Footer />

          
          <SignIn isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
