// src/components/BookCard.tsx
import { Star, BookmarkPlus, Info, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookDetailModal } from './BookDetailModal';
import { addToReadingList, removeFromReadingList, isInReadingList } from '../data/mockData';
import { toast } from 'sonner';

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genre: string;
  aiMatch?: number;
  description: string;
}

interface BookCardProps {
  book: Book;
  showAIMatch?: boolean;
}

export function BookCard({ book, showAIMatch }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Initialize reading list status
  useEffect(() => {
    setIsSaved(isInReadingList(book._id));
  }, [book._id]);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeFromReadingList(book._id);
      toast.success('Removed from reading list');
      setIsSaved(false);
    } else {
      addToReadingList(book._id);
      toast.success('Added to reading list');
      setIsSaved(true);
    }
  };

  return (
    <>
      <div
        className="group relative rounded-xl overflow-hidden bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* AI Match Badge */}
        {showAIMatch && book.aiMatch && (
          <div className="absolute top-4 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
            <Sparkles className="size-3" />
            <span>{book.aiMatch}% Match</span>
          </div>
        )}

        {/* Save Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSaveToggle}
          className={`absolute top-3 right-0 z-10 size-8 p-0 rounded-full ${
            isSaved ? 'bg-purple-600 text-white' : 'bg-slate-900/80 text-purple-300'
          } hover:bg-purple-600 hover:text-white backdrop-blur-sm`}
        >
          <BookmarkPlus className="size-4" />
        </Button>

        {/* Book Cover */}
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
          <ImageWithFallback
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />

          {/* Hover Overlay - Desktop */}
          {isHovered && (
          <div className="hidden sm:block  absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent transition-opacity duration-300">
            <div className="absolute  bottom-10 left-0 right-0 p-4 space-y-3">
              <p className="text-white font-bold text-sm line-clamp-3">{book.description}</p>
              <Button
                size="sm"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setShowDetails(true)}
              >
                <Info className="size-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        )}

          {/* Mobile Info Button */}
          <div className="sm:hidden absolute bottom-4 right-4">
            <Button size="sm" onClick={() => setShowDetails(true)}>
              <Info className="size-4 mr-2" />
              Details
            </Button>
          </div>

        </div>

        {/* Book Info */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="text-white line-clamp-1">{book.title}</h3>
            <p className="text-purple-300 text-sm">{book.author}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="size-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm">{book.rating}</span>
            </div>
            <Badge variant="outline" className="border-purple-500/30 text-purple-300">
              {book.genre}
            </Badge>
          </div>
        </div>
      </div>

      {/* Book Details Modal */}
      <BookDetailModal
        book={book}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
