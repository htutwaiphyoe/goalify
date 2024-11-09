import type { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import roomModel from "@/models/roomModel";
import ErrorHandler from "@/utils/ErrorHandler";
import { IUserRequest } from "@/types/global";
import bookingModel from "@/models/bookingModel";
import { bookingStatus } from "@/data/constant";

export const updateRoomReviews = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const { roomId, rating, comment } = req.body;

    if (!rating || !comment) throw new ErrorHandler("Invalid data", 400);

    const room = await roomModel.findById(roomId);

    if (!rating) throw new ErrorHandler("Room not found", 404);

    const hasReviewed = room.reviews.find(
      (review: any) => review.user.toString() === req.user._id.toString()
    );

    if (hasReviewed) {
      room.reviews.forEach((review: any) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.rating = +rating;
          review.comment = comment;
          review.updatedAt = Date.now();
        }
      });
    } else {
      room.reviews.push({
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        rating: +rating,
        comment,
      });
      room.numOfReviews = room.reviews.length;
    }

    room.ratings =
      room.reviews.reduce(
        (acc: number, curr: { rating: number }) => acc + curr.rating,
        0
      ) / room.reviews.length;

    await room.save();

    res.status(200).json({
      status: "success",
      message: "Review saved.",
    });
  }
);

export const checkReviewAvailability = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const { roomId } = req.query;

    const bookings = await bookingModel.find({
      user: req.user._id,
      room: roomId,
    });

    const isReviewAvailable =
      bookings.filter((booking) => booking.status === bookingStatus.checkedOut)
        .length > 0;

    res.status(200).json({
      status: "success",
      data: { isReviewAvailable },
    });
  }
);

export const getAllReviews = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const rooms = await roomModel.find();

    const roomList = rooms.map((room) => ({
      value: room._id,
      label: room.name,
    }));

    const reviews = rooms
      .map((room) => ({ room: room._id, reviews: room.reviews }))
      .flat();

    res.status(200).json({
      status: "success",
      data: { reviews, roomList },
    });
  }
);

export const getUserReviews = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse) => {
    const rooms = await roomModel.find();

    const roomList = rooms.map((room) => ({
      value: room._id,
      label: room.name,
    }));

    const reviews = rooms
      .map((room) => ({
        room: room._id,
        reviews: room.reviews.filter(
          (review: any) => review.user.toString() === req.user._id.toString()
        ),
      }))
      .flat();

    res.status(200).json({
      status: "success",
      data: { reviews, roomList },
    });
  }
);

export const deleteReview = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await roomModel.findById(req.query.roomId);

    const reviews = room.reviews.filter(
      (review: any) => review._id.toString() !== req.query.id?.toString()
    );

    const numOfReviews = reviews.length;

    const ratings =
      numOfReviews === 0
        ? 0.0
        : reviews.reduce(
            (acc: number, curr: { rating: number }) => acc + curr.rating,
            0
          ) / numOfReviews;

    await roomModel.findByIdAndUpdate(
      req.query.roomId,
      {
        reviews,
        numOfReviews,
        ratings,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Review deleted.",
    });
  }
);
