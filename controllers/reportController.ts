import type { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import roomModel from "@/models/roomModel";
import bookingModel from "@/models/bookingModel";
import { bookingStatus, paymentStatus, roomCategory } from "@/data/constant";
import userModel from "@/models/userModel";

export const getReports = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      query = {
        $and: [{ startDate: { $lte: end } }, { endDate: { $gte: start } }],
      };
    }

    const rooms = await roomModel.find();
    const bookings = await bookingModel
      .find(query)
      .populate({
        path: "room",
        select: ["name", "roomNumber", "category", "ratings"],
        model: roomModel,
      })
      .populate({
        path: "user",
        select: ["name", "email", "role", "avatar"],
        model: userModel,
      });

    const noOfRooms = rooms.length;
    const noOfBookings = bookings.length;

    const getUniqueRooms = (acc: any, curr: any) => {
      return acc.includes(curr.room?._id?.toString())
        ? acc
        : [...acc, curr.room?._id?.toString()];
    };

    const validBookings = bookings.filter(
      (booking) => booking.status !== bookingStatus.cancelled
    );
    const occupancyBookings = bookings.filter(
      (booking) =>
        booking.status !== bookingStatus.cancelled &&
        booking.status !== bookingStatus.checkedOut
    );
    const completedBookings = bookings.filter(
      (booking) =>
        booking.status !== bookingStatus.cancelled &&
        booking.paymentInfo.status !== paymentStatus.pending &&
        booking.paymentInfo.status !== paymentStatus.refunded
    );
    const cancelledBookings = bookings.filter(
      (booking) => booking.status === bookingStatus.cancelled
    );

    const totalRevenue = completedBookings.reduce(
      (acc, curr) => acc + curr.amountPaid,
      0
    );

    const occupiedRooms = occupancyBookings.reduce(getUniqueRooms, []).length;
    const totalRoomsSold = completedBookings.reduce(getUniqueRooms, []).length;
    const totalLengthOfStays = validBookings.reduce((acc, curr) => {
      return acc + curr.daysOfStay;
    }, 0);
    const noOfCancelledBookings = cancelledBookings.length;

    const revenuePerRoomType = {
      [roomCategory.superior]: 0,
      [roomCategory.deluxe]: 0,
      [roomCategory.junior]: 0,
      [roomCategory.executive]: 0,
    };

    completedBookings.forEach((booking) => {
      revenuePerRoomType[booking.room?.category] += booking.amountPaid;
    });

    const roomRevenueByBookings = completedBookings.reduce((acc, curr) => {
      const id = curr.room?._id?.toString();
      acc[id] ? (acc[id] += curr.amountPaid) : (acc[id] = curr.amountPaid);
      return acc;
    }, {});

    const roomRevenue = rooms.map((room) => ({
      _id: room?._id,
      name: room?.name,
      roomNumber: room?.roomNumber,
      reviews: room?.reviews.length,
      bookings: bookings.filter(
        (booking) => booking.room?._id?.toString() === room?._id.toString()
      ).length,
      revenue: roomRevenueByBookings[room?._id?.toString()]
        ? roomRevenueByBookings[room?._id?.toString()]
        : 0,
    }));

    const userRevenue = bookings.reduce((acc, curr) => {
      const existingUser = acc.find(
        (user: any) => user?._id?.toString() === curr?.user?._id?.toString()
      );
      const isPaidBooking = completedBookings.find(
        (booking) => booking?._id?.toString() === curr?._id?.toString()
      );

      if (existingUser) {
        return acc.map((user: any) =>
          user?._id?.toString() === curr.user?._id?.toString()
            ? {
                ...existingUser,
                bookings: existingUser.bookings + 1,
                revenue:
                  existingUser.revenue + (isPaidBooking ? curr.amountPaid : 0),
              }
            : user
        );
      }
      acc.push({
        _id: curr.user?._id,
        name: curr.user?.name,
        email: curr.user?.email,
        avatar: curr.user?.avatar,
        role: curr.user?.role,
        reviews: rooms.reduce(
          (acc, room) =>
            room.reviews.find(
              (review: any) =>
                review.user?.toString() === curr.user?._id?.toString()
            )
              ? ++acc
              : acc,
          0
        ),
        bookings: 1,
        revenue: isPaidBooking ? curr.amountPaid : 0,
      });
      return acc;
    }, []);

    const bookingAndPaymentStatus = {
      [bookingStatus.booked]: 0,
      [bookingStatus.checkedIn]: 0,
      [bookingStatus.checkedOut]: 0,
      [bookingStatus.cancelled]: 0,
      [paymentStatus.pending]: 0,
      [paymentStatus.paid]: 0,
      [paymentStatus.refunded]: 0,
    };

    bookings.forEach((booking) => {
      ++bookingAndPaymentStatus[booking.status];
      ++bookingAndPaymentStatus[booking.paymentInfo.status];
    });

    const occupancyRate = occupiedRooms / noOfRooms;
    const averageDailyRate = totalRevenue / totalRoomsSold;
    const revenuePerAvailableRooms = totalRevenue / noOfRooms;
    const averageLengthOfStays = totalLengthOfStays / validBookings.length;
    const cancellationRate = noOfCancelledBookings / noOfBookings;

    res.status(200).json({
      status: "success",
      data: {
        occupancyRate,
        noOfOccupancyBookings: occupancyBookings.length,
        noOfRooms,
        totalRevenue,
        totalRoomsSold,
        averageDailyRate,
        revenuePerAvailableRooms,
        averageLengthOfStays,
        totalLengthOfStays,
        noOfValidBookings: validBookings.length,
        cancellationRate,
        noOfCancelledBookings,
        noOfBookings,
        revenuePerRoomType,
        roomRevenue,
        userRevenue,
        bookingAndPaymentStatus,
      },
    });
  }
);
