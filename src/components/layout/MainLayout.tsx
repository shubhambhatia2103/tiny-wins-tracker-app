
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';
import BackgroundDoodles from '../ui/BackgroundDoodles';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 
      'bg-primary text-primary-foreground' : 
      'text-muted-foreground hover:bg-muted transition-colors';
  };

  return (
    <div className="min-h-screen flex flex-col font-aguila relative">
      <BackgroundDoodles />
      
      <header className="py-6 px-4 border-b relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bold text-2xl text-center md:text-left">Tiny Wins</h1>
          <p className="text-muted-foreground text-sm text-center md:text-left">Track your micro habits, celebrate small victories</p>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 relative z-10">
        <Outlet />
      </main>

      <footer className="py-4 px-4 border-t relative z-10">
        <nav className="max-w-md mx-auto">
          <ul className="flex justify-between items-center">
            <li>
              <Link 
                to="/" 
                className={`flex flex-col items-center p-2 rounded-lg ${isActive('/')}`}
              >
                <Home size={24} />
                <span className="text-xs mt-1">Today</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex flex-col items-center p-2 rounded-lg ${isActive('/history')}`}
              >
                <Calendar size={24} />
                <span className="text-xs mt-1">History</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`flex flex-col items-center p-2 rounded-lg ${isActive('/settings')}`}
              >
                <Settings size={24} />
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
