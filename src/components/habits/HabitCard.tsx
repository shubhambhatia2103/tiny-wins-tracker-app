
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Habit } from '@/models/habit';
import Confetti from '@/components/ui/Confetti';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => Promise<boolean>;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleToggle = async () => {
    const wasCompleted = await onToggle(habit.id);
    if (wasCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  // Determine color based on habit index/id to add variety
  const colors = ['bg-tinyWins-blue', 'bg-tinyWins-green', 'bg-tinyWins-peach'];
  const colorIndex = parseInt(habit.id.slice(-1), 10) % colors.length;
  const cardColor = colors[colorIndex];

  return (
    <>
      {showConfetti && <Confetti />}
      <Card className={`${cardColor} border-none shadow-sm hover:shadow-md transition-all duration-300 animate-scale-up`}>
        <div className="p-6 flex flex-col items-center text-center">
          <h3 className="font-medium text-lg mb-4">{habit.title}</h3>
          
          <Button 
            onClick={handleToggle}
            variant={habit.completed ? "default" : "outline"}
            size="lg"
            className={`rounded-full w-16 h-16 transition-all ${
              habit.completed ? 'bg-primary text-primary-foreground animate-pulse-gentle' : 'bg-white/50 hover:bg-white/80'
            }`}
          >
            <Check className={`w-6 h-6 ${habit.completed ? 'text-white' : 'text-gray-400'}`} />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            {habit.completed ? 'Completed' : 'Mark as complete'}
          </p>
        </div>
      </Card>
    </>
  );
};

export default HabitCard;
