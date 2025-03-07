"use client";
import Image from "next/image";
import { products } from "@/mock-data/products";
import React from "react";
import DateSelector from "../component/DateSelector";
import ProductCard from "../component/ProductCard";
function page() {
  return (
    <>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          These items were recently requested.
        </h1>
        <ProductCard />
      </div>
    </>
  );
}

export default page;
