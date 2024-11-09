import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { resetPassword } from "@/controllers/authController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.put(resetPassword);

export default router.handler();
