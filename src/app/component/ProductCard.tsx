"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MakeOfferButton from "./MakeOfferBtn";
import {useGetPaginatedProductRequests} from "@/api/productRequest/useProductRequest";
import { useEffect, useState } from "react";
import { InView } from './in-view';

function ProductCard() {
  const pathname = usePathname();
  const isTravelerPage = pathname.includes("/product-requests");

  // State for pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageSize = 4; // Items per page

  // Fetch data with current page
  const { data: productData, isLoading: loadingProducts } =
    useGetPaginatedProductRequests(page, pageSize);

  // Update allProducts when new data is fetched
  useEffect(() => {
    if (productData) {
      // Add new products to the list, avoiding duplicates
      setAllProducts(prev => {
        // If it's the first page, just use the data directly
        if (page === 1) return productData.data;

        // For subsequent pages, filter out duplicates
        const newProducts = productData.data.filter(newProduct =>
          !prev.some(existingProduct => existingProduct.id === newProduct.id)
        );

        return [...prev, ...newProducts];
      });

      // Check if we've loaded all available products
      setHasMore(productData.data.length >= pageSize);
      setIsLoadingMore(false);
    }
  }, [productData, page, pageSize]);

  // Handle loading more products when scrolling to the end
  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setPage(prev => prev + 1);
  };

  // Initial loading state
  if (loadingProducts && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Empty state - no products at all
  if (!loadingProducts && (!allProducts || allProducts.length === 0)) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <p className="text-lg text-gray-700">No product requests found</p>
          <p className="text-gray-500 mt-2">Check back later for new products</p>
        </div>
      </div>
    );
  }

  // Render products with infinite scroll
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all duration-200 flex flex-col h-full"
          >
            {/* Product Image */}
            <div className="w-full h-48 flex items-center justify-center bg-[#00000000]">
              <Image
                src={product.images[0]}
                alt={product.name || "Product Request Image"}
                width={180}
                height={180}
                className="rounded object-contain h-full w-full"
              />
            </div>
            {/* Product Info */}
            <h2 className="mt-4 font-semibold text-gray-800 line-clamp-2">{product.name}</h2>

            <div className="mt-auto">
              <div className="mt-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">From:</span>
                  <span className="ml-2">{product.deliver_from}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1 mb-2">
                  <span className="font-medium">To:</span>
                  <span className="ml-2">{product.deliver_to}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                Retailer price:{" "}
                <span className="font-bold text-gray-900">{product.budget} THB</span>
              </p>

              {isTravelerPage && (
                <div className="mt-3">
                  <MakeOfferButton productRequestID={product.id} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll component */}
      {hasMore && (
        <InView onInView={handleLoadMore}>
          <div className="flex justify-center py-6">
            {isLoadingMore && (
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span className="text-gray-600">Loading more products...</span>
              </div>
            )}
          </div>
        </InView>
      )}

      {/* End of content message */}
      {!hasMore && allProducts.length > 0 && (
        <div className="text-center bg-gray-50 px-6 py-4 rounded-lg">
          <p className="text-gray-500">You've seen all products</p>
          <p className="text-gray-400 text-sm mt-1">No more items to display</p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
