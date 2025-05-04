
import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, Star } from 'lucide-react';
import { DailyHabits } from '@/models/habit';

interface StreakTrackerProps {
  historyHabits: DailyHabits[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ historyHabits }) => {
  // Calculate current streak
  const calculateStreaks = () => {
    if (historyHabits.length === 0) return { currentStreak: 0, longestStreak: 0 };
    
    // Sort by date (newest first)
    const sortedHistory = [...historyHabits].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let streakActive = true;
    let previousDate: Date | null = null;
    
    for (const entry of sortedHistory) {
      // Check if all habits are completed for this day
      const allCompleted = entry.habits.length > 0 && entry.habits.every(h => h.completed);
      
      // If not all habits completed, streak is broken
      if (!allCompleted) {
        streakActive = false;
        continue;
      }
      
      const entryDate = new Date(entry.date);
      
      // For the first entry
      if (previousDate === null) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if the entry is from today or yesterday to continue the streak
        const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
          // If the most recent entry is older than yesterday, streak is broken
          streakActive = false;
        }
        
        if (streakActive) {
          currentStreak = 1;
          longestStreak = Math.max(longestStreak, currentStreak);
        }
      } else {
        // Check if this entry is consecutive to the previous one
        const diffDays = Math.floor((previousDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1 && streakActive) {
          // Days are consecutive
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else if (diffDays > 1) {
          // Streak is broken
          streakActive = false;
        }
      }
      
      previousDate = entryDate;
    }
    
    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks();

  return (
    <Card className="p-6 mb-8 bg-gradient-to-r from-tinyWins-purple/50 to-tinyWins-blue/50 border-none shadow-md font-aguila animate-fade-in">
      <h3 className="text-xl font-medium text-center mb-4">Your Winning Streak</h3>
      
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Award size={40} className="text-primary mb-2" />
            {currentStreak > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {currentStreak}
              </div>
            )}
          </div>
          <p className="text-sm font-medium">Current Streak</p>
          <p className="text-2xl font-bold">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative">
            <Star size={40} className="text-yellow-500 mb-2" />
            {longestStreak > 0 && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {longestStreak}
              </div>
            )}
          </div>
          <p className="text-sm font-medium">Longest Streak</p>
          <p className="text-2xl font-bold">{longestStreak} {longestStreak === 1 ? 'day' : 'days'}</p>
        </div>
      </div>
    </Card>
  );
};

export default StreakTracker;
