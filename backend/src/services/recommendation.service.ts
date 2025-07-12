import { UserProfile, Recommendation } from '../types';
import { query } from '../config/db';

export const getRecommendation = (profile: UserProfile): Recommendation => {
  const { age, income, dependents, riskTolerance } = profile;

  let recommendation: string;
  let explanation: string;
  let coverage = Math.min(income * 10, 2000000); 
  let term = 20; 

 if (age > 65) {
    recommendation = "Final Expense Insurance";
    explanation = "Since you're over 65, a final expense policy can help take care of things like funeral costs, so your loved ones won’t have to worry about those expenses.";
    } else if (dependents === 0 && riskTolerance === 'Low') {
    recommendation = `Term Life – $${(coverage / 2).toLocaleString()} for ${term / 2} years`;
    explanation = "You don't have dependents and prefer to play it safe, so a smaller, shorter-term policy gives you basic peace of mind without going overboard.";
    } else if (age < 40 && dependents > 0) {
    recommendation = `Term Life – $${coverage.toLocaleString()} for ${term} years`;
    explanation = "You're still young and supporting a family, so this coverage helps protect their future if something ever happens to you.";
    } else if (riskTolerance === 'High' && income > 150000) {
    recommendation = `Whole Life – $${(coverage / 1.5).toLocaleString()}`;
    explanation = "With your income and comfort with risk, a whole life policy gives you lifelong protection and builds cash value over time—like an extra layer of financial planning.";
    } else {
    recommendation = `Term Life – $${coverage.toLocaleString()} for ${term} years`;
    explanation = "A term policy is a solid, affordable option. It covers you during the years when your financial responsibilities are highest.";
    }

  return { recommendation, explanation };
};

export const saveToDatabase = async (profile: UserProfile, recommendation: Recommendation): Promise<void> => {
    const { age, income, dependents, riskTolerance } = profile;
    const { recommendation: recText, explanation } = recommendation;
    //prevent sql injection with parameterized queries
    const queryString = `
        INSERT INTO insurancedb(age, income, dependents, risk_tolerance, recommendation, explanation)
        VALUES($1, $2, $3, $4, $5, $6)
    `;
    const values = [age, income, dependents, riskTolerance, recText, explanation];
    
    try {
        await query(queryString, values);
    } catch (err) {
        console.error('Database insertion error:', err);
        throw err;
    }
};