import { Schema, model } from 'mongoose';

const InteractionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
  type: { type: String, enum: ['view','bookmark','rating','read'], default: 'view' },
  value: Number, // e.g. rating 1-5, read progress
}, { timestamps: true });

export default model('Interaction', InteractionSchema);
