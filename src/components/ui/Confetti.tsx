
import React, { useState, useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
}

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  
  const colors = ['#D3E4FD', '#F2FCE2', '#FDE1D3', '#E5DEFF'];

  useEffect(() => {
    // Generate random confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // random position across width
        delay: Math.random() * 1, // random delay for animation start
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.5 + 0.5 // random size between 0.5 and 1
      });
    }
    setConfettiPieces(pieces);
    
    // Hide after duration
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, colors]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: '-5%',
            width: `${piece.size}rem`,
            height: `${piece.size}rem`,
            backgroundColor: piece.color,
            borderRadius: '50%',
            animationDelay: `${piece.delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Confetti;
