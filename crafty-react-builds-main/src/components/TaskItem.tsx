import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";


interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  color: "yellow" | "blue" | "green" | "purple";
  onToggle: (id: string) => void;
}

const colorClasses = {
  yellow: "bg-task-yellow text-task-yellow-foreground",
  blue: "bg-task-blue text-task-blue-foreground", 
  green: "bg-task-green text-task-green-foreground",
  purple: "bg-task-purple text-task-purple-foreground",
};

export const TaskItem = ({ id, text, completed, color, onToggle }: TaskItemProps) => {
  console.log(`Rendering TaskItem: ${id}, completed: ${completed}, color: ${color}`);
  return (
    <div className={cn(
      "flex items-center space-x-3 p-4 rounded-lg transition-all hover:shadow-sm",
      colorClasses[color]
    )}>
      <Checkbox 
        id={id}
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="border-current"
      />
      <BookOpen className="h-4 w-4 flex-shrink-0" />
      <label 
        htmlFor={id}
        className={cn(
          "flex-1 text-sm font-medium cursor-pointer",
          completed && "line-through opacity-60"
        )}
      >
        {text}
      </label>
    </div>
  );
};