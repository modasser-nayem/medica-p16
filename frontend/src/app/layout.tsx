import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/provider/Providers";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-inter",
});

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
   variable: "--font-poppins",
});

export const metadata: Metadata = {
   title: "Medica - Hospital Management System",
   description:
      "Comprehensive Hospital Management System for patients, doctors, and administrators",
   keywords:
      "hospital, healthcare, appointments, consultations, medical records",
   authors: [{ name: "Medica HMS Team" }],
   viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         className={`${inter.variable} ${poppins.variable}`}
      >
         <body className={`${inter.className} antialiased font-sans`}>
            <Providers>
               <main>{children}</main>
               <Toaster
                  position="top-right"
                  toastOptions={{
                     duration: 4000,
                     style: {
                        background: "#363636",
                        color: "#fff",
                     },
                     success: {
                        duration: 3000,
                        iconTheme: {
                           primary: "#10B981",
                           secondary: "#fff",
                        },
                     },
                     error: {
                        duration: 5000,
                        iconTheme: {
                           primary: "#EF4444",
                           secondary: "#fff",
                        },
                     },
                  }}
               />
            </Providers>
         </body>
      </html>
   );
}
