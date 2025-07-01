import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";

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
            <MainLayout>{children}</MainLayout>
         </body>
      </html>
   );
}
