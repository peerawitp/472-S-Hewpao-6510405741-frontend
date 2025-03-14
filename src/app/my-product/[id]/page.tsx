// pages/edit-product/[id].tsx
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetProductRequestByID,
  useUpdateProductRequest,
  useCancelProductRequest,
} from "@/api/productRequest/useProductRequest";
import Link from "next/link";
import { ResponseOffer } from "@/dtos/Offer";
import OfferDetails from "../component/OfferDetails";
import { DeliveryStatus } from "@/interfaces/ProductRequest";

function Page() {
  const router = useParams();
  const { id } = router;

  const { data: product, isLoading: loading } = useGetProductRequestByID(
    Number(id),
  );
  const useUpdateProduct = useUpdateProductRequest(Number(id));
  const useCancelProduct = useCancelProductRequest(Number(id));

  const offerList: number[] =
    product?.["product-request"].offers?.map(
      (offer: ResponseOffer) => offer.ID,
    ) || [];

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(0);

  const categories = ["Electronics", "Fashion", "Food", "Books", "Other"];

  React.useEffect(() => {
    if (product?.["product-request"]) {
      setEditedName(product?.["product-request"]?.name);
      setEditedDesc(product?.["product-request"]?.desc);
      setEditedCategory(product?.["product-request"]?.category);
      setEditedQuantity(product?.["product-request"]?.quantity);
    }
  }, [product]);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    useUpdateProduct.mutate(
      {
        name: editedName,
        desc: editedDesc,
        quantity: editedQuantity,
        category: editedCategory,
        selected_offer_id: 0,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancelOrder = () => {
    useCancelProduct.mutate(
      {
        delivery_status: DeliveryStatus.Cancel,
        notify_provider: "email",
      },
      {
        onSuccess: () => {
          alert("Product request has been cancelled!");
        },
        onError: (err) => {
          alert(err);
        },
      },
    );
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(product!["product-request"]?.name);
    setEditedDesc(product!["product-request"]?.desc);
    setEditedCategory(product!["product-request"]?.category);
    setEditedQuantity(product!["product-request"]?.quantity);
  };

  return (
      <div className="flex flex-col justify-center md:flex-row gap-6 p-4 font-sans">
          <div className="bg-white rounded-lg shadow-md pt-8 p-6 w-full md:w-1/2">
              <Link
                  href={`/my-product`}
                  passHref
                  className="bg-gray-300 px-3 py-2 rounded-lg"
              >
                  Back
              </Link>
              <div className="flex pt-5 justify-between items-center">
                  <div>
                      <h1 className="text-dark-primary font-medium">Product details</h1>
                      <div className="flex items-center mb-4">
                          <h2 className="text-2xl font-bold text-primary">{product?.['product-request']?.delivery_status}</h2>
                      </div>
                  </div>

                  <div className="flex mb-5">
                      <div className="mr-4 border border-gray-200 rounded-md overflow-hidden w-24 h-24 flex-shrink-0">
                          <img
                              src={product?.['product-request']?.images[0]}
                              alt={product?.['product-request']?.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                      </div>
                  </div>
              </div>
        <div>
          {isEditing ? (
            <div>
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-8">
                  <div className="text-gray-500">Name</div>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-2 w-full rounded-lg"
                    placeholder="Name"
                  />
                    <div className="text-gray-500 self-start">Description</div>
                  <textarea
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="border p-2 w-full rounded-lg"
                    placeholder="Description"
                  />

                  <div className="text-gray-500">Category</div>
                  <select
                    name="category"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <div className="text-gray-500">Deliver to</div>
                  <div className="font-medium text-primary">{product?.['product-request']?.deliver_to}</div>

                  <div className="text-gray-500">From</div>
                  <div className="font-medium text-primary">{product?.['product-request']?.deliver_from}</div>

                  <div className="text-gray-500">Quantity</div>
                  <input
                    type="number"
                    value={editedQuantity}
                    onChange={(e) => setEditedQuantity(Number(e.target.value))}
                    className="border p-2 w-full rounded-lg"
                    placeholder="Quantity"
                  />

                  <div className="text-gray-500">Order number</div>
                  <div className="font-medium text-right">{product?.['product-request']?.id}</div>

                  <div className="text-gray-500">Budget</div>
                  <div className="font-medium text-right">{product?.['product-request']?.budget}</div>
                </div>
              </div>

              <div className="pt-5 flex justify-end gap-5">
                <button onClick={handleSaveClick} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-dark-primary ease-out duration-300">Save</button>
                <button onClick={handleCancelClick} className="bg-gray-300 px-3 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-[auto,2fr] gap-y-4 gap-x-8">
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">{product?.['product-request']?.name}</div>

                    <div className="text-gray-500">Description</div>
                    <div className="font-medium">{product?.['product-request']?.desc}</div>

                    <div className="text-gray-500">Category</div>
                    <div className="font-medium">{product?.['product-request']?.category}</div>

                    <div className="text-gray-500">Deliver to</div>
                    <div className="font-medium">{product?.['product-request']?.deliver_to}</div>

                    <div className="text-gray-500">From</div>
                    <div className="font-medium">{product?.['product-request']?.deliver_from}</div>

                    <div className="text-gray-500">Quantity</div>
                    <div className="font-medium">{product?.['product-request']?.quantity}</div>

                    <div className="text-gray-500">Order number</div>
                    <div className="font-medium">{product?.['product-request']?.id}</div>

                    <div className="text-gray-500">Budget</div>
                    <div className="font-medium">{product?.['product-request']?.budget}</div>
                </div>
              </div>

              <div className="mt-8"></div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button className="bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-800 transition-colors">
                        Cancel Order
                    </button>
                    <button onClick={handleEditClick} className="py-3 px-4 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                        Edit Order
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>
                </div>
                </>
              )}

	        </div>

            <div className="mt-4">
                {offerList.map((offerId) => (
                    <OfferDetails key={offerId} id={offerId} />
                ))}
            </div>
	    </div>
	  </div>
  );
}

export default Page;
