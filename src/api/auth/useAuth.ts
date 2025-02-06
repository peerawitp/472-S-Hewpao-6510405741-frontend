import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import {
  RegisterUserRequestDTO,
  LoginWithCredentialsRequestDTO,
  LoginResponseDTO,
  LoginWithOAuthRequestDTO,
} from "@/dtos/Auth";

const register = async (newUser: RegisterUserRequestDTO) => {
  const { data } = await axiosInstance.post("/auth/register", newUser);
  return data;
};

const login = async (newUser: LoginWithCredentialsRequestDTO) => {
  const { data } = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login",
    newUser,
  );
  return data;
};

const oauthLogin = async (oauthRequest: LoginWithOAuthRequestDTO) => {
  const { data } = await axiosInstance.post<LoginResponseDTO>(
    "/auth/login/oauth",
    {
      oauthRequest,
    },
  );
  return data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {},
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: async () => {},
  });
};

const useOAuthLogin = () => {
  return useMutation({
    mutationFn: oauthLogin,
    onSuccess: async () => {},
  });
};

export { useRegister, useLogin, useOAuthLogin };
