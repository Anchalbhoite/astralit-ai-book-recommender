// Mock Data for AstraLit - Easy to update and manage
// TODO: Replace with real API calls to Spring backend
//frontend/src/data/mockData.ts
export interface Book {
   id?: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genre: string;
  description: string;
  aiMatch?: number;
  trending?: boolean;
  popularity?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface UserPreferences {
  favoriteGenres: string[];
  readingGoals: string[];
  preferredAuthors: string[];
  dislikedGenres: string[];
}

// ====================
// BOOK CATALOG
// ====================
export const allBooks: Book[] = [
  {
    
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://i.pinimg.com/736x/af/17/da/af17daf1515440e35fd6daf0484fb508.jpg',
    rating: 4.5,
    genre: 'Fiction',
    description: 'A dazzling novel about all the choices that go into a life well lived.',
    aiMatch: 95,
    trending: true,
    popularity: 98
  },
{
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://i.pinimg.com/1200x/20/d1/a6/20d1a65703a999cd0b39f87d7bb41c1d.jpg',
    rating: 4.8,
    genre: 'selfhelp',
    description: 'An easy and proven way to build good habits and break bad ones.',
    aiMatch: 92,
    trending: true,
    popularity: 95
  },
  {
    
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://i.pinimg.com/1200x/c5/85/ce/c585ce0ea039b1e689f5744045099974.jpg',
    rating: 4.7,
    genre: 'Thriller',
    description: 'A shocking psychological thriller about a woman\'s act of violence against her husband.',
    aiMatch: 88,
    trending: true,
    popularity: 92
  },
  {
    
    title: 'Educated',
    author: 'Tara Westover',
    cover: 'https://i.pinimg.com/736x/00/0c/4a/000c4ad73f0f7930c1240dba7f2f50d0.jpg',
    rating: 4.7,
    genre: 'biography',
    description: 'A memoir about a young woman who leaves her survivalist family and goes on to earn a PhD.',
    aiMatch: 85,
    trending: false,
    popularity: 88
  },
  {
    
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://m.media-amazon.com/images/I/81o4R4G+xHL._UF1000,1000_QL80_.jpg',
    rating: 4.6,
    genre: 'scifi',
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.',
    aiMatch: 90,
    trending: true,
    popularity: 90
  },
  {
    
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    cover: 'https://i.pinimg.com/736x/96/16/3e/96163ed69acef92e4efaea8cf1fc3bd1.jpg',
    rating: 4.4,
    genre: 'Fiction',
    description: 'A coming-of-age story of a young girl raised by the marshlands of the deep South.',
    aiMatch: 87,
    trending: false,
    popularity: 85
  },
  {
    
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop',
    rating: 4.5,
    genre: 'business',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money.',
    aiMatch: 83,
    trending: true,
    popularity: 87
  },
  {
    
    title: 'Circe',
    author: 'Madeline Miller',
    cover: 'https://i.pinimg.com/736x/3f/52/41/3f5241a8b982421e79fb3129d18bfca3.jpg',
    rating: 4.6,
    genre: 'Fantasy',
    description: 'A stunning reimagining of the life of Circe, the sorceress from Homer\'s Odyssey.',
    aiMatch: 91,
    trending: false,
    popularity: 82
  },
  {
    
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://i.pinimg.com/1200x/37/9e/6d/379e6d2e1af88e2295e6ec3b6ad3e244.jpg',
    rating: 4.7,
    genre: 'History',
    description: 'A brief history of humankind exploring how Homo sapiens came to dominate the world.',
    aiMatch: 89,
    trending: false,
    popularity: 94
  },
  {
    
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: 'https://i.pinimg.com/1200x/13/52/6c/13526c2522c048db7096cefef6ebdf55.jpg',
    rating: 4.8,
    genre: 'Fiction',
    description: 'A legendary film actress reveals the truth about her glamorous and scandalous life.',
    aiMatch: 94,
    trending: true,
    popularity: 96
  },
  {
    
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    cover: 'https://i.pinimg.com/1200x/2f/21/9b/2f219ba8a4a999a76a60eecbc8eb9372.jpg',
    rating: 4.2,
    genre: 'Fiction',
    description: 'A magical tale about following your dreams and listening to your heart.',
    aiMatch: 86,
    trending: false,
    popularity: 89
  },
  {
    
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    cover: 'https://i.pinimg.com/1200x/3b/5a/0f/3b5a0fbce8a9246201471c81e616b6fc.jpg',
    rating: 4.4,
    genre: 'Psychology',
    description: 'A groundbreaking tour of the mind explaining the two systems that drive the way we think.',
    aiMatch: 82,
    trending: false,
    popularity: 86
  },
  {
  
  title: "I Don't Love You Anymore",
  author: 'Rithvik Singh',
  cover:'https://i.pinimg.com/736x/50/d1/0e/50d10e3065de35c565a51152df6db229.jpg',
  rating: 4.6,
  genre: 'selfhelp',
  description: 'A heartbreaking story about falling out of love, healing, and rediscovering yourself.',
  aiMatch: 91,
  trending: true,
  popularity: 94
},
{
  
  title: 'The Art of Being Alone',
  author: 'Renuka Gavrani',
  cover: 'https://i.pinimg.com/736x/8e/af/a8/8eafa85236508142fc820538641146c9.jpg',
  rating: 4.7,
  genre: 'selfhelp',
  description: 'A gentle guide to finding peace, clarity, and strength while being on your own.',
  aiMatch: 93,
  trending: true,
  popularity: 96
},
{
  
  title: 'The Art of Letting Go',
  author: 'Nick Trenton',
  cover: 'https://i.pinimg.com/736x/ff/2b/01/ff2b01d6eae9e2f6a5475282cdb8f408.jpg',
  rating: 4.8,
  genre: 'selfhelp',
  description: 'A powerful breakdown of emotional healing, acceptance, and releasing past baggage.',
  aiMatch: 94,
  trending: true,
  popularity: 97
},
{
  
  title: 'Can We Be Strangers Again?',
  author: 'Shrijeet Shandilya',
  cover: 'https://i.pinimg.com/1200x/07/e2/c0/07e2c01b3470a9fe539435e639eed666.jpg',
  rating: 4.5,
  genre: 'selfhelp',
  description: 'A bittersweet story about love, heartbreak, and the painful wish to restart.',
  aiMatch: 89,
  trending: true,
  popularity: 92
},
{
  
  title: "King of Pride",
  author: 'Ana Huang',
  cover: 'https://i.pinimg.com/736x/5e/2c/9a/5e2c9a473b975cd0dc11830092e3a31e.jpg',
  rating: 4.7,
  genre: 'Romance',
  description: 'A royal fantasy filled with political intrigue, passion, and dark secrets.',
  aiMatch: 92,
  trending: true,
  popularity: 95
},
{
  
  title: 'Twisted Love',
  author: 'Ana Huang',
  cover: 'https://i.pinimg.com/736x/5d/95/39/5d9539c4c1b591baaabda6cc75426db9.jpg',
  rating: 4.6,
  genre: 'Romance',
  description: 'The first book in the Twisted series — a story of dangerous love, obsession, and betrayal.',
  aiMatch: 95,
  trending: true,
  popularity: 98
},
{
  
  title: 'Twisted Games',
  author: 'Ana Huang',
  cover: 'https://i.pinimg.com/736x/b3/7c/25/b37c25c62b7ed8d416faadf933cae14f.jpg',
  rating: 4.7,
  genre: 'Romance',
  description: 'A forbidden royal romance with tension, passion, and heartbreak.',
  aiMatch: 94,
  trending: true,
  popularity: 96
},
{
  
  title: 'Twisted Hate',
  author: 'Ana Huang',
  cover: 'https://i.pinimg.com/736x/9f/ad/40/9fad40b5668374c4eaf68ef9e9b429ba.jpg',
  rating: 4.6,
  genre: 'Romance',
  description: 'An enemies-to-lovers romance full of fire, tension, and emotional wounds.',
  aiMatch: 93,
  trending: false,
  popularity: 90
},
{
  
  title: 'Twisted Lies',
  author: 'Ana Huang',
  cover: 'https://i.pinimg.com/736x/e2/93/ab/e293ab5961754c20769be3013b702f1e.jpg',
  rating: 4.8,
  genre: 'Romance',
  description: 'The final Twisted novel — a dangerous love between a liar and a woman with a past.',
  aiMatch: 96,
  trending: true,
  popularity: 99
},
{
  
  title: 'Junji Ito Horror Collection',
  author: 'Junji Ito',
  cover: 'https://i.pinimg.com/1200x/72/3a/15/723a15e0b725c69eca8f2e869162420e.jpg',
  rating: 4.9,
  genre: 'Horror',
  description: 'A terrifying anthology of grotesque, surreal, chilling stories by the master of horror.',
  aiMatch: 98,
  trending: true,
  popularity: 100
},
{
  
  title: 'Rich Dad Poor Dad',
  author: 'Robert Kiyosaki',
  cover: 'https://i.pinimg.com/1200x/55/e9/d9/55e9d9d2241b88e9c0bc2e951febb92d.jpg',
  rating: 4.3,
  genre: 'Business',
  description: 'A classic guide to financial independence and wealth-building mindset.',
  aiMatch: 84,
  trending: false,
  popularity: 88
},

{
  
  title: 'Naruto, Vol. 1: Naruto Uzumaki',
  author: 'Masashi Kishimoto',
  cover: 'https://i.pinimg.com/736x/f7/d7/6f/f7d76fd1ceaf895c0d6534b191dcf063.jpg',
  rating: 4.9,
  genre: 'Manga',
  description: 'The beginning of Naruto\'s journey to become the world’s greatest ninja.',
  aiMatch: 97,
  trending: true,
  popularity: 99
},
{
  
  title: 'Attack on Titan, Vol. 1',
  author: 'Hajime Isayama',
  cover: 'https://i.pinimg.com/736x/d6/db/56/d6db56701eb303d9dd3cddab3afb4701.jpg',
  rating: 4.8,
  genre: 'Manga',
  description: 'Humanity fights for survival against man-eating Titans.',
  aiMatch: 95,
  trending: true,
  popularity: 98
},
{
  
  title: 'Death Note, Vol. 1',
  author: 'Tsugumi Ohba & Takeshi Obata',
  cover: 'https://i.pinimg.com/736x/66/60/35/6660352229c21c3d24fa26ff6755181a.jpg',
  rating: 4.9,
  genre: 'Manga',
  description: 'A brilliant student discovers a notebook that can kill anyone whose name is written in it.',
  aiMatch: 96,
  trending: true,
  popularity: 100
},
{
  
  title: 'Your Name',
  author: 'Makoto Shinkai',
  cover: 'https://i.pinimg.com/736x/40/f0/51/40f0511d9bb54f1983a125197cd898b6.jpg',
  rating: 4.8,
  genre: 'Manga',
  description: 'A breathtaking romantic fantasy about two strangers connected by fate.',
  aiMatch: 94,
  trending: true,
  popularity: 97
},
];

// ====================
// CATEGORIES
// ====================
export const categories: Category[] = [
  { id: 'fiction', name: 'Fiction', icon: '📚', count: 1250 },
  { id: 'scifi', name: 'Science Fiction', icon: '🚀', count: 850 },
  { id: 'fantasy', name: 'Fantasy', icon: '🧙', count: 920 },
  { id: 'thriller', name: 'Thriller', icon: '🔪', count: 680 },
  { id: 'romance', name: 'Romance', icon: '💕', count: 1100 },
  { id: 'biography', name: 'Biography', icon: '👤', count: 400 },
  { id: 'selfhelp', name: 'Self-Help', icon: '🌟', count: 540 },
  { id: 'history', name: 'History', icon: '📜', count: 450 },
  { id: 'business', name: 'Business', icon: '💼', count: 620 },
  { id: 'psychology', name: 'Psychology', icon: '🧠', count: 490 },
  { id: 'horror', name: 'Horror', icon: '👻', count: 420 },
  { id: 'manga', name: 'Manga', icon: '📖', count: 800 },
];

// ====================
// DATA GETTERS
// ====================

// Get trending books (sorted by popularity)
export const getTrendingBooks = (limit: number = 6): Book[] => {
  return allBooks
    .filter(book => book.trending)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
};

// Get AI recommendations (sorted by AI match score)
export const getAIRecommendations = (userPreferences?: UserPreferences, limit: number = 4): Book[] => {
  // TODO: In production, this will call your Spring backend API with user preferences
  // For now, return books with highest AI match
  return allBooks
    .sort((a, b) => (b.aiMatch || 0) - (a.aiMatch || 0))
    .slice(0, limit);
};


// Get books by genre
export const getBooksByGenre = (genre: string, limit?: number): Book[] => {
  const lower = genre.toLowerCase();

  const filtered = allBooks.filter(book =>
    book.genre.toLowerCase().includes(lower)
  );

  return limit ? filtered.slice(0, limit) : filtered;
};


// Get books by category/genre for grid display
export const getCategoryBooks = (limit: number = 24): Book[] => {

  return allBooks.slice(0, limit);
};

// Search books by title or author
export const searchBooks = (query: string): Book[] => {
  const lowerQuery = query.toLowerCase();
  return allBooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) || 
    book.author.toLowerCase().includes(lowerQuery)
  );
};

