import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Gift, AlertCircle } from 'lucide-react';
import { useCart } from '../store/cart';

const Cart = () => {
  const { items, total, removeItem, updateQuantity } = useCart();

  const specialOffers = [
    {
      minAmount: 3000,
      reward: '1kg Mango Pickle FREE',
      description: 'Order above ₹3,000 and get 1kg of premium mango pickle absolutely free!'
    },
    {
      minAmount: 5000,
      reward: '2kg Banginapalli Mangoes FREE',
      description: 'Spend ₹5,000 or more and receive 2kg of fresh Banginapalli mangoes free!'
    }
  ];

  // Find applicable offers
  const applicableOffers = specialOffers.filter(offer => total >= offer.minAmount);
  const nextOffer = specialOffers.find(offer => total < offer.minAmount);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {/* Special Offers Banner */}
      <div className="bg-green-50 rounded-lg p-4 md:p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-green-800">Special Offers</h2>
        </div>
        {applicableOffers.length > 0 ? (
          <div className="space-y-2">
            <p className="text-green-700 font-semibold">
              Congratulations! You've unlocked:
            </p>
            {applicableOffers.map((offer, index) => (
              <div key={index} className="flex items-center gap-2 text-green-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{offer.reward}</p>
              </div>
            ))}
          </div>
        ) : nextOffer && (
          <div className="text-gray-600">
            <p>Add ₹{(nextOffer.minAmount - total).toFixed(2)} more to get {nextOffer.reward}!</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(total / nextOffer.minAmount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex flex-col md:flex-row md:items-center py-4 border-b">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full md:w-24 h-48 md:h-24 object-cover rounded mb-4 md:mb-0"
            />
            <div className="flex-1 md:ml-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">₹{item.product.price}</p>
            </div>
            <div className="flex flex-row md:flex-col items-center justify-between md:space-y-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-semibold">
            Total: ₹{total.toFixed(2)}
          </div>
          <Link
            to="/checkout"
            className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;