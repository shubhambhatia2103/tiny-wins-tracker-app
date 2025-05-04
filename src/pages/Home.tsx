
import React, { useState, useEffect } from 'react';
import { useHabits } from '@/context/HabitsContext';
import HabitCard from '@/components/habits/HabitCard';
import AddHabitForm from '@/components/habits/AddHabitForm';
import { Button } from '@/components/ui/button';
import FullCompletionCelebration from '@/components/ui/FullCompletionCelebration';
import { Calendar, Award, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const { todaysHabits, addHabit, toggleHabit, resetTodaysHabits } = useHabits();
  const [showCelebration, setShowCelebration] = useState(false);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const maxHabitsReached = todaysHabits.length >= 3;
  const allCompleted = todaysHabits.length > 0 && todaysHabits.every(h => h.completed);
  const completedCount = todaysHabits.filter(h => h.completed).length;
  const progress = todaysHabits.length > 0 ? (completedCount / todaysHabits.length) * 100 : 0;

  // Check if all habits are complete and trigger celebration
  useEffect(() => {
    if (todaysHabits.length === 3 && allCompleted) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [todaysHabits, allCompleted]);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-slide-up px-2">
      <FullCompletionCelebration show={showCelebration} />
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center mb-2">
          <Calendar className="w-5 h-5 mr-2 text-nature-leaf" />
          <p className="text-lg text-nature-moss">{today}</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Your Tiny Wins</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Focus on three small achievements that make a big difference
        </p>
        
        {todaysHabits.length > 0 && (
          <div className="mt-5 max-w-xs mx-auto">
            <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-in-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {completedCount}/{todaysHabits.length} completed
            </p>
          </div>
        )}
      </div>
      
      <div className="habits-container">
        {todaysHabits.map((habit, index) => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onToggle={toggleHabit}
            index={index}
          />
        ))}
        
        {!maxHabitsReached && (
          <AddHabitForm 
            onAddHabit={addHabit} 
            disabled={maxHabitsReached}
          />
        )}
      </div>
      
      {allCompleted && todaysHabits.length === 3 && (
        <div className="text-center mt-6 bg-white/40 backdrop-blur-sm p-6 rounded-2xl max-w-md mx-auto eco-shadow">
          <div className="inline-flex items-center justify-center mb-3">
            <Award className="w-6 h-6 mr-2 text-nature-blossom" />
            <h3 className="text-xl font-semibold text-nature-moss">All done today!</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            You've completed all your tiny wins for today. Great job taking these small steps towards your goals!
          </p>
          <div className="flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-nature-sunlight" />
            <span className="text-sm font-medium">Come back tomorrow for more wins</span>
            <Sparkles className="w-4 h-4 text-nature-sunlight" />
          </div>
        </div>
      )}
      
      {todaysHabits.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={resetTodaysHabits}
            className="text-sm hover-lift"
          >
            Reset Today's Habits
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
