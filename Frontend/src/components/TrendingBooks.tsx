import { TrendingUp } from "lucide-react";
import { BookCard } from "./BookCard";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  rating: number;
  description: string;
}

export function TrendingBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/books?trending=true");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load trending books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section id="trending-books" className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <TrendingUp className="size-5 text-orange-400" />
            <span className="text-orange-300 text-sm">Hot Right Now</span>
          </div>
          <h2 className="text-white text-3xl">Trending Books</h2>
        </div>

        <p className="text-purple-300">
          Most popular books across the AstraLit community this week
        </p>

        {/* Loading State */}
        {loading && (
          <p className="text-purple-300 text-center py-10">Loading trending books...</p>
        )}

        {/* Books Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
