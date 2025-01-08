import PopupContainer from "@/components/global/popupFolder/Container";
import Header from "@/components/global/Header";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FooFest | Festival",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-background  ${inter.className} ${inter.className} antialiased `}>
        <Header />
        <PopupContainer />
        {children}
      </body>
    </html>
  );
}