// Get book by ID
export const getBookById = (id: string): Book | undefined => {
  return allBooks.find(book => book.id === id);
};

// ====================
// USER DATA (LocalStorage simulation)
// ====================

// Get user preferences from localStorage
export const getUserPreferences = (): UserPreferences | null => {
  const prefs = localStorage.getItem('astralitUserPreferences');
  return prefs ? JSON.parse(prefs) : null;
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences: UserPreferences): void => {
  localStorage.setItem('astralitUserPreferences', JSON.stringify(preferences));
};

// Get user's reading list from localStorage
export const getReadingList = (): Book[] => {
  const list = localStorage.getItem('astralitReadingList');
  if (!list) return [];
  
  const bookIds: string[] = JSON.parse(list);
  return bookIds.map(id => getBookById(id)).filter(Boolean) as Book[];
};

// Add book to reading list
export const addToReadingList = (bookId: string): void => {
  const list = localStorage.getItem('astralitReadingList');
  const bookIds: string[] = list ? JSON.parse(list) : [];
  
  if (!bookIds.includes(bookId)) {
    bookIds.push(bookId);
    localStorage.setItem('astralitReadingList', JSON.stringify(bookIds));
  }
};

// Remove book from reading list
export const removeFromReadingList = (bookId: string): void => {
  const list = localStorage.getItem('astralitReadingList');
  if (!list) return;
  
  const bookIds: string[] = JSON.parse(list);
  const filtered = bookIds.filter(id => id !== bookId);
  localStorage.setItem('astralitReadingList', JSON.stringify(filtered));
};

