import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Task } from "./TaskCard";

interface EditTaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, nom: string, description: string) => void;
}

export const EditTaskDialog = ({
  task,
  open,
  onOpenChange,
  onSave,
}: EditTaskDialogProps) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setNom(task.name);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task && nom.trim()) {
      onSave(task.id, nom, description);
      onOpenChange(false);
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px]"
        aria-describedby="edit-task-description"
      >
        <DialogHeader>
          <DialogTitle>Modifier la tâche</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id="edit-task-description" className="space-y-2">
            <Label htmlFor="nom">Nom de la tâche</Label>
            <Input
              id="nom"
              placeholder="Nom de la tâche"
              value={nom}
              onChange={(e) => setNom(e.target.value.slice(0, 50))}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground text-right">
              {nom.length}/50
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description (optionnelle)"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              maxLength={200}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/200
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
