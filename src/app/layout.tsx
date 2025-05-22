import { Inter } from "next/font/google";
import { QuizProvider } from "@/context/QuizContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Astrosoul",
  description: "Discover your moon-powered aesthetic identity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="
          relative
          bg-gradient-to-br 
            from-[#030304] 
            via-[#090909] 
            to-[#0a0a08]
          text-white
          min-h-screen
          overflow-x-hidden
        "
      >
        <QuizProvider>
          <Navbar />
          <main className="">{children}</main>
        </QuizProvider>
      </body>
    </html>
  );
}
