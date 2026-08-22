 import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BackgroundAnimation } from "@/components/background-animation";
import { Header } from "@/components/header";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = {
  title: "Mahamudul Hasan — Shopify Specialist",
  description:
    "Mahamudul Hasan — Shopify Specialist and Creative Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${space.variable} bg-[#050505] text-white antialiased`}
      >

          <Header />
        <BackgroundAnimation />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}