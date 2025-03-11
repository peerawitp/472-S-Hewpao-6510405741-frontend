import React from "react";
import { IdentityVerification } from "@/interfaces/IdentityVerification";


interface ConfirmInfoProps {
  formData: IdentityVerification;
  handleBackStep: () => void;
  handleNextStep: () => void;
}

const ConfirmInfo: React.FC<ConfirmInfoProps> = ({ formData, handleBackStep, handleNextStep }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Confirm Your Information</h2>
      <p><strong>First Name TH:</strong> {formData.firstNameTh} <strong>Last Name TH:</strong> {formData.lastNameTh}</p>
      <p><strong>First Name EN:</strong> {formData.firstNameEn} <strong>Last Name EN:</strong> {formData.lastNameEn}</p>
      <p><strong>Date of Birth:</strong> {formData.dob}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>Province:</strong> {formData.province}</p>
      <p><strong>District:</strong> {formData.district}</p>
      <p><strong>SubDistrict:</strong> {formData.subdistrict}</p>
      <p><strong>PostalCode:</strong> {formData.postalCode}</p>
      <p><strong>Uploaded Documents:</strong> {formData.idDocuments.length} file(s)</p>


    </div>
  );
};

export default ConfirmInfo;
