import { Product } from "@/interfaces/Product";
import React from "react";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div 
            className="border rounded-2xl shadow-lg overflow-hidden w-64 bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={onClick}
        >
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600"><strong>Category:</strong> {product.category}</p>
                <p className="text-gray-600"><strong>Budget:</strong> ${product.budget.toFixed(2)}</p>
                <p className="text-gray-600"><strong>Quantity:</strong> {product.quantity}</p>
                <p className="text-gray-600"><strong>Deadline:</strong> {new Date(product.deadline).toLocaleDateString()}</p>
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
