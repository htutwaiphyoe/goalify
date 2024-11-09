import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import {
  getPromotionById,
  deletePromotion,
  updatePromotion,
} from "@/controllers/promotionController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getPromotionById)
  .put(updatePromotion)
  .delete(deletePromotion);

export default router.handler();
