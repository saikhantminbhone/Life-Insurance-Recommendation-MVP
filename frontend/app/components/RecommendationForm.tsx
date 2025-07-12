import { FormEvent, useState } from 'react';

interface FormProps {
    setRecommendation: (data: any) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    isLoading: boolean;
}

export default function RecommendationForm({ setRecommendation, setIsLoading, setError, isLoading }: FormProps) {
    //default
    const [formData, setFormData] = useState({
        age: '35',
        income: '80000',
        dependents: '2',
        riskTolerance: 'Medium',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    age: parseInt(formData.age),
                    income: parseInt(formData.income),
                    dependents: parseInt(formData.dependents),
                    riskTolerance: formData.riskTolerance,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get recommendation.');
            }

            const data = await response.json();
            setRecommendation(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputStyle = "w-full p-2 border border-slate-300 rounded-md mt-1";
    const labelStyle = "block text-sm font-medium text-slate-700";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="age" className={labelStyle}>Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="income" className={labelStyle}>Annual Income ($)</label>
                <input type="number" id="income" name="income" value={formData.income} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="dependents" className={labelStyle}>Number of Dependents</label>
                <input type="number" id="dependents" name="dependents" value={formData.dependents} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="riskTolerance" className={labelStyle}>Risk Tolerance</label>
                <select id="riskTolerance" name="riskTolerance" value={formData.riskTolerance} onChange={handleChange} className={inputStyle}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-slate-400">
                {isLoading ? 'Calculating...' : 'Get Recommendation'}
            </button>
        </form>
    );
}