// Check if book is in reading list
export const isInReadingList = (bookId: string): boolean => {
  const list = localStorage.getItem('astralitReadingList');
  if (!list) return false;
  
  const bookIds: string[] = JSON.parse(list);
  return bookIds.includes(bookId);
};

// ====================
// AI CHAT MOCK RESPONSES
// ====================
export const getAIChatResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple keyword matching - TODO: Replace with real AI API
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
    return "Based on your reading history, I'd recommend 'The Midnight Library' by Matt Haig. It's a thought-provoking novel about life's infinite possibilities that readers with your taste absolutely love! Would you like more suggestions in this genre?";
  }
  
  if (lowerMessage.includes('thriller') || lowerMessage.includes('mystery')) {
    return "For thriller lovers, I highly recommend 'The Silent Patient' by Alex Michaelides! It's a psychological thriller with an amazing twist. Also check out 'Gone Girl' if you haven't read it yet.";
  }
  
  if (lowerMessage.includes('fiction') || lowerMessage.includes('novel')) {
    return "I have some amazing fiction recommendations! 'Where the Crawdads Sing' by Delia Owens is beautifully written, and 'The Seven Husbands of Evelyn Hugo' is absolutely captivating. Which themes interest you more?";
  }
  
  if (lowerMessage.includes('self-help') || lowerMessage.includes('improve')) {
    return "'Atomic Habits' by James Clear is perfect for personal development! It offers practical strategies for building good habits. Also check out 'The Psychology of Money' for financial wisdom.";
  }
  
  if (lowerMessage.includes('science') || lowerMessage.includes('sci-fi')) {
    return "'Project Hail Mary' by Andy Weir is incredible! If you loved 'The Martian', you'll love this. It's scientifically accurate and absolutely gripping!";
  }
  
  // Default response
  return "I'd love to help you find your next great read! Tell me more about what you're interested in - your favorite genres, authors you love, or the kind of story you're looking for. The more I know about your preferences, the better recommendations I can provide! ✨";
};

// Export default mock data summary
export const mockDataSummary = {
  totalBooks: allBooks.length,
  trendingCount: allBooks.filter(b => b.trending).length,
  categoriesCount: categories.length,
  lastUpdated: '2025-01-20'
};
