
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
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
      <Card className="bg-tinyWins-gray border-none shadow-sm p-6 flex flex-col items-center justify-center text-center animate-fade-in">
        <p className="text-muted-foreground">Maximum 3 habits per day</p>
      </Card>
    );
  }

  return (
    <Card className="bg-tinyWins-gray border-none shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="p-6">
        {!isExpanded ? (
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2 h-20"
            onClick={() => setIsExpanded(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Add a new habit</span>
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-medium">New Tiny Win</h3>
            <Input
              type="text"
              placeholder="What's your tiny win for today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              autoFocus
              maxLength={50}
            />
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!title.trim()}
              >
                Add
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};

export default AddHabitForm;
