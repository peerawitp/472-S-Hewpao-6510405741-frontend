"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { useGetBuyerProductRequests } from "@/api/productRequest/useProductRequest";

const ProductList: React.FC<{products: GetProductRequestResponseDTO[], loading: boolean}> = ({ products, loading }) => {
  const session = useSession();

  if (loading) {
      return (
          <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
          </div>
      );
  }

  if (products.length === 0) {
      return (
          <div className="flex justify-center items-center min-h-[300px]">
              <div className="text-center">
                  <p className="text-lg text-gray-700">No product requests found</p>
                  <p className="text-gray-500 mt-2">Check back later for new products</p>
              </div>
          </div>
      );
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/my-product/${product.id}`}
            passHref
          >
            <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function Page() {
  const { data: products, isLoading: loading } = useGetBuyerProductRequests();

  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <div className="flex items-center justify-between mb-6"> {/* ใช้ flexbox */}
        <h1 className="text-3xl font-bold text-gray-900">
          My Product Requests
        </h1>
        <Link
          href="/my-product/create-order"
          className="text-white bg-black px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-800 shadow-md"
        >
          + Create Order
        </Link>
      </div>

      <ProductList products={products?.["product-requests"] ?? []} loading={loading} />
    </div>
  );
}

export default Page;