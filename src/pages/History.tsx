
import React from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const History: React.FC = () => {
  const { historyHabits } = useHabits();
  
  // Sort habits by date (newest first)
  const sortedHistory = [...historyHabits].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your History</h2>
        <p className="text-muted-foreground mt-2">Track your progress over time</p>
      </div>
      
      {sortedHistory.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No history yet. Start adding some tiny wins!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedHistory.map((dailyEntry) => (
            <Card key={dailyEntry.date} className="overflow-hidden animate-fade-in">
              <div className="bg-muted py-3 px-6">
                <h3 className="font-medium">{formatDate(dailyEntry.date)}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {dailyEntry.habits.map((habit) => (
                    <li key={habit.id} className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        habit.completed ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        {habit.completed && <Check className="w-4 h-4" />}
                      </span>
                      <span className={habit.completed ? 'font-medium' : 'text-muted-foreground'}>
                        {habit.title}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 text-sm text-right">
                  <span className="text-muted-foreground">
                    Completed: {dailyEntry.habits.filter(h => h.completed).length}/{dailyEntry.habits.length}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
