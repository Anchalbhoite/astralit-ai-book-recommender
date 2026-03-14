import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import booksRoutes from './routes/books';
import userRoutes from './routes/user';
import aiRoutes from './routes/ai';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (_, res) => res.json({ok: true, message: 'AstralIt Backend'}));

export default app;
