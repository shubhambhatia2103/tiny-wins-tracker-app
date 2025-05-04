
import React, { useState, useEffect } from 'react';
import { useHabits } from '@/context/HabitsContext';
import HabitCard from '@/components/habits/HabitCard';
import AddHabitForm from '@/components/habits/AddHabitForm';
import { Button } from '@/components/ui/button';
import FullCompletionCelebration from '@/components/ui/FullCompletionCelebration';

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

  // Check if all habits are complete and trigger celebration
  useEffect(() => {
    if (todaysHabits.length === 3 && allCompleted) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [todaysHabits, allCompleted]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-slide-up">
      <FullCompletionCelebration show={showCelebration} />
      
      <div className="text-center">
        <h2 className="text-2xl font-bold">{today}</h2>
        <p className="text-muted-foreground mt-2">Focus on three tiny wins for today</p>
      </div>
      
      <div className="habits-container">
        {todaysHabits.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onToggle={toggleHabit}
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
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-primary mb-2">
            You completed all your tiny wins today!
          </p>
          <p className="text-muted-foreground mb-4">
            Great job! Come back tomorrow for more tiny wins.
          </p>
        </div>
      )}
      
      {todaysHabits.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={resetTodaysHabits}
            className="text-sm"
          >
            Reset Today's Habits
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
