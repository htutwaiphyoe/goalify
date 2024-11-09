import { getSession } from "next-auth/react";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";

export const checkUserIsAuthenticated = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    const session = await getSession({ req });
    if (!session) throw new ErrorHandler("You need to login.", 401);
    req.user = session.user;
    next();
  }
);

export const checkUserIsAuthorized = (...roles: string[]) =>
  catchAsyncErrors(async (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role))
      throw new ErrorHandler("You have no permission to access.", 403);
    next();
  });
