import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Management",
  description: "A simple app for organizations to manage their stocks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
