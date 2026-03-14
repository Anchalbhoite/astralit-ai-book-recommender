import { Request, Response } from 'express';
import User from '../models/User';
import {ReadingList} from '../models/ReadingList';


export const getProfile = async (req: Request, res: Response) => {
const anyReq: any = req;
const userId = anyReq.user?._id;
if (!userId) return res.status(401).json({ error: 'Unauthorized' });
const user = await User.findById(userId).select('-passwordHash');
res.json(user);
};


export const updatePreferences = async (req: Request, res: Response) => {
const anyReq: any = req;
const userId = anyReq.user?._id;
if (!userId) return res.status(401).json({ error: 'Unauthorized' });


const { preferences } = req.body;
const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true }).select('-passwordHash');
res.json(user);
};


export const addToReadingList = async (req: Request, res: Response) => {
const anyReq: any = req;
const userId = anyReq.user?._id;
if (!userId) return res.status(401).json({ error: 'Unauthorized' });


const { bookId, status = 'want_to_read' } = req.body;
if (!bookId) return res.status(400).json({ error: 'bookId required' });


const entry = await ReadingList.create({ userId, bookId, status });
res.status(201).json(entry);
};


export const getReadingList = async (req: Request, res: Response) => {
const anyReq: any = req;
const userId = anyReq.user?._id;
if (!userId) return res.status(401).json({ error: 'Unauthorized' });


const list = await ReadingList.find({ userId }).populate('bookId');
res.json(list);
};


export const syncLocalData = async (req: Request, res: Response) => {
// body: { bookIds?: string[], preferences?: object }
const anyReq: any = req;
const userId = anyReq.user?._id;
if (!userId) return res.status(401).json({ error: 'Unauthorized' });


const { bookIds, preferences } = req.body;
if (Array.isArray(bookIds)) {
// naive sync: create reading list entries for each
const ops = bookIds.map((bid: string) => ({ userId, bookId: bid }));
// avoid duplicates: upsert would be better; keep simple here
for (const op of ops) {
const exists = await ReadingList.findOne({ userId, bookId: op.bookId });
if (!exists) await ReadingList.create(op);
}
}


if (preferences) {
await User.findByIdAndUpdate(userId, { preferences }, { new: true });
}


res.json({ ok: true });
};