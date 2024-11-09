import { loadStripe } from "@stripe/stripe-js";

export const getStripe = async () => {
  return await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
};
