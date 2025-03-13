"use client";
import { products } from "@/mock-data/products";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MakeOfferButton from "./MakeOfferBtn";

function ProductCard() {
    const pathname = usePathname();
    const isTravelerPage = pathname.includes("/product-requests");
    console.log("isTravelerPage", isTravelerPage);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all duration-200 flex flex-col h-full"
                >
                    {/* Product Image */}
                    <div className="w-full h-48 flex items-center justify-center bg-[#00000000]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={180}
                            height={180}
                            className="rounded object-contain"
                        />
                    </div>

                    {/* Product Info */}
                    <h2 className="mt-4 font-semibold text-gray-800">{product.name}</h2>

                    <div className="mt-auto">
                        <div className="mt-2 text-sm">
                            <div className="flex items-center text-gray-600">
                                <span className="font-medium">From:</span>
                                <span className="ml-2">{product.product_from}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-1 mb-2">
                                <span className="font-medium">To:</span>
                                <span className="ml-2">{product.product_to}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Retailer price:{" "}
                            <span className="font-bold text-gray-900">{product.price}</span>
                        </p>

                        {isTravelerPage && (
                            <div className="mt-3">
                                <MakeOfferButton />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductCard;