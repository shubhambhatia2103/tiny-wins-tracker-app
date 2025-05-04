
import React, { useEffect, useState } from 'react';
import { Award, Star, Sparkles } from 'lucide-react';
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
        icon: <Award className="w-5 h-5 text-nature-sunset" />,
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
        <div className="animate-scale-up bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md rounded-full p-12 eco-shadow">
          <div className="relative animate-pulse-soft">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nature-sunlight/30 to-nature-blossom/30 blur-lg"></div>
            <div className="relative">
              <Award size={80} className="text-nature-blossom" />
              <Star size={30} className="absolute -top-2 -right-2 text-nature-sunlight animate-pulse-soft" />
              <Sparkles size={24} className="absolute bottom-0 -left-2 text-nature-leaf animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullCompletionCelebration;
