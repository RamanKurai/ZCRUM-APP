import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter }  from "next/font/google"

const inter = Inter({ subsets : ["latin"]})
export const metadata = {
  title: "ZCRUM",
  description: "Project Management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class" default="dark">
          {/* header */}
          {/* main */}
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
