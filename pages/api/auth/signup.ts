import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { signUp } from "@/controllers/authController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.post(signUp);

export default router.handler();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};
