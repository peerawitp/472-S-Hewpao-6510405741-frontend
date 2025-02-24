"use client";
import { useState } from "react";
import ImageUpload from "../component/ImageUpload";
import router from "next/navigation";
import Link from "next/link";

interface IdentityVerification {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  idDocuments: File[];
  agreeToTerms: boolean;
}

const isFormValid = (formData: {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  agreeToTerms: any;
}) => {
  return (
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.dob.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.agreeToTerms
  );
};

function Page() {
  const [formData, setFormData] = useState<IdentityVerification>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    idDocuments: [],
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagesChange = (newImages: File[]) => {
    setFormData((prev) => ({ ...prev, idDocuments: newImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting identity verification:", formData);
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Identity Verification</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1: Personal Information */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

            {/* First Name */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Phone */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Step 2: Upload Documents */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upload Documents</h2>
            <ImageUpload
              maxImages={2}
              images={formData.idDocuments}
              onImagesChange={handleImagesChange}
            />
            <p className="text-sm text-gray-600">Please upload a photo of your ID card or passport.</p>
          </div>

          {/* Step 3: Confirm */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800"></h2>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                I confirm that the information provided is accurate.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                Submit
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
