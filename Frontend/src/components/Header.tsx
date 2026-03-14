import { Sparkles, MessageCircle, BookmarkCheck, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  onOpenChat: () => void;
  onOpenReadingList: () => void;
  onOpenLogin: () => void;
  onSearch: (query: string) => void; // <-- NEW PROP
}

export function Header({ onOpenChat, onOpenReadingList, onOpenLogin, onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="size-8 text-purple-400" />
            <div>
              <h1 className="text-white text-xl tracking-tight">AstraLit ✨</h1>
              <p className="text-purple-300 text-xs hidden sm:block">
                Discover the books written in your stars
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-300" />
              <Input 
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for books, authors, genres..." 
                className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
              />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onOpenChat}
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
            >
              <MessageCircle className="size-4 mr-2" />
              AI Assistant
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={onOpenReadingList}
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
            >
              <BookmarkCheck className="size-4 mr-2" />
              My List
            </Button>

            <Button 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={onOpenLogin}
            >
              <User className="size-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden text-purple-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-300" />
            <Input 
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search books..." 
              className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300/50"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-purple-500/20 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-purple-300 hover:bg-purple-500/10"
              onClick={onOpenChat}
            >
              <MessageCircle className="size-4 mr-2" />
              AI Assistant
            </Button>

            <Button 
              variant="ghost" 
              className="w-full justify-start text-purple-300 hover:bg-purple-500/10"
              onClick={onOpenReadingList}
            >
              <BookmarkCheck className="size-4 mr-2" />
              My List
            </Button>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              onClick={onOpenLogin}
            >
              <User className="size-4 mr-2" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
