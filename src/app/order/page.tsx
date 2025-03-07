"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { products } from "@/mock-data/products";
import ProductCard from "../component/ProductCard";

function page() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded">
        {/* Create Order Button */}
        <div className="flex items-center justify-center py-10">
          <Link
            href="/order/create-order"
            className="text-white bg-black px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-800 shadow-md"
          >
            + Create Order
          </Link>
        </div>

        {/* Order List */}
        <div className="px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default page;
