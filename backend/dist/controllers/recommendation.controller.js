"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecommendation = void 0;
const recommendation_service_1 = require("../services/recommendation.service");
const createRecommendation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, income, dependents, riskTolerance } = req.body;
    //Validation for security
    if (typeof age !== 'number' ||
        typeof income !== 'number' ||
        typeof dependents !== 'number' ||
        !['Low', 'Medium', 'High'].includes(riskTolerance)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const userProfile = { age, income, dependents, riskTolerance };
    try {
        const recommendation = (0, recommendation_service_1.getRecommendation)(userProfile);
        yield (0, recommendation_service_1.saveToDatabase)(userProfile, recommendation);
        res.status(200).json(recommendation);
    }
    catch (error) {
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});
exports.createRecommendation = createRecommendation;
