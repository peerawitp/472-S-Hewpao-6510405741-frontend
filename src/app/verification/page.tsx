"use client";
import { useState } from "react";
import ProgressIndicator from "../component/ProgressIndicator";
import ConfirmInfo from "./components/ConfirmInfo";
import PersonalInfoForm from "./components/PersonalInfoForm";
import UploadDocuments from "./components/UploadDocuments";
import { IdentityVerification } from "@/interfaces/IdentityVerification";


function Page() {
  const [step, setStep] = useState(1);
  const verificationSteps = ['Verification Started', 'Identity Checked', 'Verifying'];
  
  const [formData, setFormData] = useState<IdentityVerification>({
    userId:"",
    IDNumber: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
    dob: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    postalCode: "",
    idDocuments: [],
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImagesChange = (newImages: File[]) => {
    setFormData((prev) => ({ ...prev, idDocuments: newImages }));
  };

  const handleDateChange = (name: string, date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleBackStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
    else {
      handleConfirm(); // เมื่อถึงขั้นสุดท้ายให้เรียกฟังก์ชันยืนยัน
      setStep((prev) => prev + 1); // ไปหน้าอื่น
    }
  };

  const handleConfirm = () => {
    console.log("Final Form Data:", formData);
    alert("Verification Complete! 🎉");
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-lg p-4">
        <ProgressIndicator step={step} steps={verificationSteps} />

        {step === 1 && <PersonalInfoForm formData={formData} handleChange={handleChange} />}
        {step === 2 && <UploadDocuments formData={formData} handleImagesChange={handleImagesChange} />}
        {step === 3 && <ConfirmInfo formData={formData} handleBackStep={handleBackStep} handleNextStep={handleNextStep} />}

        {step < 4 && (
          <div className="flex justify-between mt-4">
            <button 
              onClick={handleBackStep} 
              className={`px-4 py-2 rounded-lg ${step === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-400 text-white"}`} 
              disabled={step === 1}
            >
              Back
            </button>

            <button 
              onClick={handleNextStep} 
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              {step === 3 ? "Confirm" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
