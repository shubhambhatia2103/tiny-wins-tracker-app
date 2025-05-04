
export interface Habit {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface DailyHabits {
  date: string;
  habits: Habit[];
}
