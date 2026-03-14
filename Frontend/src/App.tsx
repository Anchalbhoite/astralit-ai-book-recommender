// Frontend/src/App.tsx
import { useState } from 'react';
import { Header } from './components/Header';
import { AnimatedHero } from './components/AnimatedHero';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { AIRecommendations } from './components/AIRecommendations';
import { BookGrid } from './components/BookGrid';
import { TrendingBooks } from './components/TrendingBooks';
import { ReadingStats } from './components/ReadingStats';
import { AIChat } from './components/AIChat';
import { ReadingList } from './components/ReadingList';
import { PreferencesQuiz } from './components/PreferencesQuiz';
import { LoginModal } from './components/Auth/LoginModal';
import { RegisterModal } from './components/Auth/RegisterModal';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';


export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [showReadingList, setShowReadingList] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);


  // ✅ Search State
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleGetStarted = () => {
  setIsQuizOpen(true);
};


  const handleExplore = () => {
    const booksSection = document.getElementById('trending-books');
    booksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">

      {/* Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="relative z-10">
        
        {/* HEADER WITH SEARCH */}
        <Header 
          onOpenChat={() => setShowChat(true)} 
          onOpenReadingList={() => setShowReadingList(true)}
          onOpenLogin={() => setShowLogin(true)}
          onSearch={handleSearch}          // ⭐ IMPORTANT
        />

        <AnimatedHero 
          onGetStarted={handleGetStarted}
          onExplore={handleExplore}
        />
        <PreferencesQuiz 
  isOpen={isQuizOpen}
  onClose={() => setIsQuizOpen(false)}
/>


        <FeaturedCarousel />
        <ReadingStats />
        <AIRecommendations />
        <TrendingBooks />

        {/* ⭐ BOOK GRID FILTERED BY SEARCH */}
        <BookGrid searchQuery={searchQuery} />

        <Footer />
      </div>

      {/* SIDEBARS & MODALS */}
      {showChat && <AIChat onClose={() => setShowChat(false)} />}
      {showReadingList && <ReadingList onClose={() => setShowReadingList(false)} />}
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <Toaster position="top-center" theme="dark" />
    </div>
  );
}
