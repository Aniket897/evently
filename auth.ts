import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        });

        console.log(user);

        if (!user) {
          return null;
        }

        const isPasswordMatch = compareSync(
          credentials?.password as string,
          user.password
        );

        console.log(isPasswordMatch);

        if (!isPasswordMatch) {
          return null;
        }

        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
