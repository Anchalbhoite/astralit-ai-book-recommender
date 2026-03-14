// src/components/ReadingList.tsx
import { X, BookmarkCheck, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useState, useEffect } from 'react';
import { getReadingList, removeFromReadingList } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Book } from '../data/mockData';

interface ReadingListProps {
  onClose: () => void;
}

export function ReadingList({ onClose }: ReadingListProps) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getReadingList());
  }, []);

  const handleRemove = (bookId: string) => {
    removeFromReadingList(bookId);
    setBooks(getReadingList());
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-950/95 backdrop-blur-xl border-l border-purple-500/20 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="size-5 text-purple-400" />
          <h3 className="text-white">My Reading List</h3>
          <span className="px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 text-sm">
            {books.length}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="text-purple-300 hover:text-purple-200"
        >
          <X className="size-5" />
        </Button>
      </div>

      {/* Books List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {books.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookmarkCheck className="size-12 text-purple-400/50 mx-auto" />
              <p className="text-purple-300">Your reading list is empty</p>
              <p className="text-purple-400 text-sm">Start adding books you want to read!</p>
            </div>
          ) : (
            books.map((book) => (
              <div 
                key={book._id}
                className="flex gap-3 p-3 rounded-lg bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <div className="relative w-16 h-24 rounded overflow-hidden bg-slate-800 shrink-0">
                  <ImageWithFallback
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm line-clamp-2">{book.title}</h4>
                  <p className="text-purple-300 text-xs mt-1">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-400 text-xs">★ {book.rating}</span>
                    <span className="text-purple-400 text-xs">{book.genre}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(book._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}