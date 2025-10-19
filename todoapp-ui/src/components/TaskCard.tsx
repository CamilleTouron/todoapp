import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

export interface Task {
  id: string;
  name: string;
  description: string;
  is_done: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.is_done}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1 flex-shrink-0"
        />
        <div className="flex-1 min-w-0 break-words">
          <h3
            className={`font-medium text-lg break-words ${
              task.is_done ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.name}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-1 whitespace-pre-wrap break-words ${
                task.is_done ? "line-through text-muted-foreground" : "text-foreground/80"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
