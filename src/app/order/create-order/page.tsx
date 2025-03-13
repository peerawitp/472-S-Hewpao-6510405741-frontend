"use client";
import { useState, useCallback } from "react";
import ProgressIndicator from "../../component/ProgressIndicator";
import ImageUpload from "../../component/ImageUpload";

interface OrderRequest {
  title: string;
  description: string;
  images: File[];
  budget: number;
  category: string;
  quantity: number;
  verifyProductService: boolean;
  deliveryFrom: string;
  deliveryTo: string;
  deliveryTime: string;
}

function CreateOrderPage() {
  const [step, setStep] = useState(1);
  const customSteps = ['Product details', 'Delivery details', 'Summary'];


  const [orderData, setOrderData] = useState<OrderRequest>({
    title: "",
    description: "",
    images: [],
    budget: 0,
    category: "",
    quantity: 1,
    verifyProductService: false,
    deliveryFrom: "",
    deliveryTo: "",
    deliveryTime: "Up to 1 month",
  });

  const categories = ["Sneaker", "Hat", "Shirt", "Suit", "Pant", "Other"];

  const handleNext = () => {
    if (step < customSteps.length) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setOrderData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
  }, []);

  const handleImagesChange = (newImages: File[]) => {
    setOrderData((prev) => ({ ...prev, images: newImages }));
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-[#FFFFFF] rounded-lg p-[16px] block">
        <div className=" mb-6">
          {/* แสดง Progress Bar */}
          <ProgressIndicator step={step} steps={customSteps} />

          {/* Step Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {step === 1 && "Step 1: Product Details"}
            {step === 2 && "Step 2: Delivery Details"}
            {step === 3 && "Step 3: Summary"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Step 1: Product Details */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product name
                </label>
                <input
                  type="text"
                  name="title"
                  value={orderData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={orderData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product details
                </label>
                <textarea
                  name="description"
                  value={orderData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  placeholder="Enter product details like model, size, color, etc."
                />
              </div>

              <ImageUpload
                maxImages={15}
                images={orderData.images}
                onImagesChange={handleImagesChange}
              />

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price on website (THB)
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={orderData.budget}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  placeholder="Enter your budget"
                />

                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-[#696969]"
                >
                  Confirm the retail price of your item (does not include cost
                  of delivery).
                </label>
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  placeholder="Enter quantity"
                />

                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium border-[#00000000] text-[#696969]"
                >
                  How many of this item would you like to purchase?
                </label>
              </div>

              {/* Verify Product Service (Toggle) */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="verifyProductService"
                  name="verifyProductService"
                  checked={orderData.verifyProductService}
                  onChange={handleChange}
                  className="h-4 w-4 text-dark-primary  border-gray-300 rounded focus:ring-primary accent-primary"
                />

                <label
                  htmlFor="verifyProductService"
                  className="ml-2 text-sm text-gray-700"
                >
                  200 THB for Verify Product Service <span className="text-[#696969]">(Optional)</span>
                </label>
              </div>
            </>
          )}

          {/* ✅ Step 2: Delivery Details */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery from
                </label>
                <input
                  type="text"
                  name="deliveryFrom"
                  value={orderData.deliveryFrom}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery to
                </label>
                <input
                  type="text"
                  name="deliveryTo"
                  value={orderData.deliveryTo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery time
                </label>
                <select
                  name="deliveryTime"
                  value={orderData.deliveryTime}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary outline-none focus:ring-1 focus:ring-primary"
                  required
                >
                  <option value="">Select a delivery time</option>
                  <option value="Up to 1 week">Up to 1 week</option>
                  <option value="Up to 2 weeks">Up to 2 weeks</option>
                  <option value="Up to 1 month">Up to 1 month</option>
                  <option value="More than 1 month">More than 1 month</option>
                </select>
              </div>
            </>
          )}

          {/* ✅ Step 3: Summary */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                Review Your Order
              </h2>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Uploaded Images:
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {orderData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-[150px] h-[150px] border border-gray-300 rounded-md overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="justify-between flex w-full">
                  <div>Product:</div> 
                  <div>{orderData.title}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Category:</div> 
                  <div>{orderData.category}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Description:</div> 
                  <div>{orderData.description}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Budget:</div> 
                  <div>{orderData.budget} THB</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Quantity:</div> 
                  <div>{orderData.quantity}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Verify Product Service: </div> 
                  <div>{orderData.verifyProductService ? "Yes" : "No"}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Delivery Time:</div> 
                  <div>{orderData.deliveryTime}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Deliver from:</div> 
                  <div>{orderData.deliveryFrom}</div> 
                </div>
                <div className="justify-between flex w-full">
                  <div>Deliver to:</div> 
                  <div>{orderData.deliveryTo}</div> 
                </div>   
               
              </div>
            </>
          )}

          {/* 🔘 Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-800 px-4 py-2 font-bold rounded-lg hover:bg-gray-400 duration-300"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white px-4 py-2 font-bold rounded-lg hover:bg-dark-primary ease-in-out duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#FFF2AF] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#fbe784] duration-300"
              >
                Submit Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateOrderPage;
