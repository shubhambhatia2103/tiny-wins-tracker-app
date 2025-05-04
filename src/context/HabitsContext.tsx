
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, DailyHabits } from '../models/habit';

interface HabitsContextType {
  todaysHabits: Habit[];
  historyHabits: DailyHabits[];
  addHabit: (title: string) => void;
  toggleHabit: (id: string) => Promise<boolean>;
  resetTodaysHabits: () => void;
  isLoading: boolean;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todaysHabits, setTodaysHabits] = useState<Habit[]>([]);
  const [historyHabits, setHistoryHabits] = useState<DailyHabits[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from localStorage on mount
  useEffect(() => {
    const loadHabits = () => {
      try {
        const today = formatDate(new Date());
        
        // Load history
        const savedHistory = localStorage.getItem('tinyWins_history');
        const parsedHistory: DailyHabits[] = savedHistory ? JSON.parse(savedHistory) : [];
        setHistoryHabits(parsedHistory);
        
        // Check if we have habits for today
        const todayEntry = parsedHistory.find(entry => entry.date === today);
        
        if (todayEntry) {
          setTodaysHabits(todayEntry.habits);
        } else {
          // If no habits for today, initialize with empty array
          setTodaysHabits([]);
        }
      } catch (error) {
        console.error('Failed to load habits:', error);
        setTodaysHabits([]);
        setHistoryHabits([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, []);

  // Save habits to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      const today = formatDate(new Date());
      const newHistory = historyHabits.filter(entry => entry.date !== today);
      
      if (todaysHabits.length > 0) {
        newHistory.push({ date: today, habits: todaysHabits });
      }
      
      localStorage.setItem('tinyWins_history', JSON.stringify(newHistory));
      setHistoryHabits(newHistory);
    }
  }, [todaysHabits, isLoading]);

  const addHabit = (title: string) => {
    if (todaysHabits.length >= 3) {
      return; // Max 3 habits per day
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodaysHabits(prev => [...prev, newHabit]);
  };

  const toggleHabit = async (id: string): Promise<boolean> => {
    let wasCompleted = false;
    
    setTodaysHabits(prev => 
      prev.map(habit => {
        if (habit.id === id) {
          // Only track "completing" events (false -> true)
          if (!habit.completed) {
            wasCompleted = true;
          }
          return { ...habit, completed: !habit.completed };
        }
        return habit;
      })
    );
    
    return wasCompleted;
  };

  const resetTodaysHabits = () => {
    setTodaysHabits([]);
  };

  return (
    <HabitsContext.Provider value={{
      todaysHabits,
      historyHabits,
      addHabit,
      toggleHabit,
      resetTodaysHabits,
      isLoading
    }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};
