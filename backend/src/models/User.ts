import { Schema, model, Document } from 'mongoose';


export interface IUser extends Document {
name?: string;
email: string;
passwordHash?: string;
avatar?: string;
createdAt?: Date;
lastLogin?: Date;
preferences?: {
favoriteGenres?: string[];
preferredAuthors?: string[];
dislikedGenres?: string[];
readingGoals?: string[];
};
likedBooks?: string[]; // book IDs
}


const UserSchema = new Schema<IUser>({
name: { type: String },
email: { type: String, unique: true, required: true },
passwordHash: { type: String },
avatar: { type: String },
lastLogin: { type: Date },
preferences: {
favoriteGenres: { type: [String], default: [] },
preferredAuthors: { type: [String], default: [] },
dislikedGenres: { type: [String], default: [] },
readingGoals: { type: [String], default: [] }
},
likedBooks: { type: [String], default: [] }
}, { timestamps: true });


export default model<IUser>('User', UserSchema);