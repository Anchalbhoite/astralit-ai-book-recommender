# Authentication Strategy for AstraLit

## Current State (Frontend Only)
Currently using **localStorage** for basic personalization without authentication:
- ✅ Reading lists saved locally
- ✅ User preferences stored in browser
- ✅ Works great for demo and testing
- ⚠️ Data is per-browser (not synced across devices)
- ⚠️ Data is lost if browser cache is cleared

## Do You Need Authentication? YES, for Production! 🎯

### Why Authentication is Essential for AstraLit:

#### 1. **Personalized AI Recommendations**
- Each user has unique reading preferences
- AI needs to learn from individual reading history
- Personalized match scores (85% match, 92% match, etc.)
- Track what users like/dislike to improve recommendations

#### 2. **Cross-Device Sync**
- Users want to access their reading list on phone, tablet, desktop
- Save progress across devices
- Continue where they left off

#### 3. **Social Features**
- Share book recommendations with friends
- See what others are reading
- Join book clubs
- Leave reviews and ratings

#### 4. **Business Value**
- Track user engagement
- A/B testing for better recommendations
- Analytics on popular genres, books
- Subscription management (if monetizing)

## Recommended Authentication Approach

### Phase 1: MVP (Quick Start) ✨
**Use JWT Authentication with Node.js + Express**

```
Frontend (React) → Node.js/Express Backend → MongoDB/PostgreSQL
                      ↓
                 JWT Tokens
```

**Implementation:**
1. Express.js for REST API
2. JWT tokens for stateless auth
3. Passport.js for authentication strategies
4. Email/Password login (start simple)
5. MongoDB or PostgreSQL for user data

**Pros:**
- Full control over user data
- JavaScript everywhere (same language!)
- Industry standard
- Easy to implement
- Great ecosystem

### Phase 2: Enhanced Security 🔒
**Add OAuth2 / Social Login**

Add Google, GitHub, or other OAuth providers:
- Users can sign up with existing accounts
- Reduces friction in onboarding
- Better security (no password to manage)

**Implementation with Passport.js:**
```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Save user to database
  }
));
```

### Phase 3: Advanced Features 🚀
**Add these as you scale:**
- Email verification (using Nodemailer)
- Password reset flow
- Two-factor authentication (2FA)
- Role-based access (admin, premium users, etc.)
- Rate limiting per user (using express-rate-limit)

## Recommended Tech Stack

### Backend (Node.js/Express)
```javascript
// Dependencies
- express           // Web framework
- jsonwebtoken      // JWT authentication
- bcryptjs          // Password hashing
- passport          // Authentication middleware
- mongoose          // MongoDB ODM (or)
- pg / sequelize    // PostgreSQL ORM
- express-validator // Input validation
- cors              // CORS handling
- helmet            // Security headers
- express-rate-limit // Rate limiting
- nodemailer        // Email sending
```

### Frontend (React)
```javascript
// Already have these!
- Axios/Fetch (API calls with JWT)
- React Context (auth state management)
- Protected routes (redirect if not logged in)
- Token refresh logic
```

## Database Schema (Users)

### MongoDB Schema (Mongoose)
```javascript
const userSchema = new mongoose.Schema({
  _id: String, // or use default ObjectId
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  username: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  preferences: {
    favoriteGenres: [String],
    readingGoals: [String],
    preferredAuthors: [String],
    dislikedGenres: [String]
  }
});

const readingListSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  bookId: String,
  addedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['want_to_read', 'reading', 'completed'] 
  },
  progress: Number, // percentage or pages
  rating: Number,
  review: String
});

const chatHistorySchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  messages: [{
    role: { type: String, enum: ['user', 'ai'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});
```

### PostgreSQL Schema
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

