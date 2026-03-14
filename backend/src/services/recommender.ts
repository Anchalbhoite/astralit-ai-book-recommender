
// recommender.ts
import {Book} from '../models/Book';
import Interaction from '../models/Interaction';
import User from '../models/User';
import { cosineSimilarity } from '../utils/tfidf';
import EmbeddingService from './embeddingService';

type Options = { userId?: string, seedBookId?: string, num?: number };

const Recommender = {
  getHybridRecommendations: async ({ userId, seedBookId, num = 10 }: Options) => {
    // 1) start with content-based (TF-IDF on title+desc+genres+keywords)
    let contentCandidates: any[] = [];
    if (seedBookId) {
      const seed = await Book.findById(seedBookId);
      // find candidates by simple text similarity (tfidf)
      contentCandidates = await Recommender.contentSimilarBooks(seed, 50);
    } else if (userId) {
      // find top user interactions genres and recommend by that
      const prefs = await Interaction.aggregate([
        { $match: { userId: new (require('mongoose').Types.ObjectId)(userId) } },
        { $group: { _id: '$bookId', score: { $sum: { $cond: [{ $eq: ['$type','rating'] }, '$value', 1] } } } },
        { $sort: { score: -1 } },
        { $limit: 10 }
      ]);
      const ids = prefs.map((p:any)=>p._id);
      contentCandidates = await Book.find({ _id: { $in: ids } });
    } else {
      contentCandidates = await Book.find().limit(100);
    }

    // 2) Embedding-based re-ranking (if enabled)
    if (process.env.EMBEDDINGS_ENABLED === 'true' && seedBookId) {
      const seed = await Book.findById(seedBookId);
      if (seed && seed.embedding && seed.embedding.length) {
        // compute cosine between seed.embedding and others
        const all = await Book.find({ _id: { $nin: [seed._id] } }).limit(500);
        const scored = all.map(b => ({
          book: b,
          score: cosineSimilarity(seed.embedding as number[], b.embedding as number[] || [])
        }));
        scored.sort((a,b)=>b.score - a.score);
        const top = scored.slice(0, num).map(s => s.book);
        return top;
      }
    }

    // 3) Collaborative filtering boost: find books liked by users who liked seed or similar set
    let collaborativeBoost: Record<string, number> = {};
    if (seedBookId) {
      const interactions = await Interaction.find({ bookId: seedBookId, type: 'rating' }).limit(200);
      const userIds = interactions.map(i => i.userId);
      const otherInteractions = await Interaction.find({ userId: { $in: userIds }, bookId: { $ne: seedBookId } });
      otherInteractions.forEach(i => {
        collaborativeBoost[i.bookId.toString()] = (collaborativeBoost[i.bookId.toString()] || 0) + (i.value || 1);
      });
    }

    // 4) Score and combine
    const scored: { book: any, score: number }[] = [];
    for (const book of contentCandidates) {
      let score = 1;
      // using keywords/genres: small boost if shares genres
      // ... simplistic score
      score += (book.genres?.length || 0) * 0.1;
      const boost = collaborativeBoost[book._id.toString()] || 0;
      score += boost * 0.05;
      scored.push({ book, score });
    }
    scored.sort((a,b)=>b.score - a.score);
    return scored.slice(0, num).map(s=>s.book);
  },

  contentSimilarBooks: async (seed: any, limit=30) => {
    // simple TF-IDF cosine approach based on text features
    // Precompute TF-IDF vectors for all books (for heavy loads, precompute offline)
    // Here we use naive text distance via simple tokenizer for demo
    const books = await Book.find({ _id: { $ne: seed._id } }).limit(500);
    // use utils.tfidf to create vectors and compute cosine
    const docs = [seed, ...books];
    const { vectors } = require('../utils/tfidf');
    const vecs = vectors(docs.map((d:any)=>`${d.title} ${d.description} ${ (d.genres||[]).join(' ') } ${(d.keywords||[]).join(' ')}`));
    const seedVec = vecs[0];
    const scored = books.map((b,i)=>({
      book: b,
      score: cosineSimilarity(seedVec, vecs[i+1])
    })).sort((a,b)=>b.score-a.score).slice(0, limit).map(s=>s.book);
    return scored;
  },

  chatAboutBooks: async (message: string) => {
    if (process.env.EMBEDDINGS_ENABLED === 'true') {
      // Optionally use embedding+LLM; embedding service encapsulates provider logic
      return await EmbeddingService.chat(message);
    }
    // fallback simple rule-based
    return `I can help with book recommendations, searching, and reading stats. You asked: ${message}`;
  }
};

export default Recommender;
