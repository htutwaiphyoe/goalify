import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      avatar: {
        publicId: string;
        url: string;
      };
      _id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
      isSuspended: boolean;
    };
  }
}
