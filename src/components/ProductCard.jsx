import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { toast } from "react-hot-toast";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Added to cart!");
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-4">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white truncate">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating?.rate || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({product.rating?.count || 0})
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg
              transition-colors duration-200"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
