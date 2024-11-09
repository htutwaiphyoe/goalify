import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import { getAllUsers, createUser } from "@/controllers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getAllUsers)
  .post(createUser);

export default router.handler();
