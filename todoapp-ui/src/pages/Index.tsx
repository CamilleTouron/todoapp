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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 3;

  const loadTasks = async (p = page) => {
    try {
      const data = await fetchTasks(p);
      if (data && Array.isArray(data.items)) {
        setTasks(data.items as Task[]);
        setTotal(data.total);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Erreur lors du chargement des taches");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Erreur lors du chargement des taches");
    }
  };

  useEffect(() => {
    loadTasks(1);
  }, []);

  useEffect(() => {
    loadTasks(page);
  }, [page]);

  const addTask = async (nom: string, description: string) => {
    try {
      const newTask = (await apiCreateTask({ name: nom, description })) as Task;
      // After adding, reload the current page to keep user's position
      // If adding increases total and current page becomes the last page, keep it
      await loadTasks(page);
      toast.success("Tache ajoutee avec succes");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la tache");
    }
  };

  // Navigation helpers
  const goPrevious = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

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
      // reload current page; if deletion made page empty, go to previous page if possible
      const newTotal = total - 1;
      const lastPage = Math.max(1, Math.ceil(newTotal / perPage));
      if (page > lastPage) setPage(lastPage);
      await loadTasks(page > lastPage ? lastPage : page);
      toast.success("Tache supprimee");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la tache");
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
      await loadTasks(page);
      toast.success("Tache modifiee avec succes");
    } catch (error) {
      toast.error("Erreur lors de la modification de la tache");
    }
  };

  const activeTasks = tasks.filter((t) => !t.is_done);
  const completedTasks = tasks.filter((t) => t.is_done);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Mes Taches</h1>
          <p className="text-muted-foreground">
            Organisez votre journee simplement
          </p>
        </header>

        <AddTaskForm onAdd={addTask} />

        {tasks.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Aucune tache pour le moment. Commencez par en ajouter une !
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">
                  A faire ({activeTasks.length})
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
                  Terminees ({completedTasks.length})
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

            <div className="flex items-center justify-between pt-4">
                <button
                  className="btn"
                  onClick={goPrevious}
                  aria-label="Page précédente"
                  disabled={page === 1}
                >
                  Précédent
                </button>
              <div>
                Page {page} sur {totalPages}
              </div>
                <button
                  className="btn"
                  onClick={goNext}
                  aria-label="Page suivante"
                  disabled={page === totalPages}
                >
                  Suivant
                </button>
            </div>
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
