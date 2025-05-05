
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { useSearch } from "./SearchContext";

type Task = {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  userId: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { searchTerm } = useSearch();

  const fetchTasks = (query = "") => {
    setLoading(true);
    const url = query ? `/api/tasks?search=${encodeURIComponent(query)}` : "/api/tasks";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Erreur: la réponse n'est pas un tableau.");
          setTasks([]); 
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.email) {
        setCurrentUserId(session.user.email);
      } else {
        setCurrentUserId(null);
      }
    });
  }, []);

  useEffect(() => {
    fetchTasks(searchTerm);
  }, [searchTerm]);

  if (currentUserId === null) {
    // Affichage conditionnel basé sur l'état de l'utilisateur
    console.log("Utilisateur non connecté");
  }

  return (
    <div className="mt-6 w-full max-w-xl space-y-6">
      {/* Formulaire visible uniquement si l'utilisateur est connecté */}
      {currentUserId && (
        <AddTaskForm onTaskAdded={() => fetchTasks(searchTerm)} />
      )}

      {loading ? (
        <p className="text-center text-gray-500">Chargement des tâches...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">Aucune tâche disponible.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              currentUserId={currentUserId ?? ""}
              onTaskModified={() => fetchTasks(searchTerm)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
