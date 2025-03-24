import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
    }),
    LinkedIn({
      clientId: (process.env.CLIENT_ID as string) || "",
      clientSecret: (process.env.CLIENT_SECRET as string) || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT Callback:", { token, account, user });

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          id: (user as any)._id, // Cast user to any to access _id
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", { session, token });

      if (session.user) {
        (session.user as any)._id = (token.id as string) || ""; // Cast user to any to access _id
        (session.user as any).accessToken = (token.accessToken as string) || ""; // Cast user to any to access accessToken
      }
      return session;
    },
  },
};
