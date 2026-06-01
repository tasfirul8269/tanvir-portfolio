import type { Metadata, Viewport } from "next";
import { Poppins, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Tanvir Almas | Full Stack Web Developer & Founder",
    template: "%s | Tanvir Almas",
  },
  description: "Full Stack Web Developer, Founder of Frooxi. Specialized in Next.js, TypeScript, and modern web architectures.",
  keywords: ["Tanvir Almas", "Full Stack Developer", "Frooxi", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Tanvir Almas" }],
  creator: "Tanvir Almas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanviralmas.me",
    title: "Tanvir Almas | Full Stack Web Developer & Founder",
    description: "Full Stack Web Developer, Founder of Frooxi. Specialized in Next.js, TypeScript, and modern web architectures.",
    siteName: "Tanvir Almas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Almas | Full Stack Web Developer & Founder",
    description: "Full Stack Web Developer, Founder of Frooxi. Specialized in Next.js, TypeScript, and modern web architectures.",
    creator: "@tanviralmas", // Replace with actual twitter handle
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-[#F5F2ED] text-black antialiased selection:bg-black selection:text-white dark:bg-black dark:text-white dark:selection:bg-white dark:selection:text-black",
          poppins.variable,
          robotoSerif.variable
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
