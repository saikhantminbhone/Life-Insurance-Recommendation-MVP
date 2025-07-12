'use client';

import { useState } from 'react';
import RecommendationForm from './components/RecommendationForm';
import RecommendationCard from './components/RecommendationCard';

export default function Home() {
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Life Insurance Advisor
          </h1>
          <p className="text-slate-600 mt-2">
            Answer a few simple questions to get a personalized recommendation.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {!recommendation ? (
            <RecommendationForm
              setRecommendation={setRecommendation}
              setIsLoading={setIsLoading}
              setError={setError}
              isLoading={isLoading}
            />
          ) : (
            <RecommendationCard
              recommendation={recommendation}
              onReset={() => setRecommendation(null)}
            />
          )}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </main>
  );
}