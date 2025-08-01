import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  weight: "500",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${lora.variable} ${geistMono.variable} antialiased bg-[#110e12]`}
      >
      <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
