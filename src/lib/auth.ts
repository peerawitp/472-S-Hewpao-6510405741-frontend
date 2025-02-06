import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axiosInstance from "./axiosInstance";
import { LoginResponseDTO } from "@/dtos/Auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: { access_type: "offline", prompt: "consent" },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      } else if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        await axiosInstance
          .post<LoginResponseDTO>("/auth/login/oauth", {
            provider: account.provider,
            id_token: account.id_token!,
          })
          .then((response) => {
            if (response.status === 200) {
              token.access_token = response.data.access_token;
              token.user = response.data;
              return token;
            } else {
              console.error(response.data);
              throw new Error("Failed to login with OAuth");
            }
          });
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token.user,
        },
      };
    },
  },
});
