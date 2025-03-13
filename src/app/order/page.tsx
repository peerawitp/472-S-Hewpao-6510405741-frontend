"use client";

import React from "react";
import ProductCard from "../component/ProductCard";

function page() {
    return (
        <>
          <div className="min-h-screen bg-gray-50 rounded">
            {/* Order List */}
              <div className="px-8">
                  <h1 className="text-3xl font-bold text-primary mb-6 font-sans">Orders</h1>
                  <ProductCard />
              </div>
          </div>
        </>
    );
}

export default page;
