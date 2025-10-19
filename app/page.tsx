'use client';

import { useState } from 'react';
import PowerBIEmbed from '@/components/PowerBIEmbed';
import MLPredictor from '@/components/MLPredictor';
import ExportButtons from '@/components/ExportButtons';
import { Trophy, TrendingUp, Mail, FileDown, Sparkles } from 'lucide-react';

export default function Home() {
  const [showML, setShowML] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-olympic shadow-2xl border-b-4 border-olympic-gold">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <Trophy className="w-10 h-10 text-olympic-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                  🏅 Tokyo 2020 Olympics
                  <Sparkles className="w-6 h-6 text-olympic-gold animate-pulse" />
                </h1>
                <p className="text-blue-200 text-sm md:text-base">
                  Business Intelligence Dashboard — Powered by Power BI & ML
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-olympic-blue rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-olympic-gold rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
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
                ? 'bg-white text-olympic-blue scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Power BI Dashboard
          </button>
          <button
            onClick={() => setShowML(true)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              showML
                ? 'bg-olympic-gold text-olympic-darkBlue scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            ML Predictions
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
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white/50">
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
                    <p className="text-sm opacity-80">Total Countries</p>
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
                    <p className="text-sm opacity-80">Total Athletes</p>
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
                    <p className="text-sm opacity-80">Disciplines</p>
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
      <footer className="bg-olympic-darkBlue text-white py-6 mt-12 border-t-4 border-olympic-gold">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2024 Tokyo 2020 Olympics Dashboard | Created by Amine Manai
          </p>
          <p className="text-xs opacity-60 mt-2">
            Powered by Power BI, Next.js, TensorFlow.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
