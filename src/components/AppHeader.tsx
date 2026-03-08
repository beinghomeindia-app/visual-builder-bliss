import { User, Bell, BellDot, Info, Landmark, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NotificationService } from "@/api/notificationService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthService } from "@/api/auth";
import { toast } from "sonner";
import beingHomeLogo from "/beinghomelogo.jpeg";

const AppHeader = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await NotificationService.getNotifications(1, 1);
      if (response.success && response.data) {
        setUnreadCount(response.data.unread_count || 0);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo + App Name */}
        <div className="flex items-center gap-2.5">
          <img
            src={beingHomeLogo}
            alt="Being Home Logo"
            className="h-9 w-9 object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="text-base font-bold text-foreground tracking-tight">
            Being Home Foods
          </span>
        </div>

        {/* Right: Notifications, Profile */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/notifications")}
            className="relative p-2 hover:bg-accent"
          >
            {unreadCount > 0 ? (
              <BellDot className="w-5 h-5 text-primary" />
            ) : (
              <Bell className="w-5 h-5 text-foreground" />
            )}
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-accent"
              >
                <User className="w-5 h-5 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile?tab=recipes")}>
                <ChefHat className="w-4 h-4 mr-2" />
                My Recipes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-kitchen")}>
                <Landmark className="w-4 h-4 mr-2" />
                My Kitchen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/info")}>
                <Info className="w-4 h-4 mr-2" />
                About Us
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
