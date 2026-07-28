import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const Workout = model('Workout', workoutSchema);
