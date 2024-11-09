import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { forgotPassword } from "@/controllers/authController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.post(forgotPassword);

export default router.handler();
