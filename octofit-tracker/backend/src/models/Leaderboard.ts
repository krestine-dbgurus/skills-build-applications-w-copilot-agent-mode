import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const Leaderboard = model('Leaderboard', leaderboardSchema);
