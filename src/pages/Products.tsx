import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Plus, Minus, Heart, PhoneCall } from 'lucide-react';
import { products, reviews } from '../data/products';
import { useCart } from '../store/cart';
import { useWishlist } from '../store/wishlist';

const Products = () => {
  const addToCart = useCart(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, hasItem: isInWishlist } = useWishlist();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map(p => [p.id, 1]))
  );

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta)
    }));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const quantity = quantities[product.id];
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlist = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent("Hi, I'm interested in ordering mangoes!");
    window.open(`https://wa.me/919701722419?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Mangoes</h1>
        <button
          onClick={handleWhatsAppOrder}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <PhoneCall className="w-5 h-5" />
          Order via WhatsApp
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <button
                  onClick={() => handleWishlist(product)}
                  className={`p-2 rounded-full ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{quantities[product.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <div className="mt-4 text-sm text-gray-500">
                Weight: {product.weight}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.name}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-${i < review.rating ? 'yellow' : 'gray'}-400`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className={`text-gray-700 ${review.language === 'te' ? 'font-telugu' : ''}`}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;