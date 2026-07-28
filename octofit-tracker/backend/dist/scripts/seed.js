"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            Leaderboard_1.Leaderboard.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            Team_1.Team.deleteMany({}),
            User_1.User.deleteMany({}),
            Workout_1.Workout.deleteMany({}),
        ]);
        const workouts = await Workout_1.Workout.insertMany([
            {
                title: 'City Sprint Intervals',
                focusArea: 'Cardio',
                difficulty: 'intermediate',
                durationMinutes: 30,
                equipment: ['Running Shoes', 'Watch'],
                description: 'Alternating sprint and jog intervals to improve endurance and speed.',
            },
            {
                title: 'Core Stability Circuit',
                focusArea: 'Core',
                difficulty: 'beginner',
                durationMinutes: 20,
                equipment: ['Yoga Mat'],
                description: 'A low-impact circuit of planks and mobility drills for core control.',
            },
            {
                title: 'Power Lift Ladder',
                focusArea: 'Strength',
                difficulty: 'advanced',
                durationMinutes: 45,
                equipment: ['Barbell', 'Kettlebell'],
                description: 'Progressive strength sets focused on compound movement patterns.',
            },
        ]);
        const users = await User_1.User.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@octofit.test',
                fitnessLevel: 'advanced',
                points: 920,
            },
            {
                name: 'Jordan Patel',
                email: 'jordan.patel@octofit.test',
                fitnessLevel: 'intermediate',
                points: 760,
            },
            {
                name: 'Alex Rivera',
                email: 'alex.rivera@octofit.test',
                fitnessLevel: 'beginner',
                points: 490,
            },
            {
                name: 'Sam Okafor',
                email: 'sam.okafor@octofit.test',
                fitnessLevel: 'intermediate',
                points: 700,
            },
        ]);
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Summit Sprinters',
                city: 'Seattle',
                motto: 'Climb stronger every day.',
                members: [users[0]._id, users[1]._id],
                totalPoints: users[0].points + users[1].points,
            },
            {
                name: 'Metro Lifters',
                city: 'Austin',
                motto: 'Lift smart, finish proud.',
                members: [users[2]._id, users[3]._id],
                totalPoints: users[2].points + users[3].points,
            },
        ]);
        await Promise.all([
            User_1.User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id }),
            User_1.User.findByIdAndUpdate(users[1]._id, { team: teams[0]._id }),
            User_1.User.findByIdAndUpdate(users[2]._id, { team: teams[1]._id }),
            User_1.User.findByIdAndUpdate(users[3]._id, { team: teams[1]._id }),
        ]);
        await Activity_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Morning Run',
                durationMinutes: 42,
                distanceKm: 8.4,
                caloriesBurned: 520,
            },
            {
                user: users[1]._id,
                type: 'HIIT Session',
                durationMinutes: 28,
                distanceKm: 0,
                caloriesBurned: 410,
            },
            {
                user: users[2]._id,
                type: 'Cycling Commute',
                durationMinutes: 35,
                distanceKm: 11.2,
                caloriesBurned: 370,
            },
            {
                user: users[3]._id,
                type: 'Strength Circuit',
                durationMinutes: 50,
                distanceKm: 0,
                caloriesBurned: 460,
            },
        ]);
        await Leaderboard_1.Leaderboard.create({
            period: '2026-W30',
            entries: [
                { user: users[0]._id, score: users[0].points, rank: 1 },
                { user: users[1]._id, score: users[1].points, rank: 2 },
                { user: users[3]._id, score: users[3].points, rank: 3 },
                { user: users[2]._id, score: users[2].points, rank: 4 },
            ],
            generatedAt: new Date(),
        });
        console.log(`Seed complete: ${users.length} users, ${teams.length} teams, 4 activities, 1 leaderboard, ${workouts.length} workouts`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
