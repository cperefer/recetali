import { validatePassword } from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface JWTUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: {},
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>,
      ): Promise<JWTUser | null> {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!credentials) {
          return null;
        }
        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.firstName,
          role: user.role,
        };
      },
    }),
  ],
});
