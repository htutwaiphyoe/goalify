import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getRoomById } from "@/controllers/roomController";
import connectDB from "@/configs/connectDB";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.get(getRoomById);

export default router.handler();
