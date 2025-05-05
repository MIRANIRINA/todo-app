
"use client";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  userId: string;
  userName?: string;
}

const getInitials = (nameOrEmail: string) => {
  const parts = nameOrEmail.split(/[.\s@_-]/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || "";
};

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
      body: JSON.stringify({ id: task.id }),
    });
    setLoading(false);
    if (res.ok) {
      onTaskModified();
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          {getInitials(task.userName || task.userId)}
        </div>
        <div>
          <div className="font-semibold text-sm">
            {task.userName || "Utilisateur inconnu"}
          </div>
          <div className="text-xs text-gray-600">{task.userId}</div>
        </div>
      </div>

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
