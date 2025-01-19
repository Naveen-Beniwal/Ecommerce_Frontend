import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

// Web vitals reporting function
const reportWebVitals = () => {
  onCLS(console.log);
  onFCP(console.log);
  onFID(console.log);
  onINP(console.log);
  onLCP(console.log);
  onTTFB(console.log);
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar cartItems={cartItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

reportWebVitals();
export default App;
