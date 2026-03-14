import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'astralit_dev_secret';
const TOKEN_EXP = '7d';


export const register = async (req: Request, res: Response) => {
try {
const { name, email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ error: 'Email already registered' });


const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash });


const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXP });


res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
} catch (error) {
console.error('register error', error);
res.status(500).json({ error: 'Registration failed' });
}
};


export const login = async (req: Request, res: Response) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });


const user = await User.findOne({ email });
if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });


const match = await bcrypt.compare(password, user.passwordHash);
if (!match) return res.status(401).json({ error: 'Invalid credentials' });


user.lastLogin = new Date();
await user.save();


const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXP });


res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
} catch (error) {
console.error('login error', error);
res.status(500).json({ error: 'Login failed' });
}
};


export const me = async (req: Request, res: Response) => {
// auth middleware attaches req.user
const anyReq: any = req;
if (!anyReq.user) return res.status(401).json({ error: 'Unauthorized' });
const user = anyReq.user;
res.json({ id: user._id, email: user.email, name: user.name, preferences: user.preferences });
};