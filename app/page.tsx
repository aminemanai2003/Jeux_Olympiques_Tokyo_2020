'use client';

import { useState } from 'react';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import MLPredictor from '@/components/MLPredictor';
import ExportButtons from '@/components/ExportButtons';
import ThemeToggle from '@/components/ThemeToggle';
import { Trophy, TrendingUp, Sparkles } from 'lucide-react';

export default function Home() {
  const [showML, setShowML] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-olympic shadow-2xl border-b-4 border-olympic-gold dark:border-olympic-gold/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <Trophy className="w-10 h-10 text-olympic-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                  🏅 Jeux Olympiques Tokyo 2020
                  <Sparkles className="w-6 h-6 text-olympic-gold animate-pulse" />
                </h1>
                <p className="text-blue-200 dark:text-gray-300 text-sm md:text-base">
                  Tableau de Bord Intelligence d'Affaires — Power BI & Machine Learning
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-olympic-blue rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-olympic-gold rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-black dark:bg-white rounded-full"></div>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Pills */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setShowML(false)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              !showML
                ? 'bg-white dark:bg-gray-700 text-olympic-blue dark:text-olympic-gold scale-105'
                : 'bg-white/20 dark:bg-gray-800/50 text-white hover:bg-white/30 dark:hover:bg-gray-700/50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Tableau de Bord Power BI
          </button>
          <button
            onClick={() => setShowML(true)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              showML
                ? 'bg-olympic-gold dark:bg-olympic-gold/90 text-olympic-darkBlue dark:text-gray-900 scale-105'
                : 'bg-white/20 dark:bg-gray-800/50 text-white hover:bg-white/30 dark:hover:bg-gray-700/50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Prédictions ML
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {!showML ? (
          <div className="space-y-4">
            {/* Export Buttons */}
            <ExportButtons />
            
            {/* Power BI Embed */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/50 dark:border-gray-700/50">
              <PowerBIEmbed />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-olympic-gold p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-olympic-darkBlue" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Pays Participants</p>
                    <p className="text-3xl font-bold">206</p>
                  </div>
                </div>
              </div>
              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-olympic-silver p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-olympic-darkBlue" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Total Athlètes</p>
                    <p className="text-3xl font-bold">11,326</p>
                  </div>
                </div>
              </div>
              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-olympic-bronze p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Disciplines Sportives</p>
                    <p className="text-3xl font-bold">50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MLPredictor />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-olympic-darkBlue dark:bg-gray-900 text-white py-6 mt-12 border-t-4 border-olympic-gold dark:border-olympic-gold/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2024 Tableau de Bord Jeux Olympiques Tokyo 2020 | Créé par Alfari9
          </p>
          <p className="text-xs opacity-60 mt-2">
            Propulsé par Power BI, Next.js, Régression Linéaire Multiple & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
