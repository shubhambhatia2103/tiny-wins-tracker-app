
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings, Sparkles } from 'lucide-react';
import BackgroundDoodles from '../ui/BackgroundDoodles';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 
      'bg-primary text-primary-foreground' : 
      'text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors';
  };

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

      <main className="flex-1 py-8 px-6 relative z-10">
        <Outlet />
      </main>

      <footer className="py-6 px-6 relative z-10">
        <nav className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 eco-shadow">
          <ul className="flex justify-between items-center">
            <li>
              <Link 
                to="/" 
                className={`flex flex-col items-center p-3 rounded-full transition-all duration-300 ${isActive('/')}`}
              >
                <Home size={22} />
                <span className="text-xs mt-1">Today</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex flex-col items-center p-3 rounded-full transition-all duration-300 ${isActive('/history')}`}
              >
                <Calendar size={22} />
                <span className="text-xs mt-1">History</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`flex flex-col items-center p-3 rounded-full transition-all duration-300 ${isActive('/settings')}`}
              >
                <Settings size={22} />
                <span className="text-xs mt-1">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default MainLayout;
