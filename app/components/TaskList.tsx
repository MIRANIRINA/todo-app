
"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { useSearch } from "./SearchContext";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Typage ici
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();
  const currentUserId = "123";

  const fetchTasks = (query = "") => {
    setLoading(true);
    const url = query ? `/api/tasks?search=${encodeURIComponent(query)}` : "/api/tasks";
    fetch(url)
      .then((res) => res.json())
      .then(setTasks)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks(searchTerm);
  }, [searchTerm]);

  return (
    <div className="mt-6 w-full max-w-xl space-y-6">
      <AddTaskForm onTaskAdded={() => fetchTasks(searchTerm)} />

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
              currentUserId={currentUserId}
              onTaskModified={() => fetchTasks(searchTerm)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
