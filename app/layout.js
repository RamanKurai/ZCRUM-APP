import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter }  from "next/font/google"
import Header from "@/components/header";

const inter = Inter({ subsets : ["latin"]})
export const metadata = {
  title: "ZCRUM",
  description: "Project Management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} animated-dotted-background`}>
      <ThemeProvider attribute="class" defaultTheme="dark">
      <Header/>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made with 💗 by Raman Kurai</p>
          </div>
        </footer>
      </ThemeProvider>
    </body>
  </html>
  );
}
