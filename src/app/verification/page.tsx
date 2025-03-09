"use client";
import { useState } from "react";
import ProgressIndicator from "../component/ProgressIndicator";
import ConfirmInfo from "./components/ConfirmInfo";
import PersonalInfoForm from "./components/PersonalInfoForm";
import UploadDocuments from "./components/UploadDocuments";

interface IdentityVerification {
  agreeToTerms: boolean;
  IDNumber: string;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  dobTh: string;
  dobEn: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  userId: string;
  idDocuments: File[];
}

function Page() {
  const [step, setStep] = useState(1);
  const verificationSteps = ['Verification Started', 'Identity Checked', 'Verifying', 'Verification Complete'];
  const [formData, setFormData] = useState<IdentityVerification>({
    agreeToTerms: false,
    IDNumber: "",
    firstNameTh: "",
    lastNameTh: "",
    firstNameEn: "",
    lastNameEn: "",
    dobTh: "",
    dobEn: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    userId: "",
    idDocuments: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImagesChange = (newImages: File[]) => {
    setFormData((prev) => ({ ...prev, idDocuments: newImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white rounded-lg p-4">
        <ProgressIndicator step={step} steps={verificationSteps} />

        {step === 1 && <PersonalInfoForm formData={formData} handleChange={handleChange} />}
        {step === 2 && <UploadDocuments formData={formData} handleImagesChange={handleImagesChange} />}
        {step === 3 && <ConfirmInfo formData={formData} handleBackStep={() => setStep(2)} handleNextStep={() => setStep(4)} />}

        {step < 4 && (
          <div className="flex justify-center mt-4">
            <button onClick={() => setStep((prev) => prev + 1)} className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
