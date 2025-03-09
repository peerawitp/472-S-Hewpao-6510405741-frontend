import React from "react";

interface PersonalInfoFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

      {[
        { label: "ID Number", name: "IDNumber" },
        { label: "First Name (Thai)", name: "firstNameTh" },
        { label: "Last Name (Thai)", name: "lastNameTh" },
        { label: "First Name (English)", name: "firstNameEn" },
        { label: "Last Name (English)", name: "lastNameEn" },
        { label: "Date of Birth (Thai)", name: "dobTh" },
        { label: "Date of Birth (English)", name: "dobEn" },
        { label: "Address", name: "address" },
        { label: "Sub District", name: "subDistrict" },
        { label: "District", name: "district" },
        { label: "Province", name: "province" },
        { label: "Postal Code", name: "postalCode" },
      ].map(({ label, name }) => (
        <div className="mt-4" key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoForm;
