import { useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";
import { GetProductRequestResponseDTO,UpdateProductRequestStatusDTO } from "@/dtos/productRequest";
import { DeliveryStatus } from "@/interfaces/ProductRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MyOfferCard = ({ product,refetch }: { product: GetProductRequestResponseDTO; refetch: () => void },) => {
	const router = useRouter();
	const [currentStatus, setCurrentStatus] = useState<string>(
		product.delivery_status
	  );
	const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
	const [newStatus, setNewStatus] = useState<string>(product.delivery_status);
	
	const updateProductStatus = useUpdateProductRequestStatus(product.id);
	const deliveryStatus = [
		DeliveryStatus.Pending,
		DeliveryStatus.Purchased,
		DeliveryStatus.PickedUp,
		DeliveryStatus.Cancel]
	
	const handleStatusChange = () => {
		setIsEditingStatus(true);
	};
	
	const handleStatusSave = () => {
	if (newStatus !== currentStatus) {
		const updateData: UpdateProductRequestStatusDTO = {
			delivery_status: newStatus,
			notify_provider: "email"
		};
	
		updateProductStatus.mutate(updateData, {
			onSuccess: () => {
			setCurrentStatus(newStatus);
			setIsEditingStatus(false);
			refetch();
		},
		});
		} else {
		  setIsEditingStatus(false);
		}
	};
	
	const handleStatusCancel = () => {
		setNewStatus(currentStatus);
		setIsEditingStatus(false);
	};

	const handleChat = () => {
		console.log("Test chat")
		if (product?.id) {
		  router.push(`/chat/${product.id}`);
		}
	  }
	
	const handleSeeDetail = () => {
		console.log("Test chat")
		if (product?.id) {
		  router.push(`/my-offer/${product.id}`);
		}
	  }

	return (
	        <div className="bg-white rounded-xl shadow-sm overflow-hidden transform hover:shadow-md transition-all duration-200 border border-gray-100">
	            <div className="p-5">
	                <div className="flex flex-col sm:flex-row">
	                    <div className="mb-4 sm:mb-0 sm:mr-5 flex-shrink-0 items-center">
	                        <div className="relative rounded-lg overflow-hidden border border-gray-200 w-full sm:w-28 h-28 group">
	                            <img
	                                src={product.images[0]}
	                                alt={product.name}
	                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
	                            />
	                        </div>
							<div className="mt-4 ">
								<button
									onClick={handleSeeDetail}
									className="px-3 py-1 rounded-lg font-semibold transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"
										
									>
									See Detail
								</button>
							</div>
	                    </div>
	                    <div className="flex-1">
	                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
	                            <h3 className="text-lg font-semibold mb-2 sm:mb-0">{product.name}</h3>
								{isEditingStatus ? (
									<select
										value={newStatus}
										onChange={(e) => setNewStatus(e.target.value)}
										className="border rounded-md p-1"
										>
										{deliveryStatus.map((option) => (
											<option key={option} value={option}>
											{option}
											</option>
										))}
										</select>
									) : (
										<span className="bg-blue-50 text-primary-500 text-sm px-3 py-1 rounded-full font-medium">
										{currentStatus}
										</span>
									)}
	                        </div>
	
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-3 bg-gray-50 rounded-md shadow-sm">
									{/* Deliver From */}
									<div className="flex items-center gap-2">
										<div className="bg-blue-100 text-blue-600 p-1.5 rounded-full">
										<svg
											className="w-4 h-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
											<line x1="16" y1="2" x2="16" y2="6"></line>
											<line x1="8" y1="2" x2="8" y2="6"></line>
											<line x1="3" y1="10" x2="21" y2="10"></line>
										</svg>
										</div>
										<span className="text-sm font-medium text-gray-700">
										from <span className="block font-semibold text-gray-900">{product.deliver_from}</span>
										</span>
									</div>

									{/* Deliver To */}
									<div className="flex items-center gap-2">
										<div className="bg-green-100 text-green-600 p-1.5 rounded-full">
										<svg
											className="w-4 h-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
											<line x1="16" y1="2" x2="16" y2="6"></line>
											<line x1="8" y1="2" x2="8" y2="6"></line>
											<line x1="3" y1="10" x2="21" y2="10"></line>
										</svg>
										</div>
										<span className="text-sm font-medium text-gray-700">
										to <span className="block font-semibold text-gray-900">{product.deliver_to}</span>
										</span>
									</div>
								</div>

	                        <div className="flex flex-wrap items-center mt-4 gap-2">
								{/* <button
									onClick={handleChat}
									disabled={product.selected_offer_id === null}
									className={`px-3 py-1 rounded-lg font-semibold transition duration-200
										${product.selected_offer_id === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
									`}
									>
									Chat
								</button> */}
							{isEditingStatus ? (
								<>
								<button
									className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
									onClick={handleStatusSave}
								>
									Save
								</button>
								<button
									className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
									onClick={handleStatusCancel}
								>
									Cancel
								</button>
								</>
							) : (
								<button
								className="inline-flex items-center px-3 py-1.5 border border-primary rounded-md text-black hover:bg-primary hover:text-white transition-colors"
								onClick={handleStatusChange}
								>
								Change Status
								</button>
							)}
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    )
}
	
export default MyOfferCard
