
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('09:00');
  
  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('tinyWins_settings');
    if (savedSettings) {
      const { notificationsEnabled, notificationTime } = JSON.parse(savedSettings);
      setNotificationsEnabled(notificationsEnabled || false);
      setNotificationTime(notificationTime || '09:00');
    }
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = { notificationsEnabled, notificationTime };
    localStorage.setItem('tinyWins_settings', JSON.stringify(settings));
  }, [notificationsEnabled, notificationTime]);
  
  const handleSave = () => {
    // In a real app, we'd register for actual notifications here
    // For now, just show a toast confirmation
    if (notificationsEnabled) {
      requestNotificationPermission();
    }
    
    toast.success('Settings saved', {
      description: notificationsEnabled 
        ? `You'll be reminded daily at ${notificationTime}` 
        : 'Notifications are disabled'
    });
  };
  
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">Customize your experience</p>
      </div>
      
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <span>Notification Settings</span>
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="font-medium">
              Daily Reminders
            </Label>
            <Switch 
              id="notifications" 
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          {notificationsEnabled && (
            <div className="space-y-2">
              <Label htmlFor="time">Reminder Time</Label>
              <Input 
                type="time" 
                id="time" 
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                We'll send you a reminder to check in with your tiny wins.
              </p>
            </div>
          )}
          
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-4">About Tiny Wins</h3>
        <p className="text-muted-foreground mb-2">
          Tiny Wins helps you build positive habits by focusing on just three small, achievable goals each day.
        </p>
        <p className="text-muted-foreground">
          By celebrating these small victories, you create momentum for bigger changes in your life.
        </p>
      </Card>
    </div>
  );
};

export default Settings;
