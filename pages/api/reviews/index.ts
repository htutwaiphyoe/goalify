import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { checkUserIsAuthenticated } from "@/middlewares/auth";
import {
  getUserReviews,
  updateRoomReviews,
} from "@/controllers/reviewController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.use(checkUserIsAuthenticated).get(getUserReviews).put(updateRoomReviews);

export default router.handler();
