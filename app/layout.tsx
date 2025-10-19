import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokyo 2020 Olympics Dashboard | Business Intelligence",
  description: "Comprehensive analytics dashboard for Tokyo 2020 Olympic Games with ML predictions, interactive reports, and advanced data insights.",
  keywords: ["Olympics", "Tokyo 2020", "Analytics", "Power BI", "Machine Learning", "Sports Data"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {children}
      </body>
    </html>
  );
}
