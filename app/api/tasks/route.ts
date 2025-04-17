
import { NextResponse } from "next/server";

let tasks = [
  {
    id: "1",
    name: "Tâche 1",
    description: "Description 1",
    status: "en cours",
    price: 5000,
    userId: "123",
  },
  {
    id: "2",
    name: "Tâche 2",
    description: "Description 2",
    status: "terminé",
    price: 10000,
    userId: "123",
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || ""; 
  
  let filteredTasks = tasks;

  if (searchQuery) {
    filteredTasks = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchQuery) ||
        task.description.toLowerCase().includes(searchQuery) ||
        task.status.toLowerCase().includes(searchQuery)
    );
  }

  const reversedTasks = [...filteredTasks].reverse();

  return NextResponse.json(reversedTasks);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, description, status, price = 0, userId } = data;

  const newTask = {
    id: Date.now().toString(),
    name,
    description,
    status,
    price,
    userId,
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, name, description, status, price, userId } = await req.json();

  const task = tasks.find((task) => task.id === id);

  if (!task || task.userId !== userId) {
    return NextResponse.json(
      { error: "Unauthorized or task not found" },
      { status: 403 }
    );
  }

  task.name = name;
  task.description = description;
  task.status = status;
  task.price = price;

  return NextResponse.json(task);
}

export async function DELETE(req: Request) {
  const { id, userId } = await req.json();

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1 || tasks[taskIndex].userId !== userId) {
    return NextResponse.json(
      { error: "Unauthorized or task not found" },
      { status: 403 }
    );
  }

  tasks.splice(taskIndex, 1);

  return NextResponse.json({ message: "Task deleted successfully" });
}
