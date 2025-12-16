import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        query: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.query !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        const isEmail = credentials.query.includes("@");
        if (!credentials.query || !credentials.password) return null;
        const user = await prisma.user.findFirst({
          where: isEmail
            ? { email: credentials.query }
            : { username: credentials.query },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;
        return { id: user.id, email: user.email, username: user.username };
      },
    }),
  ],
} satisfies NextAuthConfig;
