import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { BookCard } from './BookCard';
import { useState } from 'react';
import { getAIRecommendations } from '../data/mockData';

export function AIRecommendations() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [books, setBooks] = useState(getAIRecommendations(undefined, 4));

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call - in production, this will call your Spring backend
    setTimeout(() => {
      setBooks(getAIRecommendations(undefined, 4));
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section id="ai-recommendations" className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-purple-400" />
              <h2 className="text-white text-3xl">AI Recommendations For You</h2>
            </div>
            <p className="text-purple-300">
              Curated by our AI based on your reading preferences and behavior
            </p>
          </div>
          <Button 
            onClick={handleRefresh}
            className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30"
          >
            <RefreshCw className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* AI Match Indicator */}
        <div className="flex items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <Sparkles className="size-5 text-purple-400" />
          <span className="text-purple-200">
            These recommendations have a <strong className="text-white">92%+ AI match score</strong> with your profile
          </span>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} showAIMatch />
          ))}
        </div>
      </div>
    </section>
  );
}