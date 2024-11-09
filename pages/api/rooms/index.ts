import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getAllRooms } from "@/controllers/roomController";
import connectDB from "@/configs/connectDB";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.get(getAllRooms);

export default router.handler();
