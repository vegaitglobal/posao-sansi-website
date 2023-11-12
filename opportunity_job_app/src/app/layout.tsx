import "./layout.scss";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ENV } from "@/data/env";
import Head from "@/components/Head/Head";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
    <Head title={ ENV.title }/>
    <body>
    <Header/>
    <main className="main">
      { children }
    </main>
    <Footer env={ ENV }/>
    </body>
    </html>
  );
}
