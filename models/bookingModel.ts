import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  promotion: {
    type: String,
    default: "",
  },
  daysOfStay: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paidWith: {
      type: String,
      default: "",
    },
    account: {
      type: String,
      default: "",
    },
  },
  paidAt: {
    type: Date,
    default: "",
  },
  refundedAt: {
    type: Date,
    default: "",
  },
  checkedInAt: {
    type: Date,
    default: "",
  },
  checkedOutAt: {
    type: Date,
    default: "",
  },
  cancelAt: {
    type: Date,
    default: "",
  },
  status: {
    type: String,
    default: "Booked",
    enum: {
      values: ["Booked", "Checked-In", "Checked-Out", "Cancelled"],
      message: "{Value} is not supported status.",
    },
  },
  guestInformation: {
    type: String,
    default: "",
  },
  additionalRequest: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
