import { Noto_Sans } from "next/font/google";
import "./globals.scss";

const NotoSans = Noto_Sans({
  variable: "--font-Noto-Sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Voodoo Doll's Queue Template",
  description:
    "An easy way to create a Killing Floor 2 queue skeleton for Tamari servers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${NotoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
