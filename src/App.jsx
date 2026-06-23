import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";
import AccountDashboard from "./pages/AccountDashboard";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import { WishlistProvider } from "./context/WishlistContext";
import AdminOrders from "./pages/AdminOrders";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import SavedAddresses from "./pages/SavedAddresses";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar
            onLoginClick={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
            onRegisterClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />
          

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route
                path="/product/:id"
                element={<ProductDetails />}
              />
              <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

<Route
  path="/account"
  element={
    <ProtectedRoute>
      <AccountDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/saved-addresses"
  element={
    <ProtectedRoute>
      <SavedAddresses />
    </ProtectedRoute>
  }
/>
<Route
  path="/wishlist"
  element={<Wishlist />}
/>
<Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
<Route
  path="/admin/add-product"
  element={<AddProduct />}
/>
<Route
  path="/admin"
  element={<AdminLogin />}
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
              <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-orders"
  element={<MyOrders />}
/>
              <Route
  path="/payment"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />

          {/* Login Panel */}
          <SignIn
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToRegister={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />

          {/* Register Panel */}
          <Register
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onSwitchToSignin={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          />
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
    
  );
}

export default App;