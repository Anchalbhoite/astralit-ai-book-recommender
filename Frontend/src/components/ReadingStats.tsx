import { BookOpen, Target, TrendingUp, Award, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { getReadingList } from '../data/mockData';
import { useEffect, useState } from 'react';

interface Stats {
  booksRead: number;
  currentlyReading: number;
  monthlyGoal: number;
  streak: number;
  favoriteGenre: string;
}

export function ReadingStats() {
  const [stats, setStats] = useState<Stats>({
    booksRead: 0,
    currentlyReading: 0,
    monthlyGoal: 5,
    streak: 0,
    favoriteGenre: 'Fiction'
  });

  useEffect(() => {
    const readingList = getReadingList();
    setStats({
      booksRead: readingList.length,
      currentlyReading: Math.min(readingList.length, 3),
      monthlyGoal: 5,
      streak: 7,
      favoriteGenre: 'Fiction'
    });
  }, []);

  const progress = (stats.booksRead / stats.monthlyGoal) * 100;

  const statCards = [
    {
      icon: BookOpen,
      label: 'Books in List',
      value: stats.booksRead,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-500/10',
      delay: 0
    },
    {
      icon: Target,
      label: 'Monthly Goal',
      value: `${Math.min(stats.booksRead, stats.monthlyGoal)}/${stats.monthlyGoal}`,
      color: 'from-pink-600 to-pink-400',
      bgColor: 'bg-pink-500/10',
      delay: 0.1
    },
    {
      icon: TrendingUp,
      label: 'Reading Streak',
      value: `${stats.streak} days`,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-500/10',
      delay: 0.2
    },
    {
      icon: Award,
      label: 'Top Genre',
      value: stats.favoriteGenre,
      color: 'from-amber-600 to-amber-400',
      bgColor: 'bg-amber-500/10',
      delay: 0.3
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h2 className="text-white text-3xl">Your Reading Journey</h2>
          <p className="text-purple-300">Track your progress and achievements</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
            >
              <Card className={`${stat.bgColor} border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-300 text-sm">{stat.label}</p>
                    <p className="text-white text-2xl mt-1">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-900/50 border-purple-500/20 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-purple-400" />
                  <span className="text-white">Monthly Progress</span>
                </div>
                <span className="text-purple-300 text-sm">{Math.round(progress)}%</span>
              </div>
              
              <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                />
              </div>
              
              <p className="text-purple-400 text-sm">
                {stats.booksRead >= stats.monthlyGoal
                  ? '🎉 Amazing! You\'ve reached your monthly goal!'
                  : `${stats.monthlyGoal - stats.booksRead} more book${stats.monthlyGoal - stats.booksRead === 1 ? '' : 's'} to reach your goal`}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
