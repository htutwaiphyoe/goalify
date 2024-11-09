import { isValidEmail } from "@/utils/helpers";
import * as yup from "yup";
import { paymentProviders } from "./constant";

export const signUpValidationSchema = yup.object({
  avatar: yup.string().nullable().required("Avatar is required."),
  name: yup
    .string()
    .required("Name is required.")
    .max(30, "Name cannot be more than 30 characters."),
  email: yup.string().required("Email address is required.").test({
    message: "Invalid email address",
    test: isValidEmail,
  }),
  phone: yup.string().max(15, "Phone cannot be more than 15 numbers."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^?&*_=+-]).{8,}$/,
      `Password must have at least 8 characters with a mix of letters, number and symbol`
    ),
});

export const signInValidationSchema = yup.object({
  email: yup.string().required("Email address is required.").test({
    message: "Invalid email address",
    test: isValidEmail,
  }),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^?&*_=+-]).{8,}$/,
      `Password must have at least 8 characters with a mix of letters, number and symbol`
    ),
});

export const forgotPasswordValidationSchema = yup.object({
  email: yup.string().required("Email address is required.").test({
    message: "Invalid email address",
    test: isValidEmail,
  }),
});

export const resetPasswordValidationSchema = yup.object({
  newPassword: yup
    .string()
    .required("New password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^?&*_=+-]).{8,}$/,
      `Password must have at least 8 characters with a mix of letters, number and symbol`
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("newPassword")], "Passwords do not match."),
});

export const updateProfileValidationSchema = yup.object({
  avatar: yup.string().nullable().required("Avatar is required."),
  name: yup
    .string()
    .required("Name is required.")
    .max(30, "Name cannot be more than 30 characters."),
  email: yup.string().required("Email address is required.").test({
    message: "Invalid email address",
    test: isValidEmail,
  }),
  phone: yup.string().max(15, "Phone cannot be more than 15 numbers."),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^?&*_=+-]).{8,}$/,
      `Password must have at least 8 characters with a mix of letters, number and symbol`
    ),
  preferences: yup.object().shape({
    isVegan: yup.boolean(),
    isSmoker: yup.boolean(),
    usedWheelChair: yup.boolean(),
    isMinimalist: yup.boolean(),
    isFoodie: yup.boolean(),
    isFitnessEnthusiast: yup.boolean(),
    isWorkaholic: yup.boolean(),
  }),
});

export const additionalInformationValidationSchema = yup.object({
  additionalRequest: yup.string(),
  guestInformation: yup.string(),
});

export const updateReviewValidationSchema = yup.object({
  rating: yup.number().required().min(0).max(5),
  comment: yup.string().trim().required(),
});

export const facilityValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(100, "Name must be at most 100 characters."),
  description: yup.string().trim().required("Description is required."),
});

export const roomValidationSchema = yup.object({
  image: yup.string().nullable().required("Image is required."),
  roomNumber: yup.string().trim().required("Room number is required."),
  name: yup
    .string()
    .trim()
    .required("Name is required.")
    .max(100, "Name must be at most 100 characters."),
  description: yup.string().trim().required("Description is required."),
  category: yup.string().required("Description is required."),
  facilities: yup.array().of(yup.string()).min(1),
  pricePerNight: yup
    .number()
    .required("Price per night is required.")
    .min(0, "Price per night must be greater than 0."),
  promotion: yup.string(),
  guestCapacity: yup
    .number()
    .required("Guest capacity is required.")
    .min(1, "Guest capacity must be greater than 0."),
  bedType: yup.string().required("Description is required."),
});

export const userValidationSchema = yup.object({
  avatar: yup.string().nullable().required("Avatar is required."),
  name: yup
    .string()
    .required("Name is required.")
    .max(30, "Name cannot be more than 30 characters."),
  email: yup.string().required("Email address is required.").trim().test({
    message: "Invalid email address",
    test: isValidEmail,
  }),
  phone: yup.string().max(15, "Phone cannot be more than 15 numbers."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^?&*_=+-]).{8,}$/,
      `Password must have at least 8 characters with a mix of letters, number and symbol`
    ),
  role: yup.string().required("Role is required."),
  preferences: yup.object().shape({
    isVegan: yup.boolean(),
    isSmoker: yup.boolean(),
    usedWheelChair: yup.boolean(),
    isMinimalist: yup.boolean(),
    isFoodie: yup.boolean(),
    isFitnessEnthusiast: yup.boolean(),
    isWorkaholic: yup.boolean(),
  }),
});

export const markAsPaidValidationSchema = yup.object({
  paidWith: yup.string().required("Paid with is required."),
  account: yup.string().when("paidWith", {
    is: paymentProviders.Cash,
    then: (schema) =>
      schema.max(50, "Account cannot be more than 50 characters."),
    otherwise: (schema) =>
      schema
        .required("Account is required.")
        .max(50, "Account cannot be more than 50 characters."),
  }),
});

export const promotionValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Promotion name is required.")
    .max(100, "Promotion name must be at most 100 characters."),
  percentRate: yup
    .number()
    .required("Percent rate is required.")
    .min(1, "Percent rate must be at least 1.")
    .max(100, "Percent rate must be at most 100."),
});
