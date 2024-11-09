import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { checkUserIsAuthenticated } from "@/middlewares/auth";
import { getStripeCheckoutSession } from "@/controllers/paymentController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.use(checkUserIsAuthenticated).get(getStripeCheckoutSession);

export default router.handler();
