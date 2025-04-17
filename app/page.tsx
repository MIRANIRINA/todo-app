
'use client';

import TaskList from "./components/TaskList";

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bienvenue sur l'application to-do app</h1>
      <TaskList />
    </main>
  );
}
