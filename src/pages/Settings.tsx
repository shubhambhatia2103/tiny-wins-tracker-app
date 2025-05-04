
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Info, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

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
        : 'Notifications are disabled',
      icon: <Sparkles className="text-nature-leaf" />
    });
  };
  
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slide-up px-2">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">Customize your experience</p>
      </div>
      
      <Card className="p-6 bg-white/40 backdrop-blur-sm eco-shadow border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-nature-sunset" />
          <h3 className="font-medium text-lg">Notification Settings</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="font-medium">
                Daily Reminders
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get a gentle nudge to check in with your tiny wins
              </p>
            </div>
            <Switch 
              id="notifications" 
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              className="eco-shadow"
            />
          </div>
          
          {notificationsEnabled && (
            <div className="space-y-2 bg-white/50 p-4 rounded-xl border border-secondary/30">
              <Label htmlFor="time" className="text-sm">Reminder Time</Label>
              <Input 
                type="time" 
                id="time" 
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                className="bg-white/70 border-secondary/30"
              />
              <p className="text-xs text-muted-foreground">
                We'll send you a reminder to check in with your tiny wins.
              </p>
            </div>
          )}
          
          <Button onClick={handleSave} className="w-full hover-lift">
            Save Settings
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/40 backdrop-blur-sm eco-shadow border border-white/30">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-5 h-5 text-nature-leaf" />
          <h3 className="font-medium text-lg">About Tiny Wins</h3>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Tiny Wins helps you build positive habits by focusing on just three small, achievable goals each day.
        </p>
        
        <Separator className="my-4" />
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Sparkles className="w-4 h-4 text-nature-sunset" />
          <p className="text-sm text-nature-moss font-medium">
            By celebrating these small victories, you create momentum for bigger changes in your life.
          </p>
          <Sparkles className="w-4 h-4 text-nature-sunset" />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
