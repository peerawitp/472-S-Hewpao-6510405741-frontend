// mockData/transactions.ts
import { Transaction } from "@/interfaces/Transaction";
import { mockUsers } from "./users";
import { products } from "./products";

// Create a function to generate transaction descriptions
const getTransactionDescription = (gateway: string, productName?: string): string => {
  if (productName) {
    return `Payment for ${productName} via ${gateway}`;
  }
  return `Payment via ${gateway}`;
};

// สร้างข้อมูลจำลองตามโครงสร้างใหม่
export const mockTransactions: Transaction[] = [
  {
    ID: "d5f35425-1c6a-4786-8e7d-438a2b2a856a",
    UserID: mockUsers[0].id,
    Amount: 549.0,
    Currency: "THB",
    ThirdPartyGateway: "Stripe",
    ThirdPartyPaymentID: "pi_3OWiCzKaRBtJLh0t1JmvMLWZ",
    ProductRequestID: 1,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 10, 14, 30).toISOString(),
    UpdatedAt: new Date(2024, 2, 10, 14, 30).toISOString(),
    User: mockUsers[0],
    ProductRequest: products[0],
    description: getTransactionDescription("Stripe", "AirPods Max")
  },
  {
    ID: "78a44dc2-a6d8-4b4d-8e9f-4c8c59b9e542",
    UserID: mockUsers[1].id,
    Amount: 45.0,
    Currency: "THB",
    ThirdPartyGateway: "PayPal",
    ThirdPartyPaymentID: "PAYID-MRBF3ZQ5FF78992RR3718323",
    ProductRequestID: 2,
    Status: "PENDING",
    CreatedAt: new Date(2024, 2, 15, 16, 45).toISOString(),
    UpdatedAt: new Date(2024, 2, 15, 16, 45).toISOString(),
    User: mockUsers[1],
    ProductRequest: products[1],
    description: getTransactionDescription("PayPal", "THE QUENCHER H2.0 FLOWSTATE™ TUMBLER")
  },
  {
    ID: "3f69c214-dfae-49e3-9455-de4f05e8c4ab",
    UserID: mockUsers[2].id,
    Amount: 799.0,
    Currency: "THB",
    ThirdPartyGateway: "Stripe",
    ThirdPartyPaymentID: "pi_3OWjDzKaRBtJLh0t1NmPMzyx",
    ProductRequestID: 3,
    Status: "FAILED",
    CreatedAt: new Date(2024, 2, 20, 11, 30).toISOString(),
    UpdatedAt: new Date(2024, 2, 20, 11, 35).toISOString(),
    User: mockUsers[2],
    ProductRequest: products[2],
    description: getTransactionDescription("Stripe", "Apple Watch Ultra 2")
  },
  {
    ID: "c12f6a3d-7e8b-4a91-b23c-5defad7c9876",
    UserID: mockUsers[3].id,
    Amount: 16.97,
    Currency: "THB",
    ThirdPartyGateway: "OmisePay",
    ThirdPartyPaymentID: "chrg_test_5pqcbovxh6d2vtmmxkd",
    ProductRequestID: 8,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 18, 9, 22).toISOString(),
    UpdatedAt: new Date(2024, 2, 18, 9, 22).toISOString(),
    User: mockUsers[3],
    ProductRequest: products[7],
    description: getTransactionDescription("OmisePay", "Bengay Ultra Strength Pain Relieving Cream")
  },
  {
    ID: "8bd51f4e-9a2c-4e7d-bc85-1f3a7ef2d098",
    UserID: mockUsers[0].id,
    Amount: 13.53,
    Currency: "THB",
    ThirdPartyGateway: "PromptPay",
    ThirdPartyPaymentID: "PP3854775982341",
    ProductRequestID: 5,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 22, 15, 20).toISOString(),
    UpdatedAt: new Date(2024, 2, 22, 15, 20).toISOString(),
    User: mockUsers[0],
    ProductRequest: products[4],
    description: getTransactionDescription("PromptPay", "Takis Mini Fuego")
  },
  {
    ID: "6e2f8d91-a7b3-4c5d-9e1f-2a3b4c5d6e7f",
    UserID: mockUsers[2].id,
    Amount: 199.0,
    Currency: "THB",
    ThirdPartyGateway: "2C2P",
    ThirdPartyPaymentID: "TC987654321",
    ProductRequestID: 7,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 24, 13, 40).toISOString(),
    UpdatedAt: new Date(2024, 2, 24, 13, 40).toISOString(),
    User: mockUsers[2],
    ProductRequest: products[6],
    description: getTransactionDescription("2C2P", "COROS PACE 2 Sport Watch GPS")
  },
  {
    ID: "3d2c1b0a-9f8e-7d6c-5b4a-3c2d1e0f9a8b",
    UserID: mockUsers[4].id,
    Amount: 18.98,
    Currency: "THB",
    ThirdPartyGateway: "Stripe",
    ThirdPartyPaymentID: "pi_3OXkEzKaRBtJLh0t1MnQNwAx",
    ProductRequestID: 6,
    Status: "PENDING",
    CreatedAt: new Date(2024, 2, 25, 9, 30).toISOString(),
    UpdatedAt: new Date(2024, 2, 25, 9, 30).toISOString(),
    User: mockUsers[4],
    ProductRequest: products[5],
    description: getTransactionDescription("Stripe", "Harry Potter Bertie Botts")
  },
  {
    ID: "5f4e3d2c-1b0a-9f8e-7d6c-5b4a3c2d1e0f",
    UserID: mockUsers[3].id,
    Amount: 449.99,
    Currency: "THB",
    ThirdPartyGateway: "PayPal",
    ThirdPartyPaymentID: "PAYID-MRBG3ZQ5FF78992RR3791234",
    ProductRequestID: 4,
    Status: "CANCELLED",
    CreatedAt: new Date(2024, 2, 17, 11, 20).toISOString(),
    UpdatedAt: new Date(2024, 2, 26, 15, 45).toISOString(),
    User: mockUsers[3],
    ProductRequest: products[3],
    description: getTransactionDescription("PayPal", "Garmin Venu 2 Plus")
  },
  {
    ID: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    UserID: mockUsers[1].id,
    Amount: 800.0,
    Currency: "THB",
    ThirdPartyGateway: "SCB Easy",
    ThirdPartyPaymentID: "SCB2022031587654",
    ProductRequestID: 10,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 27, 14, 25).toISOString(),
    UpdatedAt: new Date(2024, 2, 27, 14, 25).toISOString(),
    User: mockUsers[1],
    ProductRequest: products[9],
    description: getTransactionDescription("SCB Easy", "Hiking Adventure")
  },
  {
    ID: "q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6",
    UserID: mockUsers[0].id,
    Amount: 1500.0,
    Currency: "THB",
    ThirdPartyGateway: "KBank",
    ThirdPartyPaymentID: "KB2022031765432",
    ProductRequestID: 9,
    Status: "COMPLETED",
    CreatedAt: new Date(2024, 2, 28, 13, 15).toISOString(),
    UpdatedAt: new Date(2024, 2, 28, 13, 15).toISOString(),
    User: mockUsers[0],
    ProductRequest: products[8],
    description: getTransactionDescription("KBank", "Travel to Japan")
  }
];