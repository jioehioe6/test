import { Calendar } from "./Calendar";

interface SidebarProps {
  tasks: Array<{ id: string; completed: boolean }>;
  lists: Array<{ name: string; count: number }>;
}

export const Sidebar = ({ tasks, lists }: SidebarProps) => {
  const todayTasksCount = tasks.length;
  
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col hidden lg:flex">
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
  );
};