import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAdd: (nom: string, description: string) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nom.trim()) {
      onAdd(nom, description);
      setNom("");
      setDescription("");
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Nom de la tâche"
            value={nom}
            onChange={(e) => setNom(e.target.value.slice(0, 50))}
            maxLength={50}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground text-right">
            {nom.length}/50
          </p>
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Description (optionnelle)"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            maxLength={200}
            rows={3}
          />
          <p className="text-xs text-muted-foreground text-right">
            {description.length}/200
          </p>
        </div>
        <Button type="submit" className="w-full" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Ajouter une tâche
        </Button>
      </form>
    </Card>
  );
};
