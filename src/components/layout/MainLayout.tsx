
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 
      'bg-primary text-primary-foreground' : 
      'text-muted-foreground hover:bg-muted transition-colors';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 border-b">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bold text-2xl text-center md:text-left">Tiny Wins</h1>
          <p className="text-muted-foreground text-sm text-center md:text-left">Track your micro habits, celebrate small victories</p>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <Outlet />
      </main>

      <footer className="py-4 px-4 border-t">
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
