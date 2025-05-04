
import React from 'react';
import { useHabits } from '@/context/HabitsContext';
import { Card } from '@/components/ui/card';
import { Check, Calendar, Award, Star } from 'lucide-react';
import StreakTracker from '@/components/habits/StreakTracker';
import { Separator } from '@/components/ui/separator';

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slide-up px-2">
      <div className="text-center">
        <div className="inline-flex items-center justify-center mb-1">
          <Calendar className="w-5 h-5 mr-2 text-nature-leaf" />
          <h2 className="text-3xl font-bold">Your Journey</h2>
        </div>
        <p className="text-muted-foreground mt-2">Track your progress over time</p>
      </div>
      
      <Card className="p-6 bg-white/40 backdrop-blur-sm eco-shadow border border-white/30">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-5 h-5 text-nature-sunset" />
          <h3 className="text-lg font-medium">Your Streak</h3>
        </div>
        <StreakTracker historyHabits={historyHabits} />
      </Card>
      
      {sortedHistory.length === 0 ? (
        <Card className="p-8 text-center bg-white/40 backdrop-blur-sm eco-shadow border border-white/30">
          <Star className="w-8 h-8 text-nature-sunlight mx-auto mb-3 animate-pulse-gentle" />
          <p className="text-muted-foreground">No history yet. Start adding some tiny wins!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedHistory.map((dailyEntry) => (
            <Card key={dailyEntry.date} className="overflow-hidden animate-fade-in bg-white/40 backdrop-blur-sm eco-shadow border border-white/30">
              <div className="bg-gradient-to-r from-nature-sky/30 to-transparent py-3 px-6">
                <h3 className="font-medium">{formatDate(dailyEntry.date)}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {dailyEntry.habits.map((habit) => (
                    <li key={habit.id} className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
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
                
                <Separator className="my-4 bg-muted/50" />
                
                <div className="text-sm text-right flex justify-between items-center">
                  <div className="h-1.5 w-16 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(dailyEntry.habits.filter(h => h.completed).length / dailyEntry.habits.length) * 100}%` }}
                    ></div>
                  </div>
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
