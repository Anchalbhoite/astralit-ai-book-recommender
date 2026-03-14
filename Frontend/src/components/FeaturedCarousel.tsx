import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

export interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genre: string;
  aiMatch?: number;
  description: string;
  trending?: boolean;
}

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [direction, setDirection] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("http://localhost:4000/api/books?trending=true");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load featured books");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Update reading list status
  useEffect(() => {
    if (books.length > 0) {
      const list = JSON.parse(localStorage.getItem("readingList") || "[]");
      setIsSaved(list.includes(books[currentIndex]?._id));
    }
  }, [currentIndex, books]);

  // Auto slide
  useEffect(() => {
    if (books.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [books.length]);

  if (loading) {
    return <p className="text-center text-purple-300 py-16">Loading featured books…</p>;
  }

  if (!loading && books.length === 0) {
    return <p className="text-center text-red-300 py-16">No featured books found</p>;
  }

  const toggleReadingList = () => {
  const id = books[currentIndex]._id;
  let list: string[] = JSON.parse(localStorage.getItem("readingList") || "[]");

  if (list.includes(id)) {
    list = list.filter(x => x !== id);
    toast.success("Removed from reading list");
  } else {
    list.push(id);
    toast.success("Added to reading list");
  }

  localStorage.setItem("readingList", JSON.stringify(list));
  setIsSaved(list.includes(id));
};

const goPrevious = () => {
  setDirection(-1);
  setCurrentIndex(prev => (prev - 1 + books.length) % books.length);
};

const goNext = () => {
  setDirection(1);
  setCurrentIndex(prev => (prev + 1) % books.length);
};

  const book = books[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-purple-500/20">

        {/* Background */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover opacity-20 blur-2xl scale-110"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[500px] flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl">

            {/* Book Image */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative"
              >
                <div className="relative aspect-[2/3] max-w-xs mx-auto rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-500/30">
                  <ImageWithFallback src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Sparkles className="size-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Featured Book</span>
              </div>

              <h2 className="text-white text-4xl md:text-5xl">{book.title}</h2>
              <p className="text-purple-300 text-xl">by {book.author}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="size-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-lg">{book.rating}</span>
                </div>

                <span className="text-purple-300">{book.genre}</span>

                {book.aiMatch && (
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-purple-400" />
                    <span className="text-purple-300">{book.aiMatch}% match</span>
                  </div>
                )}
              </div>

              <p className="text-purple-200 text-lg leading-relaxed">{book.description}</p>

              <Button
                size="lg"
                onClick={toggleReadingList}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white ${
                  isSaved ? 'opacity-70' : ''
                }`}
              >
                <Sparkles className="size-5 mr-2" />
                {isSaved ? 'Saved' : 'Add to Reading List'}
              </Button>
            </motion.div>

          </div>
        </div>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <Button onClick={goPrevious} size="icon" variant="ghost"
            className="pointer-events-auto size-12 rounded-full bg-slate-900/80">
            <ChevronLeft className="size-6" />
          </Button>

          <Button onClick={goNext} size="icon" variant="ghost"
            className="pointer-events-auto size-12 rounded-full bg-slate-900/80">
            <ChevronRight className="size-6" />
          </Button>
        </div>

      </div>
    </section>
  );
}
