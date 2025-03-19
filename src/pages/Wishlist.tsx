import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../store/wishlist';
import { useCart } from '../store/cart';

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const addToCart = useCart(state => state.addItem);

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    removeItem(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <Link
          to="/products"
          className="text-green-600 hover:text-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;