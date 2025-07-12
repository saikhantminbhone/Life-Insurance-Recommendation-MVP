CREATE TABLE insurancedb (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL,
    income NUMERIC NOT NULL,
    dependents INTEGER NOT NULL,
    risk_tolerance VARCHAR(50) NOT NULL,
    recommendation TEXT,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);