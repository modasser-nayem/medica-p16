import Link from "next/link";

export default function PaymentCancelPage() {
   return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-red-50">
         <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
               Payment Cancelled ❌
            </h1>
            <p className="mb-4 text-gray-700">
               Your payment was not completed. You can retry at any time.
            </p>

            <Link
               href="/doctors"
               className="mt-6 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
               Back to Appointments
            </Link>
         </div>
      </main>
   );
}
