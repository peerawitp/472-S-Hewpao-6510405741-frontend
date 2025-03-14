export interface CheckoutRequestDTO {
  product_request_id: number;
  payment_gateway: string;
}

export interface CreatePaymentResponseDTO {
  payment_id: string;
  payment_url: string;
  created_at: number;
  expired_at: number;
}

export interface CheckoutResponse {
  payment: CreatePaymentResponseDTO;
}
