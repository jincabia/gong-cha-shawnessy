import { Inter } from "next/font/google";
import "./globals.css";
import GongNav from "./components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gong Cha Shawnessy",
  description: "Gong Cha Shawnessy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} min-h-screen flex flex-col`}>
      <GongNav />


        <div className="flex-grow">{children}</div>
        
      </body>
    </html>
  );
}
