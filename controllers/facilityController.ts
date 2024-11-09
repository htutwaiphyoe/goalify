import type { NextApiRequest, NextApiResponse } from "next";
import facilityModel from "@/models/facilityModel";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";

export const getFacilities = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const facilities = await facilityModel.find();
    res.status(200).json({
      status: "success",
      data: { facilities },
    });
  }
);

export const createFacility = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await facilityModel.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Facility added.",
    });
  }
);

export const getFacilityById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const facility = await facilityModel.findById(req.query.id);

    if (!facility)
      throw new ErrorHandler("Facility with that id cannot found!", 404);

    res.status(200).json({
      status: "success",
      data: {
        facility,
      },
    });
  }
);

export const updateFacility = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let facility = await facilityModel.findById(req.query.id);

    if (!facility) {
      throw new ErrorHandler("Facility with that id cannot found!", 404);
    }

    const body = {
      ...req.body,
      updatedAt: Date.now(),
    };

    facility = await facilityModel.findByIdAndUpdate(req.query.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Facility saved.",
    });
  }
);

export const deleteFacility = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const facility = await facilityModel.findByIdAndDelete(req.query.id);

    if (!facility)
      throw new ErrorHandler("Facility with that id cannot found!", 404);

    res.status(200).json({
      status: "success",
      message: "Facility deleted.",
    });
  }
);
