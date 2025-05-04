
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MacNavBar: React.FC = () => {
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const navItems = [
    { path: '/', icon: Home, label: 'Today' },
    { path: '/history', icon: Calendar, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const getActiveIndex = () => {
    return navItems.findIndex((item) => item.path === location.pathname);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/85 backdrop-blur-xl px-3 py-2 rounded-2xl shadow-lg border border-white/20 eco-shadow">
        <motion.div className="flex items-center gap-1 relative">
          {/* Background Indicator */}
          <motion.div 
            className="absolute h-10 rounded-xl bg-secondary/40 z-0"
            initial={false}
            animate={{ 
              width: hoverIndex !== null ? '5.5rem' : '5rem',
              x: (hoverIndex !== null ? hoverIndex : getActiveIndex()) * 5.5 + 'rem',
              opacity: 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />

          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative z-10 flex flex-col items-center justify-center min-w-[5.5rem] h-14 px-4 rounded-xl"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    y: isActive ? -5 : 0,
                    scale: isActive ? 1.1 : hoverIndex === index ? 1.05 : 1
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="relative flex flex-col items-center"
                >
                  <Icon 
                    size={20} 
                    className={`transition-colors ${isActive ? 'text-nature-moss' : 'text-muted-foreground'}`}
                  />
                  <motion.span 
                    className={`text-xs font-medium mt-1 transition-colors ${isActive ? 'text-nature-moss' : 'text-muted-foreground'}`}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-primary"
                      layoutId="nav-dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 blur-md bg-nature-leaf/5 rounded-xl pointer-events-none"
            initial={false}
            animate={{ 
              x: (hoverIndex !== null ? hoverIndex : getActiveIndex()) * 5.5 + 'rem',
              opacity: 0.5
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MacNavBar;
