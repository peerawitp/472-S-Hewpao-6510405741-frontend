
export interface IdentityVerification {
    userId: string;
    IDNumber: string;
    firstNameTh: string;
    lastNameTh: string;
    firstNameEn: string;
    lastNameEn: string;
    dob: string;
    address: string;
    province: string;
    district: string;
    subdistrict: string;
    postalCode: string;
    idDocuments: File[];
    agreeToTerms: boolean;
  }