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
      
      <Link
        href="/product"
        className="text-blue-500 hover:underline mb-4"
      >
        ← Back to Product List
      </Link>


      {/* Description */}
      <div className="">
        <div className="overflow-x-auto whitespace-nowrap p-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto w-1/4 h-1/4 object-cover rounded-lg shadow-lg mb-6"
          />
        </div>
        {/* Description */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-left">
            <h3 className="font-semibold text-2xl">Description</h3>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-left">
            <h3 className="font-semibold text-2xl">Price: {product.price}</h3>
          </div>
        </div>

        {/* Category */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-left">
            <h3 className="font-semibold text-2xl">Category</h3>
            <p>{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
