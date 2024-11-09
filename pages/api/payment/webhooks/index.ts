import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { createBookingWithWebhook } from "@/controllers/paymentController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.post(createBookingWithWebhook);

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};
