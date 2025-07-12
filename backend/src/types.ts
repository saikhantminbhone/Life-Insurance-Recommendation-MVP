export interface UserProfile {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'Low' | 'Medium' | 'High';
}

export interface Recommendation {
  recommendation: string;
  explanation: string;
}