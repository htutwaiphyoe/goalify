import type { NextApiRequest, NextApiResponse } from "next";
import bookingModel from "@/models/bookingModel";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import ErrorHandler from "@/utils/ErrorHandler";
import { IUserRequest } from "@/types/global";
import userModel from "@/models/userModel";
import roomModel from "@/models/roomModel";
import getRawBody from "raw-body";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripeCheckoutSession = catchAsyncErrors(
  async (req: IUserRequest, res: NextApiResponse, next: any) => {
    const room = await roomModel.findById(req.query.id);

    if (!room) throw new ErrorHandler("Room not found", 404);

    const {
      startDate,
      endDate,
      daysOfStay,
      additionalRequest,
      amountPaid,
      promotion,
    } = req.query;

    const domainUrl =
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DOMAIN_URL
        : process.env.DEV_DOMAIN_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${domainUrl}/bookings`,
      cancel_url: `${domainUrl}/rooms/${req.query.id}`,
      customer_email: req.user.email,
      client_reference_id: req.query.id,
      metadata: {
        startDate,
        endDate,
        daysOfStay,
        amountPaid,
        additionalRequest,
        promotion,
      },
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Number(amountPaid) * 100,
            product_data: {
              name: room.name,
              description: room.description,
              images: [room.image.url],
            },
          },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: { session },
    });
  }
);

export const createBookingWithWebhook = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    try {
      const rawBody = await getRawBody(req);
      const signature = req.headers["stripe-signature"];

      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.NODE_ENV === "production"
          ? process.env.PROD_STRIPE_WEBHOOK_KEY
          : process.env.DEV_STRIPE_WEBHOOK_KEY
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const room = session.client_reference_id;
        const user = await userModel.findOne({ email: session.customer_email });
        const {
          startDate,
          endDate,
          daysOfStay,
          additionalRequest,
          amountPaid,
          promotion,
        } = session.metadata;

        const paymentInfo = {
          id: session.payment_intent,
          method: "Pay with Stripe",
          status: session.payment_status,
          paidWith: "Card",
          account: "",
        };

        await bookingModel.create({
          room,
          startDate,
          endDate,
          amountPaid,
          daysOfStay,
          paymentInfo,
          user: user._id,
          additionalRequest,
          promotion,
          guestInformation: "",
          paidAt: Date.now(),
        });

        res.status(201).json({
          status: "success",
          message: "Booking created.",
        });
      }
    } catch (err) {
      console.log("Stripe Error", err);
    }
  }
);
