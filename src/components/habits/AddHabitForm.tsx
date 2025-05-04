
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, FlowerIcon, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AddHabitFormProps {
  onAddHabit: (title: string) => void;
  disabled?: boolean;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAddHabit, disabled }) => {
  const [title, setTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddHabit(title.trim());
      setTitle('');
      setIsExpanded(false);
    }
  };

  if (disabled) {
    return (
      <Card className="bg-white/30 backdrop-blur-sm border border-white/30 eco-shadow p-6 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted mb-4 border border-muted-foreground/10">
          <FlowerIcon className="w-5 h-5 text-nature-leaf" />
        </div>
        <p className="text-muted-foreground">You've reached your 3 tiny wins for today</p>
      </Card>
    );
  }

  return (
    <Card className="relative border border-secondary/50 backdrop-blur-md bg-white/30 overflow-hidden hover-lift eco-shadow animate-fade-in">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-nature-leaf via-nature-sunlight to-nature-sunset opacity-50"></div>
      <div className="p-6">
        {!isExpanded ? (
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 h-28 hover:bg-white/40"
            onClick={() => setIsExpanded(true)}
          >
            <Plus className="w-5 h-5 text-nature-leaf" />
            <span className="text-nature-moss">Add a new tiny win</span>
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-nature-sunlight mr-2" /> 
              <h3 className="font-medium text-nature-moss">New Tiny Win</h3>
            </div>
            
            <Input
              type="text"
              placeholder="What's your tiny win for today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/50 border-secondary/30 focus:border-primary focus:eco-shadow transition-all"
              autoFocus
              maxLength={50}
            />
            
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsExpanded(false)}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!title.trim()}
                className="text-sm"
              >
                Add Win
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};

export default AddHabitForm;
