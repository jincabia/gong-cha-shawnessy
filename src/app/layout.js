import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import GongNav from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Menu from "./menu/page";

const poppins = Poppins({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
});

export const metadata = {
  title: "Gong Cha Shawnessy",
  description: "Gong Cha Shawnessy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <GongNav />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
