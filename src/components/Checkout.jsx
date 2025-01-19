import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
  });
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate checkout process
    toast
      .promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
        loading: "Processing payment...",
        success: "Order placed successfully!",
        error: "Something went wrong",
      })
      .then(() => {
        dispatch(clearCart());
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input w-full"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Shipping Address"
          className="input w-full"
          required
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Card Number"
          className="input w-full"
          required
          value={formData.card}
          onChange={(e) => setFormData({ ...formData, card: e.target.value })}
        />
        <div className="border-t pt-4">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
