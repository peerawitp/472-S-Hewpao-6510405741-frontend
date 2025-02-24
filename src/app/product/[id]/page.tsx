"use client";
import { useParams } from "next/navigation"; 
import { products } from "@/mock-data/products";
import Link from "next/link";

const ProductDetailPage = () => {
  const router = useParams();
  const { id } = router;

  const product = products.find((product) => String(product.id) === String(id)); // Ensure id is a string

  if (!product) {
    return <div className="text-center text-xl font-bold">Product not found</div>;
  }

  return (
    <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
      <Link href="/product" className="text-blue-500 hover:underline mb-4">
        ← Back to Product List
      </Link>

      {/* Container to arrange image and details side by side */}
      <div className="mt-4 flex items-start gap-4">
        {/* Left Side - Image */}
        <div className="w-1/2 flex justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-80 h-80 object-cover rounded-md" 
          />
        </div>

        {/* Right Side - Details */}
        <div className=" ">
          {/* Product Info */}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-gray-700 mt-2">Price: {product.price}</p>
          <p className="text-gray-700 mt-2">Category: {product.category}</p>
          <p className="text-gray-700 mt-2">Deadline: {new Date(product.deadline).toLocaleDateString()}</p>

          {/* Traveler Info */}
          {product.traveler ? (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold">Offered by</h2>
              <p><strong>Name:</strong> {product.traveler.name}</p>
              <p><strong>Contact:</strong> {product.traveler.contact}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              No traveler has offered this request yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
