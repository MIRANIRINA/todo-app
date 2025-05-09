
'use client';

import TaskList from "./components/TaskList";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bienvenue sur l'application to-do app</h1>
      <TaskList />
    </main>
  );
}
