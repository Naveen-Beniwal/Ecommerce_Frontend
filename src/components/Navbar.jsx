import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar({ cartItems }) {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold">
            E-Shop
          </Link>
          <div className="flex items-center">
            <Link to="/cart" className="text-gray-300 hover:text-white">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="ml-1 text-sm">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
