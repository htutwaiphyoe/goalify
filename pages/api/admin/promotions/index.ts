import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import {
  getPromotions,
  createPromotion,
} from "@/controllers/promotionController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getPromotions)
  .post(createPromotion);

export default router.handler();
