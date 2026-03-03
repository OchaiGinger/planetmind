import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "PlanetMind | Earth's Largest Environmental Intelligence Database",
  description:
    "Earn B3TR tokens by reporting environmental observations and protecting the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Source+Code+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-mint selection:text-navy bg-navy min-h-screen">
        <PageLoader />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
