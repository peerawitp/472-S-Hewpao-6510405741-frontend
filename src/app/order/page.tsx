"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { products } from "@/mock-data/products";
import ProductCard from "../component/ProductCard";

function LandingPage() {
  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  // Get product categories
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="bg-white">
      {/* Hero Section - removed fixed min-height to prevent overlap */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-40 z-0">
          <Image 
            src="/images/hero-background.jpg" 
            alt="Hero background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Find and Order Products from Around the World
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with travelers who can bring your desired items from anywhere. Fast, reliable, and hassle-free.
            </p>
            <Link
              href="/order/create-order"
              className="inline-block text-white bg-blue-600 px-8 py-4 rounded-lg font-medium text-lg transition duration-200 hover:bg-blue-700 shadow-lg"
            >
              + Create Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our most popular items from across the globe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image || "/images/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Link 
                      href={`/product/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-4 text-lg text-gray-600">
              Browse products from your favorite categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:bg-blue-50"
              >
                <div className="text-gray-500 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 mx-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore {category.toLowerCase()} products
                </p>
              </Link>
            ))}
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
            <Link
              href="/order/create-order"
              className="inline-block text-white bg-blue-600 px-8 py-4 rounded-lg font-medium text-lg transition duration-200 hover:bg-blue-700 shadow-lg"
            >
              + Create Order
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore All Products</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Create your order today and connect with travelers who can bring your desired products from around the world.
          </p>
          <Link
            href="/order/create-order"
            className="inline-block text-blue-600 bg-white px-8 py-4 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-100 shadow-lg"
          >
            + Create Order
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;