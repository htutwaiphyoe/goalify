import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import {
  checkUserIsAuthenticated,
  checkUserIsAuthorized,
} from "@/middlewares/auth";
import { getAllRooms, createRoom } from "@/controllers/roomController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router
  .use(checkUserIsAuthenticated, checkUserIsAuthorized("admin"))
  .get(getAllRooms)
  .post(createRoom);

export default router.handler();
