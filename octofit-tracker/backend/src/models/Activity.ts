import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: 0, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const Activity = model('Activity', activitySchema);
