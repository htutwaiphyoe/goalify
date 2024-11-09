import type { NextApiRequest, NextApiResponse } from "next";
import bookingModel from "@/models/bookingModel";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";
import { IUserRequest } from "@/types/global";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import userModel from "@/models/userModel";
import roomModel from "@/models/roomModel";
import { bookingStatus, paymentStatus } from "@/data/constant";
import { sendEmail } from "@/libs/mail";

const moment = extendMoment(Moment);

export const createBooking = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const {
      room,
      startDate,
      endDate,
      amountPaid,
      daysOfStay,
      paymentInfo,
      additionalRequest,
      promotion,
    } = req.body;

    await bookingModel.create({
      room,
      startDate,
      endDate,
      amountPaid,
      daysOfStay,
      paymentInfo,
      user: req.user._id,
      additionalRequest,
      promotion,
      guestInformation: "",
    });

    res.status(201).json({
      status: "success",
      message: "Booking created.",
    });
  }
);

export const checkRoomAvailability = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { room, startDate, endDate } = req.query;

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const bookings = await bookingModel.find({
      room,
      status: { $nin: [bookingStatus.cancelled, bookingStatus.checkedOut] },
      $and: [{ startDate: { $lte: end } }, { endDate: { $gte: start } }],
    });

    const isAvailable = bookings && bookings.length === 0;

    res.status(200).json({
      status: "success",
      data: { isAvailable },
    });
  }
);

export const getRoomBookedDates = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { room } = req.query;

    const bookings = await bookingModel.find({
      room,
      status: { $nin: [bookingStatus.cancelled, bookingStatus.checkedOut] },
    });

    let bookedDates: any[] = [];

    bookings.forEach((booking) => {
      const range = moment.range(
        moment(booking.startDate),
        moment(booking.endDate)
      );
      bookedDates = [...bookedDates, ...Array.from(range.by("day"))];
    });

    res.status(200).json({
      status: "success",
      data: { bookedDates },
    });
  }
);

export const getMyBookings = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const bookings = await bookingModel
      .find({ user: req.user._id })
      .populate({
        path: "room",
        select: ["name", "roomNumber"],
        model: roomModel,
      })
      .populate({
        path: "user",
        select: ["email"],
        model: userModel,
      });

    res.status(200).json({
      status: "success",
      data: { bookings },
    });
  }
);

export const getBookingDetails = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const booking = await bookingModel
      .findById(req.query.id)
      .populate({
        path: "room",
        select: [
          "roomNumber",
          "name",
          "category",
          "pricePerNight",
          "guestCapacity",
          "bedType",
          "image",
        ],
        model: roomModel,
      })
      .populate({
        path: "user",
        select: ["name", "avatar", "email"],
        model: userModel,
      });

    if (!booking) throw new ErrorHandler("Booking not found.", 404);

    res.status(200).json({
      status: "success",
      data: { booking },
    });
  }
);

export const updateBookingStatus = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const { status, paidWith, account } = req.body;
    const booking = await bookingModel.findById(req.query.id);

    if (!booking) throw new ErrorHandler("Booking not found.", 404);

    if (status === bookingStatus.checkedIn) {
      booking.status = bookingStatus.checkedIn;
      booking.checkedInAt = Date.now();
    }
    if (status === bookingStatus.checkedOut) {
      booking.status = bookingStatus.checkedOut;
      booking.checkedOutAt = Date.now();
    }

    if (status === bookingStatus.cancelled) {
      booking.status = bookingStatus.cancelled;
      booking.cancelAt = Date.now();
    }

    if (status === paymentStatus.paid) {
      booking.paymentInfo.status = paymentStatus.paid;
      booking.paymentInfo.paidWith = paidWith;
      booking.paymentInfo.account = account;
      booking.paidAt = Date.now();
    }

    if (status === paymentStatus.refunded) {
      booking.paymentInfo.status = paymentStatus.refunded;
      booking.refundedAt = Date.now();
    }

    booking.updatedAt = Date.now();

    await booking.save();

    try {
      if (status === bookingStatus.cancelled) {
        const admin = await userModel.findOne({ role: "admin" });
        await sendEmail({
          email: admin.email,
          subject: "Booking cancellation email",
          body: `
          <html>
          <body>
          <h3>${req.user.email} cancelled a booking. Here is the id of the booking ${req.query.id}</h3>
          </body>
          </html>`,
          text: `${req.user.email} cancelled a booking. Here is the id of the booking ${req.query.id}`,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Booking saved.",
      });
    } catch (error) {
      throw new ErrorHandler("Error in sending email", 500);
    }
  }
);

export const updateBookingAdditionalInformation = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { additionalRequest, guestInformation } = req.body;
    const booking = await bookingModel.findById(req.query.id);

    if (!booking) throw new ErrorHandler("Booking not found.", 404);

    booking.additionalRequest = additionalRequest;
    booking.guestInformation = guestInformation;
    booking.updatedAt = Date.now();

    await booking.save();

    res.status(200).json({
      status: "success",
      message: "Booking saved.",
    });
  }
);

export const getAllBookings = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const bookings = await bookingModel
      .find()
      .sort("-updatedAt")
      .populate({
        path: "room",
        select: ["name", "roomNumber"],
        model: roomModel,
      })
      .populate({
        path: "user",
        select: ["email"],
        model: userModel,
      });

    res.status(200).json({
      status: "success",
      data: { bookings },
    });
  }
);
