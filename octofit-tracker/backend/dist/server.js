"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User_1.User.find().populate('team', 'name').lean();
    res.status(200).json({ count: users.length, items: users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team_1.Team.find().populate('members', 'name email').lean();
    res.status(200).json({ count: teams.length, items: teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().populate('user', 'name').lean();
    res.status(200).json({ count: activities.length, items: activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.Leaderboard.find()
        .populate('entries.user', 'name')
        .lean();
    res.status(200).json({ count: leaderboard.length, items: leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find().lean();
    res.status(200).json({ count: workouts.length, items: workouts });
});
app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
