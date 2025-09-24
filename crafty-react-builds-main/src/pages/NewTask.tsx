import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const colors = [
  { name: "mint", bg: "bg-green-200", selected: "bg-green-300", hex: "#A7F3D0" },
  { name: "purple", bg: "bg-purple-400", selected: "bg-purple-500", hex: "#A78BFA" },
  { name: "peach", bg: "bg-orange-200", selected: "bg-orange-300", hex: "#FED7AA" },
  { name: "cyan", bg: "bg-cyan-200", selected: "bg-cyan-300", hex: "#67E8F9" },
  { name: "yellow", bg: "bg-yellow-300", selected: "bg-yellow-400", hex: "#FACC15" },
  { name: "green", bg: "bg-green-400", selected: "bg-green-500", hex: "#22C55E" },
  { name: "teal", bg: "bg-teal-400", selected: "bg-teal-500", hex: "#14B8A6" },
  { name: "blue", bg: "bg-blue-500", selected: "bg-blue-600", hex: "#3B82F6" },
  { name: "indigo", bg: "bg-indigo-500", selected: "bg-indigo-600", hex: "#6366F1" },
  { name: "pink", bg: "bg-pink-500", selected: "bg-pink-600", hex: "#EC4899" },
  { name: "rose", bg: "bg-rose-500", selected: "bg-rose-600", hex: "#F43F5E" },
  { name: "red", bg: "bg-red-500", selected: "bg-red-600", hex: "#EF4444" },
  { name: "gray", bg: "bg-gray-300", selected: "bg-gray-400", hex: "#D1D5DB" },
];


const tags = ["Daily Routine", "Study Routine"];

const NewTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [repeatType, setRepeatType] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = async () => {
  if (!taskName.trim()) {
    toast({
      title: "Task name required",
      description: "Please enter a name for your task.",
      variant: "destructive",
    });
    return;
  }

  // Find hex value for selected color
  const colorHex = colors.find(c => c.name === selectedColor)?.hex || "#000";

  const task = {
    text: taskName,
    color: colorHex,
    completed: false,
  };
const response = await api.post("/api/tasks/add", { task });

    console.log("Task added:", response.data.task);
  

  toast({
    title: "Task created!",
    description: `"${taskName}" has been added to your list.`,
  });

  // Navigate to /main with the task data
  navigate("/main", );
};


  // Mock data for sidebar
  const mockTasks = [{ id: "1", completed: false }, { id: "2", completed: false }];
  const mockLists = [
    { name: "Daily Routine", count: 1 },
    { name: "Study", count: 0 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header tasks={mockTasks} lists={mockLists} />
      
      <div className="flex">
        <Sidebar tasks={mockTasks} lists={mockLists} />
        
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl">
            {/* Header with back button */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="mr-4 lg:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                New Task 
                <span className="text-2xl">😊</span>
              </h1>
            </div>

            <div className="space-y-8">
              {/* Task Name */}
              <div className="space-y-3">
                <Input
                  placeholder="Name your new task"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="text-lg border-0 border-b border-border rounded-none px-0 pb-2 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                />
              </div>

              {/* Task Description */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Describe your new task"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="min-h-[100px] border-0 border-b border-border rounded-none px-0 pb-2 focus-visible:ring-0 focus-visible:border-primary bg-transparent resize-none"
                />
              </div>

              {/* Card Color */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Card Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full transition-all hover:scale-110",
                        selectedColor === color.name ? color.selected : color.bg
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Repeat Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-foreground">Repeat</h3>
                        <p className="text-sm text-muted-foreground">Set a cycle for your task</p>
                      </div>
                      <Switch
                        checked={repeatEnabled}
                        onCheckedChange={setRepeatEnabled}
                      />
                    </div>

                    {repeatEnabled && (
                      <div className="space-y-4">
                        {/* Repeat Type */}
                        <div className="flex gap-2">
                          {["Daily", "Weekly", "Monthly"].map((type) => (
                            <Button
                              key={type}
                              variant={repeatType === type ? "default" : "outline"}
                              size="sm"
                              onClick={() => setRepeatType(type as typeof repeatType)}
                              className="flex-1"
                            >
                              {type}
                            </Button>
                          ))}
                        </div>

                        {/* Days Selection */}
                        {repeatType === "Weekly" && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-7 gap-2">
                              {days.map((day) => (
                                <Button
                                  key={day}
                                  variant={selectedDays.includes(day) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleDayToggle(day)}
                                  className="text-xs"
                                >
                                  {day}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between py-2 border-b border-border">
                          <span className="text-sm text-muted-foreground">Repeat</span>
                          <span className="text-sm text-foreground">Every week ›</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Set a tag for your task</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm" className="text-muted-foreground">
                      Add More +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 z-50"
      >
        <Check className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default NewTask;