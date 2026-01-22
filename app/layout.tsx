import AuthGuard from "@/providers/AuthGaurd";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suhaas",
  description: "Project Management",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <ReduxProvider>
          <NextAuthProvider>
            <ThemeProvider>
              <AuthGuard>{children}</AuthGuard>
              <ToastContainer />
            </ThemeProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
