import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "../../../../config/config";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            console.log(data);
            throw new Error(data.message || "Login failed");
          }

          return data;
        } catch (error) {
          throw new Error(error.message || "Internal Server Error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: config.authSecret,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.data.accessToken;
        token.refreshToken = user.data.refreshToken;
        token.user = user.data.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
