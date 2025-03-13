import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { CreateProductRequest } from "@/interfaces/ProductRequest";

const createProductRequest = async (
  newProductRequest: CreateProductRequest,
) => {
  const session = await getSession();

  const formData = new FormData();
  formData.append("name", newProductRequest.name);
  formData.append("desc", newProductRequest.desc);
  formData.append("budget", newProductRequest.budget.toString());
  formData.append("quantity", newProductRequest.quantity.toString());
  formData.append("category", newProductRequest.category);
  formData.append("from", newProductRequest.from);
  formData.append("to", newProductRequest.to);
  formData.append("check_service", newProductRequest.check_service.toString());

  newProductRequest.images.forEach((image, index) => {
    formData.append(`images`, image);
  });

  const { data } = await axiosInstance.post("/product-requests", formData, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const useCreateProductRequest = () => {
  return useMutation({
    mutationFn: createProductRequest,
  });
};

export { useCreateProductRequest };
