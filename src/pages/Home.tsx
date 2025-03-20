import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Truck, Award, ShieldCheck, Phone, MapPin, Clock, Star, Users, Gift } from 'lucide-react';
import { reviews } from '../data/products';

const Home = () => {
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80",
      title: "Fresh Banginapalli Mangoes",
      price: "₹200/dozen"
    },
    {
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80",
      title: "Organic Farm Fresh",
      price: "₹250/dozen"
    },
    {
      url: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80",
      title: "Carbide-Free Mangoes",
      price: "₹300/dozen"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Carousel Section */}
      <div className="relative overflow-hidden rounded-lg h-[600px] mb-16">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === 0 ? 1 : 0,
              animation: `carousel 15s infinite ${index * 5}s`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-800/70" />
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl mb-4">Starting at {image.price}</p>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                  Direct from Ullavapadu's finest orchards to your doorstep
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers Section */}
      <div className="bg-green-50 rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
            <Gift className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Buy More, Save More!</h3>
            <p className="text-gray-700 mb-4">Order above ₹3,000 and get 1kg of premium mango pickle absolutely free!</p>
            <Link to="/products" className="text-green-600 font-semibold hover:text-green-700">Shop Now →</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
            <Star className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Bulk Order Special</h3>
            <p className="text-gray-700 mb-4">Get 2kg Banginapalli mangoes free on orders above ₹5,000!</p>
            <Link to="/products" className="text-green-600 font-semibold hover:text-green-700">Shop Now →</Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">About Ullavapadu Mangoes</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8 text-center">
          Ullavapadu Mangoes is a farmer-led initiative bringing the finest Banginapalli mangoes directly from our orchards to your table. Our mangoes are naturally ripened, carbide-free, and cultivated using organic farming practices that have been passed down through generations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
            <p className="text-gray-600">Grown naturally without harmful chemicals</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Carbide Free</h3>
            <p className="text-gray-600">Natural ripening process only</p>
          </div>
          <div className="text-center">
            <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Farm Direct</h3>
            <p className="text-gray-600">From our orchards to your doorstep</p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Handpicked at peak ripeness</p>
          </div>
        </div>
      </div>

      {/* Featured Reviews */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="w-10 h-10 text-green-600" />
                <div className="ml-3">
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className={`text-gray-700 ${review.language === 'te' ? 'font-telugu' : ''}`}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center">
            <Phone className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-gray-600">+91 970-172-2419</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <MapPin className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-gray-600">Ullavapadu, Andhra Pradesh</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Clock className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Business Hours</h3>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <Link
          to="/products"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Home;