"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm({
   clientSecret,
}: {
   clientSecret: string;
}) {
   const stripe = useStripe();
   const elements = useElements();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: elements.getElement(CardElement)!,
            },
         }
      );

      if (error) {
         console.error(error.message);
         toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent) {
         if (paymentIntent.status === "succeeded") {
            toast.success("✅ Payment successful! Your appointment is booked.");
         } else {
            toast.error(`⚠️ Payment status: ${paymentIntent.status}`);
         }
      }

      setLoading(false);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-5 border border-gray-200"
      >
         <h2 className="text-xl font-semibold text-gray-800 text-center">
            Complete Your Payment
         </h2>

         {/* Card Input */}
         <div className="p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#374151", // gray-700
                        "::placeholder": { color: "#9CA3AF" }, // gray-400
                     },
                     invalid: { color: "#EF4444" }, // red-500
                  },
               }}
            />
         </div>

         {/* Pay Button */}
         <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-primary-foreground font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {loading ? "Processing..." : "Pay Now"}
         </button>

         <p className="text-xs text-gray-500 text-center">
            Your payment is secure and encrypted 🔒
         </p>
      </form>
   );
}
