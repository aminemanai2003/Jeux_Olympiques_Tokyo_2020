'use client';

import { useState } from 'react';
import { TrendingUp, Sparkles, Trophy, DollarSign, Users, Target } from 'lucide-react';

export default function MLPredictor() {
  const [country, setCountry] = useState('France');
  const [totalParticipants, setTotalParticipants] = useState('378');
  const [male, setMale] = useState('189');
  const [female, setFemale] = useState('189');
  const [gdpPerCapita, setGdpPerCapita] = useState('40');
  const [previousMedals, setPreviousMedals] = useState('42');
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          totalParticipants: parseInt(totalParticipants),
          male: parseInt(male),
          female: parseInt(female),
          gdpPerCapita: parseFloat(gdpPerCapita),
          previousMedals: parseInt(previousMedals),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Erreur de prédiction');
      }
      setPrediction(data);
    } catch (error: any) {
      console.error('Échec prédiction:', error);
      alert(`Échec de la prédiction: ${error.message || 'Veuillez réessayer.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const parity = totalParticipants ? ((parseInt(female) / parseInt(totalParticipants)) * 100).toFixed(1) : '50.0';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-effect rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-olympic-gold p-3 rounded-lg">
            <Sparkles className="w-8 h-8 text-olympic-darkBlue" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Prédicteur de Médailles ML</h2>
            <p className="text-blue-200 dark:text-gray-300">Régression Linéaire Multiple — Prédire les médailles par pays</p>
          </div>
        </div>
        <p className="text-sm text-blue-100 dark:text-gray-300">
          Entrez les caractéristiques d'un pays pour prédire le nombre de médailles d'Or, d'Argent et de Bronze
          en utilisant notre modèle de régression linéaire multiple basé sur des données historiques réelles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-olympic-blue" />
            Caractéristiques d'Entrée
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Pays
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ex: France, USA, Japon..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nombre d'Athlètes Totaux
              </label>
              <input
                type="number"
                value={totalParticipants}
                onChange={(e) => setTotalParticipants(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
                min="1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  👨 Athlètes Hommes
                </label>
                <input
                  type="number"
                  value={male}
                  onChange={(e) => setMale(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  👩 Athlètes Femmes
                </label>
                <input
                  type="number"
                  value={female}
                  onChange={(e) => setFemale(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                PIB par Habitant (milliers $)
              </label>
              <input
                type="number"
                value={gdpPerCapita}
                onChange={(e) => setGdpPerCapita(e.target.value)}
                placeholder="Ex: 40 pour 40,000$"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Médailles aux JO Précédents
              </label>
              <input
                type="number"
                value={previousMedals}
                onChange={(e) => setPreviousMedals(e.target.value)}
                placeholder="Ex: 42"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-olympic-blue dark:focus:border-olympic-gold focus:outline-none transition-colors"
                min="0"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">⚖️ Parité Calculée :</p>
              <p className="text-2xl font-bold text-olympic-blue dark:text-olympic-gold">{parity}%</p>
            </div>

            <button
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-olympic dark:from-olympic-gold dark:to-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Prédiction en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Lancer la Prédiction
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-olympic-gold" />
            Résultats de Prédiction
          </h3>

          {prediction ? (
            <div className="space-y-6">
              {/* Medal Predictions */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-xl p-6 border-2 border-yellow-400 dark:border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">🥇 Médailles d'Or</p>
                      <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{prediction.predictions?.gold || 0}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-yellow-500 dark:text-yellow-400 opacity-50" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/30 rounded-xl p-6 border-2 border-gray-400 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">🥈 Médailles d'Argent</p>
                      <p className="text-4xl font-bold text-gray-600 dark:text-gray-300">{prediction.predictions?.silver || 0}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-gray-500 dark:text-gray-400 opacity-50" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-200 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl p-6 border-2 border-orange-400 dark:border-orange-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">🥉 Médailles de Bronze</p>
                      <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{prediction.predictions?.bronze || 0}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-orange-500 dark:text-orange-400 opacity-50" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-400 dark:border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">🏆 Total Médailles</p>
                      <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{prediction.predictions?.total || 0}</p>
                    </div>
                    <Target className="w-12 h-12 text-blue-500 dark:text-blue-400 opacity-50" />
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">📊 Détails du Modèle</p>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <p>🤖 Algorithme : {prediction.model?.type || 'N/A'}</p>
                  <p>📈 Méthode : {prediction.model?.algorithm || 'N/A'}</p>
                  <p>🎯 Précision : {prediction.model?.accuracy || 'N/A'}</p>
                  <p>✅ Confiance : {prediction.model?.confidence || 'N/A'}</p>
                  <p>📉 R² Score : {prediction.model?.r2Score || 'N/A'}</p>
                </div>
              </div>

              {/* Analysis */}
              {prediction.analysis && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-700">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">💡 Analyse</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{prediction.analysis}</p>
                </div>
              )}

              {/* Factors */}
              {prediction.factors && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">⚙️ Facteurs Appliqués</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>💰 Économique : {prediction.factors.economicFactor}</p>
                    <p>📊 Historique : {prediction.factors.historyFactor}</p>
                    <p>⚖️ Parité : {prediction.factors.parityFactor}</p>
                    <p>👥 Parité H/F : {prediction.factors.parity}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center text-gray-400 dark:text-gray-500">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Entrez les données et lancez la prédiction</p>
                <p className="text-sm">Les résultats apparaîtront ici</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
