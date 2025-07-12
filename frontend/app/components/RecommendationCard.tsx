interface CardProps {
  recommendation: {
    recommendation: string;
    explanation: string;
  };
  onReset: () => void;
}

export default function RecommendationCard({ recommendation, onReset }: CardProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-slate-800">Your Personalized Recommendation</h2>
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-6 rounded-md my-6">
        <p className="text-3xl font-bold">{recommendation.recommendation}</p>
      </div>
      <p className="text-slate-600 text-left mb-6">{recommendation.explanation}</p>
      <button onClick={onReset} className="w-full bg-slate-600 text-white p-3 rounded-md hover:bg-slate-700">
        Start Over
      </button>
    </div>
  );
}