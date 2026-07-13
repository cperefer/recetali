import { validatePassword } from "@/lib/auth";
import { getUserByEmailWithRecipes } from "@/lib/dal";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface JWTUser {
  id: string;
  email: string;
  name: string;
  role: string;
  favorites: number[];
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "favorites" in user) {
        token.id = user.id;
        token.role = user.role;
        token.favorites = user.favorites as unknown as number[];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.favorites = token.favorites;
      }

      return session;
    },
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
        const user = await getUserByEmailWithRecipes(email);

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
          favorites: user.favorites.map((fav) => fav.recipeId),
        };
      },
    }),
  ],
});
