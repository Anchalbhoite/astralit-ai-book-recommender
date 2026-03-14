import { Schema, model, Document, Types } from "mongoose";

export interface IReadingList extends Document {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  status: "want_to_read" | "reading" | "completed";
  progress?: number;
  rating?: number;
  review?: string;
  addedAt: Date;
}

const readingListSchema = new Schema<IReadingList>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    enum: ["want_to_read", "reading", "completed"],
    default: "want_to_read",
  },
  progress: Number,
  rating: Number,
  review: String,
  addedAt: { type: Date, default: Date.now },
});

export const ReadingList = model<IReadingList>("ReadingList", readingListSchema);
