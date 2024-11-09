import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import validator from "validator";
import userModel from "@/models/userModel";
import connectDB from "@/configs/connectDB";

const createOptions = (req: NextApiRequest): AuthOptions => ({
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      //@ts-ignore
      async authorize(credentials: ICredentials) {
        connectDB();
        const { email, password } = credentials;
        if (!email.trim() || !validator.isEmail(email) || !password.trim()) {
          throw new Error("Invalid email or password.");
        }

        const user = await userModel.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
          throw new Error("Invalid email or password.");
        }

        if (user.isSuspended)
          throw new Error(
            "User is suspended. Please contact to support center."
          );

        user.password = undefined;
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      if (req.url?.includes("/api/auth/session?update")) {
        // @ts-ignore
        const updatedUser = await userModel.findById(token?.user?._id);
        token.user = updatedUser;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;
      return session;
    },
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, createOptions(req));
};

export default handler;
