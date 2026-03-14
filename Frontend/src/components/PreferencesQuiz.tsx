// Frontend/src/components/PreferencesQuiz.tsx
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent } from './ui/dialog';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { saveUserPreferences } from '../data/mockData';

interface PreferencesQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const genres = [
  { id: 'fiction', name: 'Fiction', emoji: '📚' },
  { id: 'scifi', name: 'Science Fiction', emoji: '🚀' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🧙' },
  { id: 'thriller', name: 'Thriller', emoji: '🔪' },
  { id: 'romance', name: 'Romance', emoji: '💕' },
  { id: 'selfhelp', name: 'Self-Help', emoji: '🌟' },
  { id: 'history', name: 'History', emoji: '📜' },
  { id: 'biography', name: 'Biography', emoji: '👤' },
  { id: 'business', name: 'Business', emoji: '💼' },
  { id: 'psychology', name: 'Psychology', emoji: '🧠' },
  { id: 'mystery', name: 'Mystery', emoji: '🔍' },
  { id: 'horror', name: 'Horror', emoji: '👻' }
];

const readingGoals = [
  { id: 'relax', name: 'Relax & Unwind', emoji: '😌' },
  { id: 'learn', name: 'Learn New Things', emoji: '🎓' },
  { id: 'escape', name: 'Escape Reality', emoji: '🌈' },
  { id: 'inspire', name: 'Get Inspired', emoji: '✨' },
  { id: 'improve', name: 'Self-Improvement', emoji: '📈' },
  { id: 'entertain', name: 'Entertainment', emoji: '🎭' }
];

const readingPace = [
  { id: 'light', name: 'Light Reader', subtitle: '1-2 books/month', emoji: '🌙' },
  { id: 'moderate', name: 'Moderate Reader', subtitle: '3-5 books/month', emoji: '📖' },
  { id: 'avid', name: 'Avid Reader', subtitle: '6+ books/month', emoji: '🔥' }
];

export function PreferencesQuiz({ isOpen, onClose }: PreferencesQuizProps) {
  const [step, setStep] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPace, setSelectedPace] = useState<string>('');

  const steps = [
    {
      title: 'What genres do you love?',
      subtitle: 'Select all that interest you',
      content: 'genres'
    },
    {
      title: 'What are your reading goals?',
      subtitle: 'Pick your main motivations',
      content: 'goals'
    },
    {
      title: 'How often do you read?',
      subtitle: 'Choose your reading pace',
      content: 'pace'
    }
  ];

  const toggleGenre = (genreId: string) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleFinish = () => {
    saveUserPreferences({
      favoriteGenres: selectedGenres,
      readingGoals: selectedGoals,
      preferredAuthors: [],
      dislikedGenres: []
    });
    
    toast.success('Preferences saved! Personalizing your experience... ✨');
    onClose();
  };

  const canProceed = () => {
    if (step === 0) return selectedGenres.length > 0;
    if (step === 1) return selectedGoals.length > 0;
    if (step === 2) return selectedPace !== '';
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-slate-950 border-purple-500/20 max-h-[90vh] overflow-y-auto">
        <div className="space-y-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-purple-400" />
              <h2 className="text-white text-2xl">Personalize Your Experience</h2>
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

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-300">Step {step + 1} of {steps.length}</span>
              <span className="text-purple-400">{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-white text-xl">{steps[step].title}</h3>
                <p className="text-purple-300">{steps[step].subtitle}</p>
              </div>

              {/* Step Content */}
              {steps[step].content === 'genres' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleGenre(genre.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedGenres.includes(genre.id)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="text-3xl mb-2">{genre.emoji}</div>
                      <div className="text-white text-sm">{genre.name}</div>
                      {selectedGenres.includes(genre.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <Check className="size-4 text-purple-400 mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {steps[step].content === 'goals' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {readingGoals.map((goal) => (
                    <motion.button
                      key={goal.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedGoals.includes(goal.id)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="text-3xl mb-2">{goal.emoji}</div>
                      <div className="text-white text-sm">{goal.name}</div>
                      {selectedGoals.includes(goal.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <Check className="size-4 text-purple-400 mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {steps[step].content === 'pace' && (
                <div className="grid grid-cols-1 gap-4">
                  {readingPace.map((pace) => (
                    <motion.button
                      key={pace.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPace(pace.id)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        selectedPace === pace.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{pace.emoji}</div>
                        <div className="flex-1">
                          <div className="text-white">{pace.name}</div>
                          <div className="text-purple-300 text-sm">{pace.subtitle}</div>
                        </div>
                        {selectedPace === pace.id && (
                          <Check className="size-6 text-purple-400" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Next
                <ArrowRight className="size-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Check className="size-4 mr-2" />
                Finish
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
