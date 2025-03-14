// interfaces/Transaction.ts
import { Product } from "./Product";
import { User } from "./User";

// เปลี่ยนให้ตรงกับ types.PaymentStatus ในฝั่ง Go
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface Transaction {
  ID: string; // UUID
  UserID: string;
  Amount: number;
  Currency: string; // ถูกจำกัดเป็น "THB" ในฐานข้อมูล
  ThirdPartyGateway: string; // เช่น Stripe, PayPal
  ThirdPartyPaymentID?: string;
  ProductRequestID?: number;
  Status: PaymentStatus;
  CreatedAt: string; // ISO string จาก time.Time
  UpdatedAt: string; // ISO string จาก time.Time
  
  // ข้อมูลเพิ่มเติมสำหรับการแสดงผล (อาจจะต้องมาจากการ join หรือข้อมูลเพิ่มเติม)
  User?: User; 
  ProductRequest?: Product;
  description?: string; // สำหรับแสดงรายละเอียดเพิ่มเติม
}