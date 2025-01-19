import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}
