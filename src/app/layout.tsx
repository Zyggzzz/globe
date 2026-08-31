import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
