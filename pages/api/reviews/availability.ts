import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { checkUserIsAuthenticated } from "@/middlewares/auth";
import { checkReviewAvailability } from "@/controllers/reviewController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.use(checkUserIsAuthenticated).get(checkReviewAvailability);

export default router.handler();
