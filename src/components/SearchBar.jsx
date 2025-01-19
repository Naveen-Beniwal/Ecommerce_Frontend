import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/productsSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(query));
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
