
import React from 'react';

const BackgroundDoodles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left leaf pattern */}
      <div className="absolute -top-10 -left-10 w-64 h-64 opacity-10 animate-float">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,50 Q60,0 100,50 T180,50 Q140,100 180,150 T100,150 Q60,200 20,150 T20,50" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="rgba(78, 205, 196, 0.1)" />
        </svg>
      </div>
      
      {/* Top right bubble pattern */}
      <div className="absolute top-20 right-10 w-40 h-40 opacity-10 animate-pulse-gentle">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="20" fill="rgba(78, 205, 196, 0.2)" />
          <circle cx="70" cy="70" r="25" fill="rgba(78, 205, 196, 0.15)" />
          <circle cx="20" cy="70" r="10" fill="rgba(78, 205, 196, 0.1)" />
          <circle cx="80" cy="40" r="15" fill="rgba(78, 205, 196, 0.05)" />
        </svg>
      </div>
      
      {/* Bottom left wave pattern */}
      <div className="absolute bottom-40 -left-10 w-64 h-32 opacity-10 animate-float">
        <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-10,50 C20,20 40,80 70,50 C100,20 130,80 160,50 C190,20 220,80 250,50" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M-10,70 C20,40 40,100 70,70 C100,40 130,100 160,70 C190,40 220,100 250,70" 
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
      
      {/* Bottom right spiral */}
      <div className="absolute bottom-20 right-20 w-40 h-40 opacity-10 animate-rotate-slow">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 C70,10 85,25 85,50 C85,75 75,90 50,90 C25,90 15,75 15,50 C15,25 25,15 50,15 C75,15 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 C20,30 30,25 50,25 C70,25 75,35 75,50 C75,65 65,70 50,70 C35,70 30,65 30,50 C30,35 35,35 50,35 C65,35 65,40 65,50" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      
      {/* Center right curved line */}
      <div className="absolute top-1/2 right-5 w-32 h-64 opacity-10 animate-float" style={{ animationDelay: "-2s" }}>
        <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80,20 Q0,100 80,180" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="20" r="5" fill="rgba(78, 205, 196, 0.3)" />
          <circle cx="80" cy="180" r="5" fill="rgba(78, 205, 196, 0.3)" />
        </svg>
      </div>
      
      {/* Center left dotted pattern */}
      <div className="absolute top-1/3 left-10 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="40" cy="20" r="2" fill="currentColor" />
          <circle cx="60" cy="20" r="2" fill="currentColor" />
          <circle cx="80" cy="20" r="2" fill="currentColor" />
          <circle cx="20" cy="40" r="2" fill="currentColor" />
          <circle cx="40" cy="40" r="2" fill="currentColor" />
          <circle cx="60" cy="40" r="2" fill="currentColor" />
          <circle cx="80" cy="40" r="2" fill="currentColor" />
          <circle cx="20" cy="60" r="2" fill="currentColor" />
          <circle cx="40" cy="60" r="2" fill="currentColor" />
          <circle cx="60" cy="60" r="2" fill="currentColor" />
          <circle cx="80" cy="60" r="2" fill="currentColor" />
          <circle cx="20" cy="80" r="2" fill="currentColor" />
          <circle cx="40" cy="80" r="2" fill="currentColor" />
          <circle cx="60" cy="80" r="2" fill="currentColor" />
          <circle cx="80" cy="80" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundDoodles;
