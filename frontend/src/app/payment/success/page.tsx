"use client";

import Loading from "@/components/ui/loading";
import { paymentApi } from "@/redux/api/payment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
   const searchParams = useSearchParams();
   const sessionId = searchParams.get("session_id");

   //    const [triggerSuccessHandler, { data, isLoading, isError, error }] =
   //       paymentApi.useSuccessPaymentHandlerMutation();

   //    const [localError, setLocalError] = useState<string | null>(null);

   //    useEffect(() => {
   //       if (!sessionId) {
   //          setLocalError("No session ID provided.");
   //          return;
   //       }

   //       // call the mutation
   //       triggerSuccessHandler(sessionId)
   //          .unwrap()
   //          .catch((err) => {
   //             // unwrap gives a rejected promise on API error
   //             setLocalError(
   //                typeof err === "string"
   //                   ? err
   //                   : (err as { data?: { message?: string } })?.data?.message ??
   //                        "Payment verification failed."
   //             );
   //          });
   //    }, [sessionId, triggerSuccessHandler]);

   //    if (!sessionId) {
   //       return (
   //          <div className="p-8 text-center text-red-600">
   //             No session ID provided.
   //          </div>
   //       );
   //    }

   //    if (isLoading) {
   //       return <Loading title="Verifying your payment…" />;
   //    }

   //    if (localError || isError) {
   //       const apiError =
   //          localError ||
   //          (error as { data?: { message?: string } })?.data?.message ||
   //          "Something went wrong.";
   //       return <div className="p-8 text-center text-red-600">{apiError}</div>;
   //    }

   const response = { amount: 500, currency: "USD" }; //data?.data ;

   return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-green-50">
         <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
               Payment Successful 🎉
            </h1>
            <p className="mb-2">Thank you for your payment!</p>
            <p className="mb-4 text-gray-600">Session ID: {sessionId}</p>

            {response && (
               <div className="text-sm text-gray-700">
                  <p>
                     Amount Paid: {response.amount}{" "}
                     {response.currency.toUpperCase()}
                  </p>
               </div>
            )}

            <Link
               href="/dashboard"
               className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
               Go to Dashboard
            </Link>
         </div>
      </main>
   );
}
