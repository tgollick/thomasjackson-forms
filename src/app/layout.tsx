import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import tjLogo from "../../public/tj-logo.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thomas Jackson Forms | Estate Agent Solutions",
  description:
    "Simplify property transactions with Thomas Jackson Forms – a secure platform for capturing buyer offers and tenancy applications, complete with an intuitive dashboard for managing submissions.",
  keywords: [
    "estate agent",
    "buyer offer form",
    "tenancy application",
    "property transactions",
    "submission dashboard",
    "Thomas Jackson",
  ],
  authors: [{ name: "Thomas Jackson Estate Agency" }],
  openGraph: {
    title: "Thomas Jackson Forms",
    description:
      "Simplify property transactions with our secure platform for capturing buyer offers and tenancy applications. Manage all form submissions effortlessly with our intuitive dashboard.",
    url: "https://thomasjacksonforms.com", // update with your actual URL if available
    siteName: "Thomas Jackson Forms",
    images: [
      {
        url: tjLogo.src, // replace with your image URL
        width: 1200,
        height: 630,
        alt: "Thomas Jackson Forms",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Jackson Forms",
    description:
      "Simplify your property transactions with our secure, easy-to-use platform for buyer offers and tenancy applications. Manage your submissions with ease!",
    images: ["https://thomasjacksonforms.com/twitter-image.jpg"], // replace with your image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <ModeToggle />
            {children}
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
