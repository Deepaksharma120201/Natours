import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API using fetch
    const res = await fetch(
      `/api/v1/booking/checkout-session/${tourId}`,
      {
        credentials: "include",
      }
    );
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const data = await res.json();

    if (!res.ok)
      throw new Error(data.message || "Failed to get checkout session");

    // 2) Redirect to Stripe checkout
    await stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
  } catch {
    toast.error("Please try again! Something went wrong!");
  }
};
