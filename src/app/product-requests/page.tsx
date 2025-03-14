"use client";
import React, { useEffect, useRef } from "react";
import ProductCard from "../component/ProductCard";

function ProductRequestsPage() {
  // Reference to track scroll position
  const pageRef = useRef<HTMLDivElement>(null);

  // Add scroll restoration when navigating back to this page
  useEffect(() => {
    // Save scroll position when leaving the page
    const handleBeforeUnload = () => {
      if (pageRef.current) {
        sessionStorage.setItem('productRequestsScrollPosition', 
          window.scrollY.toString());
      }
    };

    // Restore scroll position when coming back to the page
    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('productRequestsScrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Restore position on mount
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div ref={pageRef}>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            These items were recently requested
          </h1>
        </div>
        
        {/* The ProductCard component handles its own infinite scrolling */}
        <ProductCard />
      </div>
    </div>
  );
}

export default ProductRequestsPage;