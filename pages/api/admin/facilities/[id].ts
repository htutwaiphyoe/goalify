import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import {
  getFacilityById,
  deleteFacility,
  updateFacility,
} from "@/controllers/facilityController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getFacilityById)
  .put(updateFacility)
  .delete(deleteFacility);

export default router.handler();
