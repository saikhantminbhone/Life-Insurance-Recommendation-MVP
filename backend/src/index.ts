import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import apiRoutes from './routes';
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes and i put /api so when version chnages we can simply add version without affecting the whole code
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});