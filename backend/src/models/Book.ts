import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  cover: string;
  rating: number;
  genre: string;
  description: string;
  aiMatch: number;
  trending: boolean;
  popularity: number;
  embedding?: number[];
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: { type: String, required: true },
  rating: { type: Number, default: 0 },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  aiMatch: { type: Number, default: 0 },
  trending: { type: Boolean, default: false },
  popularity: { type: Number, default: 0 },

  // ✅ FIX: Add embedding field here
  embedding: {
    type: [Number],
    required: false,
    default: []
  }
});

export const Book = model<IBook>("Book", bookSchema);
