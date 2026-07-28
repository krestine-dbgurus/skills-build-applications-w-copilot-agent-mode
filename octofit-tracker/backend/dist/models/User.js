"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, default: 0, min: 0 },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