CREATE TABLE user_preferences (
    user_id VARCHAR(36) PRIMARY KEY,
    favorite_genres JSONB,
    reading_goals JSONB,
    preferred_authors JSONB,
    disliked_genres JSONB,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reading_lists (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    book_id VARCHAR(36) NOT NULL,
    added_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50),
    progress INTEGER,
    rating DECIMAL(2,1),
    review TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ai_chat_history (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    message TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_reading_lists_user_id ON reading_lists(user_id);
CREATE INDEX idx_chat_history_user_id ON ai_chat_history(user_id);
```

## Node.js Backend Structure

```
backend/
├── server.js                  # Entry point
├── .env                       # Environment variables
├── config/
│   ├── database.js           # DB connection
│   └── passport.js           # Auth strategies
├── middleware/
│   ├── auth.js               # JWT verification
│   └── validate.js           # Input validation
├── models/
│   ├── User.js
│   ├── ReadingList.js
│   └── ChatHistory.js
├── routes/
│   ├── auth.js               # Auth routes
│   ├── books.js              # Book routes
│   ├── users.js              # User routes
│   └── ai.js                 # AI routes
└── controllers/
    ├── authController.js
    ├── booksController.js
    ├── usersController.js
    └── aiController.js
```

## API Endpoints

### Authentication
```
POST /api/auth/register     - Create new user
POST /api/auth/login        - Login (returns JWT)
POST /api/auth/refresh      - Refresh JWT token
POST /api/auth/logout       - Logout
GET  /api/auth/me           - Get current user
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/google       - OAuth login
```

### User Data
```
GET    /api/users/profile              - Get user profile
PUT    /api/users/profile              - Update profile
GET    /api/users/preferences          - Get preferences
PUT    /api/users/preferences          - Update preferences
GET    /api/users/reading-list         - Get reading list
POST   /api/users/reading-list         - Add book
PUT    /api/users/reading-list/:bookId - Update book status
DELETE /api/users/reading-list/:bookId - Remove from list
GET    /api/users/stats                - Reading statistics
```

### Books
```
GET  /api/books                 - Get all books (with pagination)
GET  /api/books/trending        - Get trending books
GET  /api/books/search?q=query  - Search books
GET  /api/books/:id             - Get single book
GET  /api/books/genre/:genre    - Get books by genre
POST /api/books/:id/review      - Add review
```

### AI Recommendations
```
GET  /api/recommendations        - Get personalized recommendations
POST /api/ai/chat                - Send message to AI
GET  /api/ai/chat/history        - Get chat history
POST /api/ai/analyze-preferences - Analyze user preferences
```

## Backend Code Example

### server.js
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/recommendations', require('./routes/recommendations'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### middleware/auth.js
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### controllers/authController.js
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      passwordHash,
      username
    });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
```

## Frontend Integration

### Auth Context
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('astralitToken')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    localStorage.setItem('astralitToken', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (email: string, password: string, username: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    });

    if (!response.ok) throw new Error('Registration failed');

    const data = await response.json();
    localStorage.setItem('astralitToken', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('astralitToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

## Security Best Practices

1. **Environment Variables**
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this
MONGODB_URI=mongodb://localhost:27017/astralit
FRONTEND_URL=https://your-frontend.com
```

2. **Password Requirements**
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

3. **Rate Limiting**
- Login: 5 attempts per 15 minutes
- Register: 3 attempts per hour
- AI Chat: 50 messages per hour
- API: 100 requests per 15 minutes

4. **Token Expiration**
- Access token: 7 days
- Refresh token: 30 days
- Implement token refresh mechanism

5. **HTTPS Only**
- Use SSL certificates
- Force HTTPS in production
- Set secure cookie flags

## Migration Path (LocalStorage → Database)

```typescript
// After user logs in, sync local data
const syncLocalData = async (token: string) => {
  const localReadingList = localStorage.getItem('astralitReadingList');
  const localPreferences = localStorage.getItem('astralitUserPreferences');

  if (localReadingList) {
    await fetch(`${API_URL}/users/reading-list/sync`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookIds: JSON.parse(localReadingList) })
    });
  }

  if (localPreferences) {
    await fetch(`${API_URL}/users/preferences`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.parse(localPreferences))
    });
  }

  // Clear local storage
  localStorage.removeItem('astralitReadingList');
  localStorage.removeItem('astralitUserPreferences');
};
```

## Recommended Timeline

**Week 1: Backend Setup**
- Set up Express server
- Configure database (MongoDB/PostgreSQL)
- Implement user model and authentication

**Week 2: API Development**
- Create all REST endpoints
- Add JWT middleware
- Implement CRUD operations

**Week 3: Frontend Integration**
- Create auth context
- Build login/register UI
- Add protected routes
- Sync local data

**Week 4: Testing & Deployment**
- Test all endpoints
- Security audit
- Deploy backend (Heroku, Railway, DigitalOcean)
- Deploy frontend

## Deployment Options

### Backend Hosting
- **Railway** (recommended) - Easy Node.js deployment
- **Heroku** - Classic option
- **DigitalOcean App Platform**
- **AWS EC2/Lambda**
- **Vercel** - Serverless functions

### Database Hosting
- **MongoDB Atlas** (free tier available)
- **Railway PostgreSQL**
- **Supabase** (PostgreSQL with extras)
- **AWS RDS**

## My Recommendation

**START NOW with Basic Auth:**
1. Set up Express + MongoDB (2 days)
2. Implement JWT authentication (2 days)
3. Create auth UI components (2 days)
4. Test and deploy (1 day)

**Total: ~1 week to add authentication**

For a production AI-powered recommendation system like AstraLit, authentication is **100% essential**!

---

**Ready to implement? Let me know and I can:**
1. Create complete Node.js backend code
2. Build login/register components
3. Set up auth context
4. Add protected routes
5. Create API integration layer**