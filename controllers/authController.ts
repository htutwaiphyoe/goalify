import type { NextApiRequest, NextApiResponse } from "next";
import userModel from "@/models/userModel";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";
import { IUserRequest } from "@/types/global";
import { deleteAvatar, uploadAvatar } from "@/configs/cloudinary";
import { sendEmail } from "@/libs/mail";
import { generateHashToken } from "@/libs/crypto";

export const signUp = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await uploadAvatar(req.body.avatar);

    const { name, email, phone, password } = req.body;

    await userModel.create({
      name,
      email,
      phone,
      password,
      avatar: {
        publicId: result.public_id,
        url: result.secure_url,
      },
      preferences: {
        isVegan: false,
        isSmoker: false,
        usedWheelChair: false,
        isMinimalist: false,
        isFoodie: false,
        isFitnessEnthusiast: false,
        isWorkaholic: false,
      },
    });

    res.status(201).json({
      status: "success",
      message: "User created.",
      data: { user: { email, password } },
    });
  }
);

export const getUserProfile = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse) => {
    const user = await userModel.findById(req.user._id);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

export const updateUserProfile = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse) => {
    const user = await userModel.findById(req.user._id);

    if (!user) throw new ErrorHandler("No user found.", 404);

    user.name = req.body.name;
    user.email = req.body.email;

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

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile saved.",
    });
  }
);

export const forgotPassword = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) throw new ErrorHandler("No user found.", 404);

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    const resetPasswordUrl = `${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DOMAIN_URL
        : process.env.DEV_DOMAIN_URL
    }/password/reset/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset request (valid 30 min)",
        body: `
        <html>
          <body>
            <h3>Here is the link to reset your password for Hotel Valhalla account, <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></h3>
          </body>
        </html>`,
        text: `Here is the link to reset your password for Hotel Valhalla account: ${resetPasswordUrl}`,
      });

      res.status(200).json({
        status: "success",
        message:
          "Reset password email sent. Please check email in spam if you cannot find.",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;
      await user.save();
      throw new ErrorHandler("Something went wrong!", 500);
    }
  }
);

export const resetPassword = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const resetPasswordToken = generateHashToken(req.query.token as string);

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user)
      throw new ErrorHandler(
        "Token is invalid or has expired, Please try again.",
        400
      );

    if (req.body.password !== req.body.confirmPassword)
      throw new ErrorHandler("Passwords do not match!", 400);

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password saved.",
    });
  }
);
