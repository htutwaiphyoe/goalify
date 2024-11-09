import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  getUserProfile,
  updateUserProfile,
} from "@/controllers/authController";
import { checkUserIsAuthenticated } from "@/middlewares/auth";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.use(checkUserIsAuthenticated).get(getUserProfile).put(updateUserProfile);

export default router.handler();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};
