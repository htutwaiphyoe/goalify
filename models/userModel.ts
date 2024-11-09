import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import { THIRTY_MINUTES } from "@/data/constant";
import { generateHashToken, generateToken } from "@/libs/crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    maxLength: [30, "Name cannot be more than 30 characters."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email address."],
  },
  phone: {
    type: String,
    maxLength: [15, "Phone cannot be more than 15 characters."],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "Password cannot be less than 8 characters."],
    trim: true,
    select: false,
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
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "agency", "admin"],
      message: "{Value} is not supported role.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  preferences: {
    isVegan: {
      type: Boolean,
      default: false,
    },
    isSmoker: {
      type: Boolean,
      default: false,
    },
    usedWheelChair: {
      type: Boolean,
      default: false,
    },
    isMinimalist: {
      type: Boolean,
      default: false,
    },
    isFoodie: {
      type: Boolean,
      default: false,
    },
    isFitnessEnthusiast: {
      type: Boolean,
      default: false,
    },
    isWorkaholic: {
      type: Boolean,
      default: false,
    },
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

userSchema.plugin(uniqueValidator, { message: "Email is already in use." });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password as string, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

userSchema.methods.generateResetPasswordToken = function () {
  const token = generateToken();
  this.resetPasswordToken = generateHashToken(token);
  this.resetPasswordExpiry = Date.now() + THIRTY_MINUTES;
  return token;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
