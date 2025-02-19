import { Product } from "@/interfaces/Product";
import React from "react";

interface ProductCardProps {
    product: Product;
  }

  const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
      <div className="border rounded-2xl shadow-lg overflow-hidden w-64 bg-white">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  export default ProductCard;