import type { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import userModel from "@/models/userModel";
import { deleteAvatar, uploadAvatar } from "@/configs/cloudinary";
import ErrorHandler from "@/utils/ErrorHandler";

export const getAllUsers = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await userModel.find();

    res.status(200).json({
      status: "success",
      data: { users },
    });
  }
);

export const getUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await userModel.findById(req.query.id);

    if (!user) throw new ErrorHandler("User not found!", 404);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

export const createUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await uploadAvatar(req.body.avatar);

    req.body.avatar = {
      publicId: result.public_id,
      url: result.secure_url,
    };

    await userModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "User created.",
    });
  }
);

export const updateUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await userModel.findById(req.query.id);

    if (!user) throw new ErrorHandler("No user found.", 404);

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.password) user.password = req.body.password;
    if (req.body.preferences) user.preferences = req.body.preferences;
    if (req.body.avatar) {
      await deleteAvatar(user.avatar.publicId);
      const result = await uploadAvatar(req.body.avatar);
      user.avatar = {
        publicId: result.public_id,
        url: result.secure_url,
      };
    }

    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      status: "success",
      message: "User saved.",
    });
  }
);

export const updateUserStatus = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await userModel.findById(req.query.id);

    if (!user) throw new ErrorHandler("User not found!", 404);

    user.isSuspended = req.body.isSuspended;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      status: "success",
      message: `User is ${req.body.isSuspended ? "suspended" : "activated"}.`,
    });
  }
);
