import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const worksans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className={`${worksans.className} max-sm:text-[10px] max-xl:text-[14px] text-[18px]`}
      >
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
