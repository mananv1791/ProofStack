import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import type { Viewport } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "ProofStack",
    template: "%s | ProofStack",
  },
  description: "Replace resumes with evidence-backed proof of work dossiers.",
  openGraph: {
    title: "ProofStack",
    description: "The resume is dead. Hire on proof of work.",
    siteName: "ProofStack",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <TooltipProvider>
          <AppProviders>{children}</AppProviders>
        </TooltipProvider>
      </body>
    </html>
  );
}
