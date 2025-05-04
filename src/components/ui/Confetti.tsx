
import React, { useState, useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
  rotation: number;
}

interface ConfettiProps {
  duration?: number;
  density?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 3000, density = 50 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  
  const colors = [
    'rgba(78, 205, 196, 0.9)',  // nature-leaf
    'rgba(255, 230, 109, 0.9)', // nature-sunlight
    'rgba(255, 107, 107, 0.9)', // nature-blossom
    'rgba(169, 229, 239, 0.9)', // nature-sky
    'rgba(247, 249, 249, 0.9)', // nature-cloud
  ];
  
  const shapes = ['circle', 'square', 'triangle'];

  useEffect(() => {
    // Generate random confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < density; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // random position across width
        delay: Math.random() * 1, // random delay for animation start
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.8 + 0.4, // random size between 0.4 and 1.2rem
        shape: shapes[Math.floor(Math.random() * shapes.length)] as 'circle' | 'square' | 'triangle',
        rotation: Math.random() * 360, // random initial rotation
      });
    }
    setConfettiPieces(pieces);
    
    // Hide after duration
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, density, colors, shapes]);

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
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.shape === 'circle' && (
            <div 
              style={{
                width: `${piece.size}rem`,
                height: `${piece.size}rem`,
                backgroundColor: piece.color,
                borderRadius: '50%',
              }}
            />
          )}
          
          {piece.shape === 'square' && (
            <div 
              style={{
                width: `${piece.size}rem`,
                height: `${piece.size}rem`,
                backgroundColor: piece.color,
              }}
            />
          )}
          
          {piece.shape === 'triangle' && (
            <div 
              style={{
                width: 0,
                height: 0,
                borderLeft: `${piece.size/2}rem solid transparent`,
                borderRight: `${piece.size/2}rem solid transparent`,
                borderBottom: `${piece.size}rem solid ${piece.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
