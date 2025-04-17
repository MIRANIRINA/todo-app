
"use client";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  userId: string;
  price: number;
}

const TaskItem = ({
  task,
  currentUserId,
  onTaskModified,
}: {
  task: Task;
  currentUserId: string;
  onTaskModified: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newStatus, setNewStatus] = useState(task.status);
  const [newPrice, setNewPrice] = useState(task.price);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        name: newName,
        description: newDescription,
        status: newStatus,
        price: newPrice,
        userId: currentUserId,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setIsEditing(false);
      onTaskModified();
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, userId: currentUserId }),
    });
    setLoading(false);
    if (res.ok) {
      onTaskModified();
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="border p-2 rounded w-full"
            placeholder="Prix en Ariary"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`py-1 px-3 rounded ${loading ? "bg-blue-300" : "bg-blue-600 text-white"}`}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-gray-400 text-white py-1 px-3 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold">{task.name}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Statut : {task.status}</p>
          <p className="text-sm text-gray-500">
            Prix : {task.price?.toLocaleString()} Ar
          </p>
          {task.userId === currentUserId && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="bg-yellow-500 text-white py-1 px-3 rounded"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 text-white py-1 px-3 rounded"
              >
                {loading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
