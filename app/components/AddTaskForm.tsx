

// "use client";
// import { useState, useEffect } from "react";

// const AddTaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 

  
//   useEffect(() => {
//     const token = localStorage.getItem("token"); 

//     if (token) {
//       setIsAuthenticated(true); 
//     } else {
//       setIsAuthenticated(false); 
//     }
//   }, []);

//   const currentUserId = "123"; 
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) return;

//     setLoading(true);
//     const res = await fetch("/api/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         description,
//         price,
//         status: "en cours",
//         userId: currentUserId,
//       }),
//     });

//     setLoading(false);

//     if (res.ok) {
//       setName("");
//       setDescription("");
//       setPrice(0);
//       onTaskAdded();
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div>
//         <p className="text-red-600 text-center font-bold">Veuillez vous connecter pour ajouter une tâche.</p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow w-full">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Nom de la tâche"
//         className="border p-2 rounded w-full"
//         required
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         className="border p-2 rounded w-full"
//       />
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(Number(e.target.value))}
//         placeholder="Prix en Ariary"
//         className="border p-2 rounded w-full"
//         min={0}
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-2 rounded ${
//           loading ? "bg-blue-300" : "bg-blue-600 text-white"
//         }`}
//       >
//         {loading ? "Ajout en cours..." : "Ajouter la tâche"}
//       </button>
//     </form>
//   );
// };

// export default AddTaskForm;


"use client";
import { useState } from "react";

const AddTaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        status: "en cours",
      }),
    });

    setLoading(false);

    if (res.ok) {
      setName("");
      setDescription("");
      setPrice(0);
      onTaskAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-blue-600">Ajouter une tâche</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de la tâche"
        className="border p-2 rounded w-full"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Prix en Ariary"
        className="border p-2 rounded w-full"
        min={0}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded ${
          loading ? "bg-blue-300" : "bg-blue-600 text-white font-bold"
        }`}
      >
        {loading ? "Ajout en cours..." : "Ajouter la tâche"}
      </button>
    </form>
   );
};

export default AddTaskForm;
