import express, { Request, Response } from 'express';
import './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find().populate('team', 'name').lean();
  res.status(200).json({ count: users.length, items: users });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  res.status(200).json({ count: teams.length, items: teams });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', 'name').lean();
  res.status(200).json({ count: activities.length, items: activities });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find()
    .populate('entries.user', 'name')
    .lean();
  res.status(200).json({ count: leaderboard.length, items: leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.status(200).json({ count: workouts.length, items: workouts });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
