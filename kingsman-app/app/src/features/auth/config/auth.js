import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import prisma from "@/lib/prisma";
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: { name: user.name },
          create: { email: user.email, name: user.name },
        });
        return true;
      } catch (error) {
        console.error("signIn DB error:", error);
        return false;
      }
    },

    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      session.user.id = user.id;

      return session;
    },
  },
});
