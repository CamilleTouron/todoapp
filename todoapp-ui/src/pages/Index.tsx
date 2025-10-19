import { useState, useEffect } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskCard, Task } from "@/components/TaskCard";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  fetchTasks,
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  updateTask as apiUpdateTask,
} from "@/lib/api";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        if (Array.isArray(data)) {
          setTasks(data as Task[]);
        } else {
          console.error("Unexpected data format:", data);
          toast.error("Erreur lors du chargement des tâches");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Erreur lors du chargement des tâches");
      }
    };
    loadTasks();
  }, []);

  const addTask = async (nom: string, description: string) => {
    try {
      const newTask = (await apiCreateTask({ name: nom, description })) as Task;
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Tâche ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la tâche");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, is_done: !task.is_done } : task
      )
    );
  };

  const deleteTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Tâche supprimée");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la tâche");
    }
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const saveTask = async (id: string, nom: string, description: string) => {
    try {
      const updatedTask = (await apiUpdateTask(id, {
        name: nom,
        description,
      })) as Task;
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, name: updatedTask.name, description: updatedTask.description }
            : task
        )
      );
      toast.success("Tâche modifiée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification de la tâche");
    }
  };

  const activeTasks = tasks.filter((t) => !t.is_done);
  const completedTasks = tasks.filter((t) => t.is_done);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Mes Tâches</h1>
          <p className="text-muted-foreground">
            Organisez votre journée simplement
          </p>
        </header>

        <AddTaskForm onAdd={addTask} />

        {tasks.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Aucune tâche pour le moment. Commencez par en ajouter une !
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  À faire ({activeTasks.length})
                </h2>
                {activeTasks.map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-muted-foreground">
                  Terminées ({completedTasks.length})
                </h2>
                {completedTasks.map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <EditTaskDialog
          task={editingTask}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={saveTask}
        />
      </div>
    </div>
  );
};

export default Index;
