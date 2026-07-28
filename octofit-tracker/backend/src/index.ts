import express, { Request, Response } from 'express';
import './config/database';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
