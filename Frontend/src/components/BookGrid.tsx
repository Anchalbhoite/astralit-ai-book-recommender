import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { BookCard } from './BookCard';

import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';


interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  rating: number;
  description: string;
}


interface BookGridProps {
  searchQuery: string;
}

const API_BASE = "http://localhost:4000/api";

export function BookGrid({ searchQuery }: BookGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localQuery, setLocalQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // 1️⃣ Load ALL books initially
  // -------------------------------
  const loadAllBooks = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/books`);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAllBooks();
  }, []);

  // -------------------------------
  // 2️⃣ IF HEADER SEARCH CHANGES → filter
  // -------------------------------
  useEffect(() => {
    if (!searchQuery.trim()) {
      loadAllBooks();
      return;
    }

    const fetchSearch = async () => {
      const res = await fetch(`${API_BASE}/books/search?q=${searchQuery}`);
      const data = await res.json();
      setBooks(data);
    };

    fetchSearch();
  }, [searchQuery]);

  // -------------------------------
  // 3️⃣ Category filtering
  // -------------------------------
  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocalQuery('');

    if (categoryId === 'all') {
      loadAllBooks();
      return;
    }

    const res = await fetch(`${API_BASE}/books?genre=${categoryId}`);
    const data = await res.json();
    setBooks(data);
  };

  // -------------------------------
  // 4️⃣ Local search inside BookGrid
  // -------------------------------
  const handleLocalSearch = async (query: string) => {
    setLocalQuery(query);

    if (!query.trim()) {
      loadAllBooks();
      return;
    }

    const res = await fetch(`${API_BASE}/books/search?q=${query}`);
    const data = await res.json();
    setBooks(data);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-white text-3xl">Explore by Genre</h2>
            <p className="text-purple-300 mt-2">Discover your next favorite book</p>
          </div>

          {/* Local Search */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-400" />
            <Input
              placeholder="Search books..."
              value={localQuery}
              onChange={(e) => handleLocalSearch(e.target.value)}
              className="pl-10 w-full md:w-64 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'border-purple-500/30 text-purple-300'
            }`}
            onClick={() => handleCategoryChange('all')}
          >
            All Books
          </Badge>

          {/* USE BACKEND GENRES LATER — for now static */}
          {['fiction', 'selfhelp', 'romance', 'fantasy', 'thriller'].map((genre) => (
            <Badge
              key={genre}
              variant={selectedCategory === genre ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedCategory === genre
                  ? 'bg-purple-600 text-white'
                  : 'border-purple-500/30 text-purple-300'
              }`}
              onClick={() => handleCategoryChange(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-purple-300">Loading books...</p>
          ) : books.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-purple-300">
                No books found matching "{searchQuery || localQuery}"
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
