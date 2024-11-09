import type { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import roomModel from "@/models/roomModel";
import { deleteAvatar, uploadRoomImage } from "@/configs/cloudinary";
import ErrorHandler from "@/utils/ErrorHandler";
import facilityModel from "@/models/facilityModel";
import { IUserRequest } from "@/types/global";
import bookingModel from "@/models/bookingModel";
import promotionModel from "@/models/promotionModel";

export const getAllRooms = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const rooms = await roomModel
      .find()
      .populate({ path: "promotion", model: promotionModel });
    res.status(200).json({
      status: "success",
      data: { rooms },
    });
  }
);

export const createRoom = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse) => {
    const result = await uploadRoomImage(req.body.image);

    req.body.image = {
      publicId: result.public_id,
      url: result.secure_url,
    };

    req.body.user = req.user._id;

    await roomModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Room created.",
    });
  }
);

export const getRoomById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await roomModel
      .findById(req.query.id)
      .populate({ path: "facilities", model: facilityModel })
      .populate({ path: "promotion", model: promotionModel });

    if (!room) throw new ErrorHandler("Room not found!", 404);

    res.status(200).json({
      status: "success",
      data: { room },
    });
  }
);

export const updateRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await roomModel.findById(req.query.id);

    if (!room) throw new ErrorHandler("Room not found!", 404);

    if (req.body.image) {
      await deleteAvatar(room.image.publicId);
      const result = await uploadRoomImage(req.body.image);
      req.body.image = {
        publicId: result.public_id,
        url: result.secure_url,
      };
    } else {
      req.body.image = room.image;
    }

    req.body.updatedAt = Date.now();

    await roomModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Room saved.",
    });
  }
);

export const deleteRoom = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const bookings = await bookingModel.find({ room: req.query.id });

    if (bookings.length > 0)
      throw new ErrorHandler(
        "This room have some bookings. It cannot be deleted.",
        403
      );

    const room = await roomModel.findByIdAndDelete(req.query.id);

    if (!room) throw new ErrorHandler("Room not found!", 404);

    await deleteAvatar(room.image.publicId);

    res.status(201).json({
      status: "success",
      message: "Room deleted.",
    });
  }
);
