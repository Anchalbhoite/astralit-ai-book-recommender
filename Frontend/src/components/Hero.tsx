import { Button } from './ui/button';
import { Sparkles, TrendingUp, Brain, Star } from 'lucide-react';

interface HeroProps {
  onGetRecommendations?: () => void;
  onExploreTrending?: () => void;
}

export function Hero({ onGetRecommendations, onExploreTrending }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
          <Sparkles className="size-4 text-purple-400" />
          <span className="text-purple-300 text-sm">AI-Powered Book Discovery</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl tracking-tight px-4">
          Discover the books written in{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            your stars
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-purple-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Let our advanced AI constellation guide you to your next favorite read. 
          Personalized recommendations powered by cutting-edge machine learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Button 
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            onClick={() => {
              scrollToSection('ai-recommendations');
              onGetRecommendations?.();
            }}
          >
            <Brain className="size-5 mr-2" />
            Get AI Recommendations
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            onClick={() => {
              scrollToSection('trending-books');
              onExploreTrending?.();
            }}
          >
            <TrendingUp className="size-5 mr-2" />
            Explore Trending
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 max-w-2xl mx-auto px-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl">10M+</div>
            <div className="text-purple-300 text-xs sm:text-sm">Books Analyzed</div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl">98%</div>
            <div className="text-purple-300 text-xs sm:text-sm">Match Accuracy</div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl">500K+</div>
            <div className="text-purple-300 text-xs sm:text-sm">Happy Readers</div>
          </div>
        </div>
      </div>
    </section>
  );
}