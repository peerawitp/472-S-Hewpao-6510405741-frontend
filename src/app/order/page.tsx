"use client";
import Link from "next/link";
import CreateOrder from "../component/CreateOrderBtn";
import React from "react";
import ProductCard from "../component/ProductCard";

// Mock data for categories since they're no longer derived from products
const categories = ["Electronics", "Fashion", "Beauty", "Food", "Collectibles", "Toys", "Books"];

function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Find and Order Products from Around the World
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with travelers who can bring your desired items from anywhere. Fast, reliable, and hassle-free.
            </p>
      
          </div>
        </div>
      </section>

      

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Order products from anywhere in the world in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Order</h3>
              <p className="text-gray-600">
                Specify what you want, where it's from, and your budget.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Travelers</h3>
              <p className="text-gray-600">
                Get matched with travelers heading to your location.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Your Items</h3>
              <p className="text-gray-600">
                Meet up or get your items delivered once they arrive.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <CreateOrder />
          </div>
        </div>
      </section>

      {/* All Products Section with Infinite Scroll */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Explore All Products</h2>
          </div>
          <ProductCard />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from people who've used our service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I was able to get items from Japan that were impossible to find here. The process was smooth and my traveler was really helpful!"
              </p>
              <div className="font-medium">Sarah T.</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a traveler, I've made extra money bringing items to people while on business trips. Great platform!"
              </p>
              <div className="font-medium">Michael R.</div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Got my limited edition sneakers from the US for much less than what resellers were charging. Highly recommend!"
              </p>
              <div className="font-medium">James L.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
export default LandingPage;