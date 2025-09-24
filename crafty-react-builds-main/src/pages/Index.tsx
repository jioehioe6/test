import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AddTaskButton } from "@/components/AddTaskButton";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  color: string; // Accept any color string from backend
}

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchtask = async () => {
      try {
        const res = await api.get("/api/tasks");
        console.log("Response from /api/tasks:", res.data);

        // Map backend _id to id
        const formattedTasks = (res.data.tasks || res.data).map((t: any) => ({
          id: t._id,
          text: t.text,
          completed: t.completed,
          color: t.color
        }));

        setTasks(formattedTasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchtask();
  }, []);

  useEffect(() => {
    console.log("Tasks state updated:", tasks);
  }, [tasks]);

  const lists = [
    { name: "Daily Routine", count: 1 },
    { name: "Study", count: 0 }
  ];

 
const toggleTask = async (id: string) => {
  try {
    // 1️⃣ Update tasks state locally
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // 2️⃣ Send PUT request to backend with updated tasks
    await api.put("/api/tasks", { tasks: updatedTasks });

  } catch (err) {
    console.error("Failed to update tasks:", err);
    toast({
      title: "Error",
      description: "Failed to update task. Please try again.",
      variant: "destructive"
    });
  }
};

  const addTask = () => {
    const colors = ["#f87171", "#60a5fa", "#34d399", "#67E8F9"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: "New Task",
      completed: false,
      color: randomColor
    };
    
    setTasks([...tasks, newTask]);
    toast({
      title: "Task added!",
      description: "Your new task has been created."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header tasks={tasks} lists={lists} />
      
      <div className="flex">
        <Sidebar tasks={tasks} lists={lists} />
        
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Today</h1>
              <div className="lg:hidden text-sm text-muted-foreground">
                {tasks.length} tasks
              </div>
            </div>
            
  <div className="p-4">
  {tasks.map((task) => (
    <div
      key={task.id}
      className={`flex items-center p-2 mb-2 rounded cursor-pointer`}
      style={{ backgroundColor: task.color }}
      onClick={() => toggleTask(task.id)}
    >
      {task.completed && (
        <input
          type="checkbox"
          checked
          readOnly
          className="w-4 h-4 mr-2 accent-black"
        />
      )}
      
      <span className={`${task.completed ? "line-through" : ""}`}>
        {task.text}
      </span>
    </div>
  ))}
</div>






            
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tasks for today. Add one to get started!</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <AddTaskButton  />
    </div>
  );
};

export default Index;
