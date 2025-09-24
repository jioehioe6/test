import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "./Calendar";

interface MobileSidebarProps {
  tasks: Array<{ id: string; completed: boolean }>;
  lists: Array<{ name: string; count: number }>;
}

export const MobileSidebar = ({ tasks, lists }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const todayTasksCount = tasks.length;

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-card">
          <div className="flex flex-col h-full">
            <Calendar />
            
            <div className="px-4 py-6 space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-3">Tasks</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted transition-colors cursor-pointer">
                    <span className="text-sm text-foreground">Today</span>
                    <span className="text-sm font-medium text-primary">{todayTasksCount}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-3">Lists</h3>
                <div className="space-y-2">
                  {lists.map((list) => (
                    <div 
                      key={list.name}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-foreground">{list.name}</span>
                      <span className="text-sm font-medium text-muted-foreground">{list.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};