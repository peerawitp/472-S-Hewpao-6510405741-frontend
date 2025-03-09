import React from "react";

interface ConfirmInfoProps {
  formData: any;
  handleBackStep: () => void;
  handleNextStep: () => void;
}

const ConfirmInfo: React.FC<ConfirmInfoProps> = ({ formData, handleBackStep, handleNextStep }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Confirm Your Information</h2>
      <p><strong>First Name TH:</strong> {formData.firstNameTh} <strong>Last Name TH:</strong> {formData.lastNameTh}</p>
      <p><strong>First Name EN:</strong> {formData.firstNameEn} <strong>Last Name EN:</strong> {formData.lastNameEn}</p>
      <p><strong>Date of Birth TH:</strong> {formData.dobTh}</p>
      <p><strong>Date of Birth EN:</strong> {formData.dobEn}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>SubDistrict:</strong> {formData.subDistrict}</p>
      <p><strong>Uploaded Documents:</strong> {formData.idDocuments.length} file(s)</p>

      <div className="flex justify-between mt-4">
        <button onClick={handleBackStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
          Back
        </button>
        <button onClick={handleNextStep} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
};

export default ConfirmInfo;
