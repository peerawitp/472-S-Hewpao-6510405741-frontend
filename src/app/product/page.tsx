"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./component/card";
import { Product } from "@/interfaces/Product";



function Page() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.example.com/products") //GPT HELP ME
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center h-full gap-6">
          {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}      
      </div>
    </div>
  );
}

export default Page;
