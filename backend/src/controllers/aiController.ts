import { Request, Response } from 'express';
import Recommender from '../services/recommender';

export const recommend = async (req: Request, res: Response) => {
  // body: { userId?, seedBookId?, num=10 }
  const { userId, seedBookId, num = 10 } = req.body;
  const recs = await Recommender.getHybridRecommendations({ userId, seedBookId, num });
  res.json(recs);
};

export const chat = async (req: Request, res: Response) => {
  // Simple passthrough to embedding+LLM (you can wire OpenAI/others)
  const { message } = req.body;
  const answer = await Recommender.chatAboutBooks(message);
  res.json({ answer });
};
