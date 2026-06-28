import NextAuth from "next-auth";
import { authConfig } from "./app/src/features/auth/config/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/orders", "/products"],
};
