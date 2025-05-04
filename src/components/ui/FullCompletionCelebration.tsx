
import React, { useEffect, useState } from 'react';
import { Star, Award } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import Confetti from '@/components/ui/Confetti';

interface FullCompletionCelebrationProps {
  show: boolean;
}

const FullCompletionCelebration: React.FC<FullCompletionCelebrationProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      toast("All done for today!", {
        description: "You've completed all your tiny wins! Great job!",
        duration: 5000,
      });
      
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <div className="animate-scale-up bg-white/50 backdrop-blur-md rounded-full p-10">
          <div className="relative animate-pulse-gentle">
            <Award size={80} className="text-primary" />
            <Star size={30} className="absolute -top-2 -right-2 text-yellow-400 animate-pulse-gentle" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FullCompletionCelebration;
