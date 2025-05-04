
import React, { useState } from 'react';
import { Check, Star, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Habit } from '@/models/habit';
import Confetti from '@/components/ui/Confetti';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => Promise<boolean>;
  index: number;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, index }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const handleToggle = async () => {
    setIsPressed(true);
    const wasCompleted = await onToggle(habit.id);
    
    if (wasCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    setTimeout(() => setIsPressed(false), 200);
  };
  
  // Determine color based on habit index for more variety
  const getBgStyle = (index: number) => {
    const themes = [
      'bg-gradient-to-br from-nature-sky/40 to-nature-leaf/20 border-nature-leaf/20',
      'bg-gradient-to-br from-nature-sunset/40 to-nature-sunlight/20 border-nature-sunset/20',
      'bg-gradient-to-br from-accent/40 to-secondary/20 border-accent/20'
    ];
    
    return themes[index % themes.length];
  };

  const getIconStyle = (index: number) => {
    const themes = [
      'text-nature-leaf',
      'text-nature-sunset', 
      'text-primary'
    ];
    
    return themes[index % themes.length];
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <Card 
        className={`card-glass border ${getBgStyle(index)} eco-shadow hover-lift transition-all duration-300 ${
          isPressed ? 'scale-95' : ''
        }`}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className={`w-10 h-10 rounded-full mb-4 flex items-center justify-center ${getIconStyle(index)} bg-white/50`}>
            {index === 0 && <Star className="w-5 h-5" />}
            {index === 1 && <Sparkles className="w-5 h-5" />}
            {index === 2 && <Check className="w-5 h-5" />}
          </div>
          
          <h3 className="font-semibold text-lg mb-6 text-foreground">{habit.title}</h3>
          
          <Button 
            onClick={handleToggle}
            variant={habit.completed ? "default" : "outline"}
            size="lg"
            className={`rounded-full w-16 h-16 transition-all duration-300 ${
              habit.completed ? 'bg-primary text-primary-foreground animate-pulse-soft eco-shadow' : 
              'bg-white/70 hover:bg-white/90 border-2'
            }`}
          >
            <Check className={`w-6 h-6 transition-transform ${habit.completed ? 'text-white scale-125' : 'text-muted-foreground'}`} />
          </Button>
          
          <p className={`text-sm mt-5 ${habit.completed ? 'text-nature-moss font-medium' : 'text-muted-foreground'}`}>
            {habit.completed ? 'Completed' : 'Tap to complete'}
          </p>
        </div>
      </Card>
    </>
  );
};

export default HabitCard;
