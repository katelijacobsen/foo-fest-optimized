import PopupContainer from "@/components/global/popupFolder/Container";
import Header from "@/components/global/Header";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FooFest | Festival",
  description: "Foo Festival - Oplev en unik vikingefestival fyldt med live musik fra spændende bands, autentiske oplevelser og festlig stemning. Book dine billetter nu og træd tilbage til vikingetiden med venner og familie.",
  authors: [{ name: "The Foo Fighters" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  generator: "Next.js",
  applicationName: "Foo Festival",
  copyright: "© 2025 Foo Festival. Alle rettigheder forbeholdes.",
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
