import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { checkRoomAvailability } from "@/controllers/bookingController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.get(checkRoomAvailability);

export default router.handler();
