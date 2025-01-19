import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            <div className="bg-gray-100 px-4 py-2 rounded">
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium capitalize">{product.category}</p>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <button
              onClick={() => {
                addToCart(product);
                alert("Product added to cart!");
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg
                hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
