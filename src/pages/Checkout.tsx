import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../store/cart';
import { QrCode } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showUpiQR, setShowUpiQR] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    upiId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate order creation and UPI payment initiation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowUpiQR(true);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentComplete = async () => {
    setLoading(true);
    try {
      // Create UPI payment intent
      const upiPaymentUrl = `upi://pay?pa=9701722419@ybl&pn=Goli%20Manish%20Reddy&tn=Mango%20Purchase&am=${total}&cu=INR`;
      
      // Save order details to local storage for admin view
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: Date.now().toString(),
        ...formData,
        items,
        total,
        status: 'completed',
        date: new Date().toISOString(),
        upiId: '9701722419@ybl'
      };
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

      // Open UPI payment app
      window.location.href = upiPaymentUrl;

      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Payment successful! Order confirmed.');
      clearCart();
      navigate('/');
    } catch (error) {
      toast.error('Payment verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  if (showUpiQR) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <img 
              src="https://raw.githubusercontent.com/yourusername/ullavapadumangoes/main/phonepe-qr.png" 
              alt="PhonePe QR Code"
              className="w-64 h-64 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-4">Scan QR Code to Pay</h2>
            <p className="text-gray-600 mb-4">Amount: ₹{total.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">
              UPI ID: 9701722419@ybl
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Scan this QR code with PhonePe or any UPI app to complete your payment
            </p>
            <div className="space-y-4">
              <button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Open UPI App
              </button>
              <button
                onClick={() => setShowUpiQR(false)}
                className="w-full text-gray-600 hover:text-gray-800"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Guest Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-2">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * Prices include all applicable taxes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;