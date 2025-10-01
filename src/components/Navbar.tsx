import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, User, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
      <div className="max-w-[500px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold gradient-text text-xl">
            SmartBudget
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link to="/">
                <Home className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button
              variant={isActive("/chat") ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link to="/chat">
                <MessageSquare className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link to="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button
              variant={isActive("/profile") ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link to="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button
              variant={isActive("/login") ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link to="/login">
                <LogIn className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
