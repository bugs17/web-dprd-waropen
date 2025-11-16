import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import NavbarDinamic from "@/components/custom/client-component/navbar-programatic";
import FooterDinamic from "@/components/custom/client-component/footer-dynamic";
import { Toaster } from "react-hot-toast";
import ProgressBarClient from "@/context/ProgresBarProvider";

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
  title: "DPRK-WAROPEN",
  description: "WEBSITE RESMI DPRK WAROPEN",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${lora.variable} ${geistMono.variable} antialiased bg-[#110e12]`}
      >
      <NavbarDinamic />

      <ProgressBarClient />
          {children}
      <Toaster position="top-center" />
      <FooterDinamic />
      {/* Tambahkan di bawah sini */}
      </body>
    </html>
  );
}
