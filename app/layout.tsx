import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import dynamic from 'next/dynamic';

const ChatbotInjector = dynamic(() => import('@/components/ChatbotInjector'), { ssr: false });

export const metadata: Metadata = {
  title: "Tableau de Bord Jeux Olympiques Tokyo 2020 | Intelligence d'Affaires",
  description: "Tableau de bord analytique complet pour les Jeux Olympiques de Tokyo 2020 avec prédictions ML, rapports interactifs et analyses de données avancées.",
  keywords: ["Jeux Olympiques", "Tokyo 2020", "Analytique", "Power BI", "Machine Learning", "Données Sportives"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
        <ThemeProvider>
          <ChatbotInjector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
