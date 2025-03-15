import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { CheckoutRequestDTO, CheckoutResponse } from "@/dtos/Checkout";

const createCheckout = async (checkout: CheckoutRequestDTO) => {
  const session = await getSession();
  const { data } = await axiosInstance.post<CheckoutResponse>(
    "/checkout/gateway",
    checkout,
    {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    },
  );
  return data;
};

const useCheckout = () => {
  return useMutation({
    mutationFn: createCheckout,
  });
};

export { useCheckout };
