import type { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";
import promotionModel from "@/models/promotionModel";

export const getPromotions = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const promotions = await promotionModel.find();

    res.status(200).json({
      status: "success",
      data: { promotions },
    });
  }
);

export const createPromotion = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await promotionModel.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Promotion added.",
    });
  }
);

export const getPromotionById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const promotion = await promotionModel.findById(req.query.id);

    if (!promotion)
      throw new ErrorHandler("Promotion with that id cannot found!", 404);

    res.status(200).json({
      status: "success",
      data: { promotion },
    });
  }
);

export const updatePromotion = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const promotion = await promotionModel.findById(req.query.id);

    if (!promotion) {
      throw new ErrorHandler("Promotion with that id cannot found!", 404);
    }

    const body = { ...req.body, updatedAt: Date.now() };

    await promotionModel.findByIdAndUpdate(req.query.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Promotion saved.",
    });
  }
);

export const deletePromotion = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const promotion = await promotionModel.findByIdAndDelete(req.query.id);

    if (!promotion)
      throw new ErrorHandler("Promotion with that id cannot found!", 404);

    res.status(200).json({
      status: "success",
      message: "Promotion deleted.",
    });
  }
);
