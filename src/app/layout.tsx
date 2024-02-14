import type { Metadata } from "next";
import "../global.css";
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "../lib/utils"
import Navbar from "@/components/Navbar";
import RecoilContextProvider from "@/store/atoms";
import { Toaster } from "@/components/ui/toaster";
import { Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Todo App",
  description: "This is a full stack Todo App made using nextjs",
  icons: {
    icon: ['./favicon.ico'
    ]
  }
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <RecoilContextProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
        <footer className="fixed bottom-0 w-full bg-slate-100 py-3 hidden md:block">
        <div className="flex flex-col justify-center items-center">  
        <p>&copy; All Rights Reserved</p>
        <p className="flex">
              Developed by <Crown size={20} color="	#f97316" strokeWidth={1.5} />{" "}
              <a
                href="https://github.com/MuminBashir"
                target="_blank"
                className="hover:text-[#f97316]"
              >
                Mumin Bashir
              </a>
            </p>
            </div>
        </footer>
        <Toaster/>
      </body>
      </RecoilContextProvider>
    </html>
  );
}
