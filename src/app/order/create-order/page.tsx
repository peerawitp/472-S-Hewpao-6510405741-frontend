"use client";
import {useState} from "react";
import ImageUpload from "../../component/ImageUpload";
interface OrderRequest {
  title: string;
  description: string;
  images: File[];
  budget: number;
  category: string;
  quantity: number;
  verifyProductService: boolean;
}

function CreateOrderPage() {
  const [orderData, setOrderData] = useState<OrderRequest>({
    title: "",
    description: "",
    images: [],
    budget: 0,
    category: "",
    quantity: 1,
    verifyProductService: false,
  });

  const categories = ["Sneaker", "Hat", "Shirt", "Suit", "Pant", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to submit order here
    console.log("Submitting order:", orderData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, type, value, checked } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleImagesChange = (images: File[]) => {
    console.log("Uploaded images:", images);
  };


  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-[#FFFFFF] rounded-lg p-[16px] block">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Product Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Product name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={orderData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={orderData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product details
            </label>
            <textarea
              id="description"
              name="description"
              value={orderData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Enter product details like model, size, color, etc."
            />
          </div>


          {/*UploadImages Component*/}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Upload Product Photos</h1>
            <ImageUpload maxImages={15} onImagesChange={handleImagesChange} />
          </div>


          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget (THB)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={orderData.budget}
              onChange={handleChange}
              min="0"
              step="100"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Enter your budget"
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={orderData.quantity}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Enter quantity"
            />
          </div>

          {/* Verify Product Service (Toggle) */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="verifyProductService"
              name="verifyProductService"
              checked={orderData.verifyProductService}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />

            <label
              htmlFor="verifyProductService"
              className="ml-2 text-sm text-gray-700"
            >
              200 THB for Verify Product Service (Optional)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-foreground text-background px-4 py-2 rounded-lg hover:bg-[#494949] transition-colors"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrderPage;
