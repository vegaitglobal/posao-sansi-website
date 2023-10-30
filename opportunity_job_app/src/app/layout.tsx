import "../scss/style.scss";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ENV } from "@/data/env";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
    <head>
      <title>{ ENV.title }</title>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico"/>
    </head>
    <body>
    <Header/>
    <main>
      { children }
    </main>
    <Footer env={ ENV }/>
    </body>
    </html>
  );
}
