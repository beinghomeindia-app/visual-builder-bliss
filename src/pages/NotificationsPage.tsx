import { useState, useEffect } from "react";
import { Bell, Eye, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { NotificationService, type Notification } from "@/api/notificationService";
import { toast } from "sonner";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await NotificationService.getNotifications(1, 50);
      if (response.success && response.data) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unread_count || 0);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      const response = await NotificationService.markAsRead(notificationId);
      if (response.success) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        toast.success("Marked as read");
      }
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const handleDelete = async (notificationId: number) => {
    try {
      const response = await NotificationService.deleteNotification(notificationId);
      if (response.success) {
        const deleted = notifications.find(n => n.id === notificationId);
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        if (deleted && !deleted.is_read) setUnreadCount(prev => Math.max(0, prev - 1));
        toast.success("Notification deleted");
      }
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20">
      <AppHeader />

      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading notifications...</span>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card key={notification.id} className={!notification.is_read ? 'border-primary/50 bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{notification.title}</h4>
                        {!notification.is_read && <Badge variant="default" className="text-xs">New</Badge>}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.created_at).toLocaleDateString()} at {new Date(notification.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {!notification.is_read && (
                        <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)} className="p-2">
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(notification.id)} className="p-2 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default NotificationsPage;
