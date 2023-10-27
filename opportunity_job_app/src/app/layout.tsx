import "../scss/style.scss";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ENV } from "@/appData/env";

const inter = Inter({ subsets: [ "latin" ] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
    <head>
      <title>{ ENV.TITLE }</title>
    </head>
    <body className={ inter.className }>
    <Header/>
    <main>
      { children }
    </main>
    <Footer/>
    </body>
    </html>
  );
}
