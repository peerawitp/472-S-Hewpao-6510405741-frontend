"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./component/card";
import { Product } from "@/interfaces/Product";

function Page() {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for product 1",
      budget: 100,
      category: "Electronics",
      quantity: 10,
      imageUrl: "https://via.placeholder.com/150",
      deadline: "2025-12-31",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for product 2",
      budget: 200,
      category: "Fashion",
      quantity: 5,
      imageUrl: "https://via.placeholder.com/150",
      deadline: "2025-12-31",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for product 3",
      budget: 300,
      category: "Home",
      quantity: 7,
      imageUrl: "https://via.placeholder.com/150",
      deadline: "2025-12-31",
    },
  ];

    // ใช้ mockProducts เป็นค่าเริ่มต้นเพื่อลดปัญหา hydration mismatch
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:9090/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.length ? data : mockProducts);
        })
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setIsLoading(false));
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center h-full gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Page;
