import { Request, Response } from 'express';
import { getRecommendation, saveToDatabase } from '../services/recommendation.service';
import { UserProfile } from '../types';

export const createRecommendation = async (req: Request, res: Response) => {
  const { age, income, dependents, riskTolerance } = req.body;

 //Validation for security
  if (
    typeof age !== 'number' ||
    typeof income !== 'number' ||
    typeof dependents !== 'number' ||
    !['Low', 'Medium', 'High'].includes(riskTolerance)
  ) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const userProfile: UserProfile = { age, income, dependents, riskTolerance };

  try {
    const recommendation = getRecommendation(userProfile);
    await saveToDatabase(userProfile, recommendation);
    res.status(200).json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};