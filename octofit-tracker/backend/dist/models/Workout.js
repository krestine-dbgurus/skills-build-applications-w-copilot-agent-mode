"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
