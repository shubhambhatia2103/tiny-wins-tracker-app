
import React from 'react';

const BackgroundDoodles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left doodle */}
      <div className="absolute top-10 left-10 w-24 h-24 opacity-10 animate-float">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 C70,10 80,30 80,50 C80,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <path d="M30,40 Q50,20 70,40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Top right star */}
      <div className="absolute top-20 right-20 w-16 h-16 opacity-10 animate-pulse-gentle">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 L63,40 L95,40 L70,60 L80,90 L50,75 L20,90 L30,60 L5,40 L37,40 L50,10 Z" 
            stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      {/* Bottom left wave */}
      <div className="absolute bottom-20 left-30 w-32 h-16 opacity-10 animate-float">
        <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,25 C10,10 20,40 30,25 C40,10 50,40 60,25 C70,10 80,40 90,25 C100,10 110,40 120,25" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Bottom right circles */}
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-10 animate-rotate-slow">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      {/* Center right leaf */}
      <div className="absolute top-1/2 right-5 w-20 h-20 opacity-10 animate-float">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 C80,10 80,50 50,50 C80,50 80,90 50,90 C20,90 20,50 50,50 C20,50 20,10 50,10 Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundDoodles;
