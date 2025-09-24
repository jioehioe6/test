import { Moon, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileSidebar } from "./MobileSidebar";

interface HeaderProps {
  tasks?: Array<{ id: string; completed: boolean }>;
  lists?: Array<{ name: string; count: number }>;
  showMobileMenu?: boolean;
}

export const Header = ({ tasks = [], lists = [], showMobileMenu = true }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex items-center space-x-4">
        {showMobileMenu && (
          <MobileSidebar tasks={tasks} lists={lists} />
        )}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Listify</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Moon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" alt="User" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};