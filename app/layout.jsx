import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import NavbarDinamic from "@/components/custom/client-component/navbar-programatic";
import FooterDinamic from "@/components/custom/client-component/footer-dynamic";
import { Toaster } from "react-hot-toast";
import ProgressBarClient from "@/context/ProgresBarProvider";
import { Suspense } from "react";
import Script from "next/script";

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
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${lora.variable} ${geistMono.variable} antialiased bg-app-bg text-app-ink`}
      >
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`}
      </Script>
      <NavbarDinamic />
    <Suspense fallback={null}>
      <ProgressBarClient />
    </Suspense>
          {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "var(--app-surface)",
            color: "var(--app-ink)",
            border: "1px solid var(--app-line)",
            boxShadow: "0 8px 24px rgba(28, 20, 32, 0.12)",
          },
        }}
      />
      <FooterDinamic />
      {/* Tambahkan di bawah sini */}
      </body>
    </html>
  );
}
