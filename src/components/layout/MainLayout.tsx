
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import BackgroundDoodles from '../ui/BackgroundDoodles';
import MacNavBar from './MacNavBar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-aguila relative bg-gradient-to-br from-background to-secondary/20">
      <div className="fixed inset-0 bg-noise opacity-50 pointer-events-none"></div>
      <BackgroundDoodles />
      
      <header className="py-8 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center md:justify-start">
            <Sparkles className="w-6 h-6 text-nature-leaf mr-2 animate-pulse-soft" />
            <h1 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-nature-moss to-nature-leaf bg-clip-text text-transparent">Tiny Wins</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base text-center md:text-left mt-2">
            Track your micro habits, celebrate small victories
          </p>
        </div>
      </header>

      <main className="flex-1 py-8 px-6 relative z-10 mb-20">
        <Outlet />
      </main>

      <MacNavBar />
    </div>
  );
};

export default MainLayout;
