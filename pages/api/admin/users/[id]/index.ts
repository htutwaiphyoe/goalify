import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import { getUser, updateUser } from "@/controllers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getUser)
  .put(updateUser);

export default router.handler();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};
