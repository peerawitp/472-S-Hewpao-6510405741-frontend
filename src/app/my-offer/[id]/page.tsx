"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetProductRequestByID,
} from "@/api/productRequest/useProductRequest";
import Link from "next/link";
import Image from "next/image";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";

function Page() {
  const param = useParams();
  const router = useRouter();

  const { id } = param;

  const { data: productData, isLoading: loading } = useGetProductRequestByID(
    Number(id),
  );

  const product = productData?.["product-request"] as GetProductRequestResponseDTO;

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="mt-2 text-gray-600">Loading product...</p>
            </div>
        </div>
    );
  }

  const handleChat = () => {
    console.log("Test chat")
    if (product?.id) {
      router.push(`/chat/${product.id}`);
    }
  }

  return (
    <div className="flex flex-col justify-center md:flex-row gap-6 p-4 font-sans">
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
        <Link
          className="border p-2 rounded-md w-fit"
          href={`/my-offer`}
          passHref
        >
          Back
        </Link>
        <div>
          <h1 className="text-primary-500 font-bold text-xl">
            Product details
          </h1>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-bold">
              Status: <span className="text-blue-600">{product?.delivery_status}</span>
            </h2>
            <button
              onClick={handleChat}
              disabled={product.selected_offer_id === null}
              className={`px-3 py-1 rounded-lg font-semibold transition duration-200
                ${product.selected_offer_id === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              Chat
            </button>
          </div>
        </div>
        <div>
              <div className="flex mb-6">
                <div className="grid grid-cols-3 w-full gap-4">
                  {product.images.map((image, index) => {
                    return (
                      <div key={index}>
                        <Image
                          src={image}
                          alt={product.name}
                          width={180}
                          height={180}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform rounded-md"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-8">
                  <div className="text-gray-500">Name</div>
                  <div className="font-medium text-right">
                    {product?.name}
                  </div>

                  <div className="text-gray-500">Description</div>
                  <div className="font-medium text-right">
                    {product?.desc}
                  </div>

                  <div className="text-gray-500">Category</div>
                  <div className="font-medium text-right">
                    {product?.category}
                  </div>

                  <div className="text-gray-500">Deliver to</div>
                  <div className="font-medium text-right">
                    {product?.deliver_to}
                  </div>

                  <div className="text-gray-500">From</div>
                  <div className="font-medium text-right">
                    {product?.deliver_from}
                  </div>

                  <div className="text-gray-500">Quantity</div>
                  <div className="font-medium text-right">
                    {product?.quantity}
                  </div>

                  <div className="text-gray-500">Order number</div>
                  <div className="font-medium text-right">
                    {product?.id}
                  </div>

                  <div className="text-gray-500">Budget</div>
                  <div className="font-medium text-right">
                    {product?.budget}
                  </div>

                  <div className="text-gray-500">Selected Offer ID</div>
                  <div className="font-medium text-right">
                    {product?.selected_offer_id}
                  </div>
                </div>
              </div>

              <div className="mt-8"></div>
        </div>

      </div>
    </div>
  );
}

export default Page;
