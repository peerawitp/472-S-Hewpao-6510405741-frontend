"use client";
import Image from "next/image";
import Link from "next/link";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { useGetBuyerProductRequests } from "@/api/productRequest/useProductRequest";

interface ProductListProps {
  products: GetProductRequestResponseDTO[];
  loading: boolean;
}

const ProductList = ({ products, loading }: ProductListProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="mt-2 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-center">
                    <p className="text-lg text-gray-700 font-bold">No product requests found</p>
                    <p className="text-gray-500 mt-2">Check back later for new products</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto p-4">
            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/my-product/${product.id}`}
                        passHref
                    >
                        <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={180}
                                height={180}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                            <p className="text-gray-600 text-sm">{product.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

function Page() {
  const { data: products, isLoading: loading } = useGetBuyerProductRequests();

  const productList = products?.["product-requests"] || [];

  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          My Product Requests
        </h1>
        <Link
          href="/my-product/create-order"
          className="text-white bg-primary px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-dark-primary shadow-md"
        >
          + Create Order
        </Link>
      </div>

      <ProductList products={productList} loading={loading} />
    </div>
  );
}

export default Page;