'use client';

import { useState } from 'react';
import { TrendingUp, Sparkles, Trophy } from 'lucide-react';

export default function MLPredictor() {
  const [totalParticipants, setTotalParticipants] = useState('500');
  const [male, setMale] = useState('250');
  const [female, setFemale] = useState('250');
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
          totalParticipants: parseInt(totalParticipants),
          male: parseInt(male),
          female: parseInt(female),
        }),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Prediction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const parity = ((parseInt(female) / parseInt(totalParticipants)) * 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-effect rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-olympic-gold p-3 rounded-lg">
            <Sparkles className="w-8 h-8 text-olympic-darkBlue" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">ML Medal Predictor</h2>
            <p className="text-blue-200">Random Forest Model — Predict medals by discipline</p>
          </div>
        </div>
        <p className="text-sm text-blue-100">
          Enter discipline characteristics to predict the number of Gold, Silver, and Bronze medals
          using our advanced Random Forest machine learning model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-olympic-blue" />
            Input Features
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Participants
              </label>
              <input
                type="number"
                value={totalParticipants}
                onChange={(e) => setTotalParticipants(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-olympic-blue focus:outline-none transition-colors"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Male Participants
              </label>
              <input
                type="number"
                value={male}
                onChange={(e) => setMale(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-olympic-blue focus:outline-none transition-colors"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Female Participants
              </label>
              <input
                type="number"
                value={female}
                onChange={(e) => setFemale(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-olympic-blue focus:outline-none transition-colors"
                min="0"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-1">Calculated Parity:</p>
              <p className="text-2xl font-bold text-olympic-blue">{parity}%</p>
            </div>

            <button
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-olympic text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Run Prediction
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-olympic-gold" />
            Prediction Results
          </h3>

          {prediction ? (
            <div className="space-y-6">
              {/* Medal Predictions */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl p-6 border-2 border-yellow-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">🥇 Gold Medals</p>
                      <p className="text-4xl font-bold text-yellow-600">{prediction.gold}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-yellow-500 opacity-50" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl p-6 border-2 border-gray-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">🥈 Silver Medals</p>
                      <p className="text-4xl font-bold text-gray-600">{prediction.silver}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-gray-500 opacity-50" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-200 to-orange-100 rounded-xl p-6 border-2 border-orange-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">🥉 Bronze Medals</p>
                      <p className="text-4xl font-bold text-orange-600">{prediction.bronze}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-orange-500 opacity-50" />
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Model Details</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>🤖 Algorithm: Random Forest (100 trees)</p>
                  <p>📊 Total Predicted: {prediction.total} medals</p>
                  <p>🎯 Accuracy: {prediction.accuracy}%</p>
                  <p>📉 Confidence: ±15%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Enter data and run prediction</p>
                <p className="text-sm">Results will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
