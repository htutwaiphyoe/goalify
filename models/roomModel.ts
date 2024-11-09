import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Room number is required."],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Room name is required."],
    maxLength: [100, "Room name must be at most 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Room description is required."],
  },
  category: {
    type: String,
    required: [true, "Please enter room type"],
    enum: {
      values: ["Superior", "Deluxe", "Junior", "Executive"],
      message: "Invalid room category",
    },
  },
  facilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
    },
  ],
  promotion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
    required: false,
  },
  pricePerNight: {
    type: Number,
    required: [true, "Room price is required."],
    default: 0.0,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Guest capacity is required."],
  },
  bedType: {
    type: String,
    default: "Double",
    enum: {
      values: ["Single", "Twin", "Double", "King"],
      message: "{Value} is not supported bed type.",
    },
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  image: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      avatar: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

roomSchema.plugin(uniqueValidator, {
  message: "Room number is already in use.",
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
