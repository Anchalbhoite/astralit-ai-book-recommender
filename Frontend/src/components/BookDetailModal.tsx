// src/components/BookDetailModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, BookmarkPlus, ExternalLink, Sparkles, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
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

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!book) return null;

  // Generate Amazon search link for the book
  const amazonLink = `https://www.amazon.in/s?k=${encodeURIComponent(book.title + ' ' + book.author + ' book')}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: book.title,
          text: `Check out "${book.title}" by ${book.author} on AstraLit!`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled the share or there was an error
      if (error instanceof Error && error.name !== 'AbortError') {
        // If not cancelled, try clipboard fallback
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
        } catch (clipboardError) {
          toast.error('Unable to share or copy link');
        }
      }
    }
  };

  return (
    <Dialog 
    
  open={isOpen} 
  onOpenChange={(open: boolean) => {
    if (!open) onClose();
    }}>

  <DialogContent 
    
    className="backdrop-blur-lg max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-purple-500/30 text-white p-4 sm:p-6"
  >

        <DialogHeader>
          <DialogTitle className="sr-only">{book.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Details about {book.title} by {book.author}. Rating: {book.rating}/5. Genre: {book.genre}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="relative aspect-[2/3] max-w-sm mx-auto md:max-w-none rounded-lg overflow-hidden bg-slate-900 shadow-2xl">
              <ImageWithFallback
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {book.aiMatch && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm">
                  <Sparkles className="size-4" />
                  <span>{book.aiMatch}% AI Match</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsSaved(!isSaved)}
                variant="outline"
                className={`flex-1 ${
                  isSaved 
                    ? 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700' 
                    : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                }`}
              >
                <BookmarkPlus className="size-4 mr-2" />
                {isSaved ? 'Saved' : 'Save to List'}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
              >
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl text-white">{book.title}</h2>
              <p className="text-lg sm:text-xl text-purple-300">{book.author}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="size-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{book.rating}</span>
                  <span className="text-purple-300 text-sm">/5</span>
                </div>
                <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                  {book.genre}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg text-white">Synopsis</h3>
              <p className="text-purple-200 leading-relaxed text-sm sm:text-base">{book.description}</p>
              <p className="text-purple-200 leading-relaxed text-sm sm:text-base">
                This compelling narrative takes readers on an unforgettable journey through themes of identity, 
                purpose, and human connection. With masterful storytelling and richly drawn characters, 
                this book has captivated millions of readers worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg text-white">Why You'll Love It</h3>
              <ul className="space-y-2 text-purple-200 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Engaging narrative that keeps you turning pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Thought-provoking themes and deep character development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Perfect for fans of {book.genre.toLowerCase()} literature</span>
                </li>
              </ul>
            </div>

            {/* Purchase Button */}
            <div className="pt-4 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <a href={amazonLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-5 mr-2" />
                  Buy on Amazon
                </a>
              </Button>
              <p className="text-purple-300 text-xs text-center">
                Find the best deals on Amazon for this book
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}