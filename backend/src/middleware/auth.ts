import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'astralit_dev_secret';


export interface AuthRequest extends Request {
user?: any;
}


export default async function auth(req: AuthRequest, res: Response, next: NextFunction) {
try {
const header = req.headers.authorization || '';
const token = header.replace('Bearer ', '').trim();
if (!token) return res.status(401).json({ error: 'No token' });


const payload: any = jwt.verify(token, JWT_SECRET);
if (!payload || !payload.userId) return res.status(401).json({ error: 'Invalid token' });


const user = await User.findById(payload.userId).select('-passwordHash');
if (!user) return res.status(401).json({ error: 'User not found' });


req.user = user;
next();
} catch (error) {
console.error('auth middleware error', error);
return res.status(401).json({ error: 'Unauthorized' });
}
}