import { Product } from "@/interfaces/Product";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
    className="items-center justify-start flex border rounded-xl shadow-md overflow-hidden w-full bg-white cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg hover:rounded-2xl p-4"
    >
      {/* รูปภาพทางซ้าย */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-40 h-40 object-contain p-2 rounded-lg" 
      />
      
      {/* รายละเอียดสินค้า */}
      <div className="p-4 justify-center overflow-hidden">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate ">{product.name}</h2>
          <p className="text-gray-600 text-sm truncate ">{product.description}</p>
          <p className="text-gray-600"><strong>Category:</strong> {product.category}</p>
          <p className="text-gray-600"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p className="text-gray-600"><strong>Quantity:</strong> {product.quantity}</p>
          <p className="text-gray-600"><strong>Deadline:</strong> {new Date(product.deadline).toLocaleDateString()}</p>
        </div>

        {/* ปุ่ม Add to Cart */}
        {/* <button className="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 w-full">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
