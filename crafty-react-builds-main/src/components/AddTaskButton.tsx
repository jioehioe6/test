import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AddTaskButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate('/new-task')}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 z-50"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};