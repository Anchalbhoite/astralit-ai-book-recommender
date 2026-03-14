# AstraLit Data Management Guide

## 📚 Centralized Mock Data System

All mock data is now centralized in `/data/mockData.ts` for easy management and updates.

### Quick Start

```typescript
// Import what you need
import { 
  allBooks,
  getTrendingBooks, 
  getAIRecommendations,
  addToReadingList,
  categories 
} from '../data/mockData';
```

## 🔧 How to Update Data

### Adding New Books

Edit `/data/mockData.ts` and add to the `allBooks` array:

```typescript
{
  id: '13',
  title: 'Your Book Title',
  author: 'Author Name',
  cover: 'https://images.unsplash.com/photo-...',
  rating: 4.5,
  genre: 'Fiction',
  description: 'Book description...',
  aiMatch: 90,          // Optional: AI match percentage
  trending: true,       // Optional: Show in trending
  popularity: 95        // Optional: Trending sort order
}
```

### Changing Trending Books

Just update the `trending` and `popularity` fields:

```typescript
{
  id: '1',
  trending: true,    // Set to true to show in trending section
  popularity: 98     // Higher = appears first
}
```

### Updating Categories

Edit the `categories` array:

```typescript
{ 
  id: 'scifi', 
  name: 'Science Fiction', 
  icon: '🚀', 
  count: 850 
}
```

### Modifying AI Match Scores

Update the `aiMatch` field for any book:

```typescript
{
  id: '1',
  aiMatch: 95  // Percentage shown to users
}
```

## 🎯 Available Functions

### Book Retrieval
- `getTrendingBooks(limit)` - Get trending books
- `getAIRecommendations(preferences, limit)` - Get AI recommendations
- `getBooksByGenre(genre, limit)` - Filter by genre
- `getCategoryBooks(limit)` - Get books for grid
- `searchBooks(query)` - Search by title/author
- `getBookById(id)` - Get single book

### User Data (LocalStorage)
- `getReadingList()` - Get user's saved books
- `addToReadingList(bookId)` - Add book to list
- `removeFromReadingList(bookId)` - Remove book
- `isInReadingList(bookId)` - Check if saved
- `getUserPreferences()` - Get user preferences
- `saveUserPreferences(prefs)` - Save preferences

### AI Chat
- `getAIChatResponse(message)` - Get AI response

## 🔄 Connecting to Spring Backend

When you're ready to connect your Spring backend, replace these functions:

### 1. Books API

```typescript
// Replace this:
const books = getTrendingBooks(6);

// With this:
const books = await fetch('https://your-api.com/api/books/trending?limit=6')
  .then(res => res.json());
```

### 2. AI Recommendations API

```typescript
// Replace this:
const recommendations = getAIRecommendations(userPrefs, 4);

// With this:
const recommendations = await fetch('https://your-api.com/api/recommendations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ preferences: userPrefs, limit: 4 })
}).then(res => res.json());
```

### 3. Reading List API

```typescript
// Replace this:
addToReadingList(bookId);

// With this:
await fetch('https://your-api.com/api/users/reading-list', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ bookId })
});
```

### 4. AI Chat API

```typescript
// Replace this:
const response = getAIChatResponse(userMessage);

// With this:
const response = await fetch('https://your-api.com/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ message: userMessage })
}).then(res => res.json());
```

## 📊 Current Data Structure

### Book Interface
```typescript
{
  id: string;
  title: string;
  author: string;
  cover: string;          // Image URL
  rating: number;         // 0-5
  genre: string;
  description: string;
  aiMatch?: number;       // Optional: 0-100
  trending?: boolean;     // Optional
  popularity?: number;    // Optional: for sorting
}
```

### User Preferences Interface
```typescript
{
  favoriteGenres: string[];
  readingGoals: string[];
  preferredAuthors: string[];
  dislikedGenres: string[];
}
```

## 🎨 Customizing Images

All book covers use Unsplash. To change:

1. Go to [Unsplash](https://unsplash.com)
2. Find a book/reading image
3. Get the URL in format: `https://images.unsplash.com/photo-XXXXX?w=400&h=600&fit=crop`
4. Update the `cover` field

## 💾 LocalStorage Keys

The app uses these localStorage keys:
- `astralitReadingList` - Array of book IDs
- `astralitUserPreferences` - User preference object

To clear all data:
```javascript
localStorage.removeItem('astralitReadingList');
localStorage.removeItem('astralitUserPreferences');
```

## 🚀 Next Steps

1. **Add more books** to the `allBooks` array
2. **Update trending flags** based on real popularity
3. **Connect to Spring backend** when ready
4. **Implement authentication** (see AUTHENTICATION_STRATEGY.md)
5. **Replace mock AI responses** with real AI API

## 📝 Tips

- Keep at least 12+ books for good grid display
- Mark 6-8 books as trending for variety
- AI match scores 85-95 look most realistic
- Use diverse genres for better recommendations
- Update popularity scores weekly for fresh trending

---

Need help? Check out `AUTHENTICATION_STRATEGY.md` for backend integration guide!
