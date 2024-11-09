import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import { updateUserStatus } from "@/controllers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .patch(updateUserStatus);

export default router.handler();
