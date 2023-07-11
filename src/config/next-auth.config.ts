import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      clientId: process.env.GITHUB_CLIENT_ID!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,

  // Uncomment for debugging
  // logger: {
  //   warn: console.warn,
  //   error: console.error,
  //   debug: console.debug,
  // },
};
