
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  userId: string;
  userName?: string;
}

let tasks: Task[] = [
  {
    id: "1",
    name: "Tâche 1",
    description: "Description 1",
    status: "en cours",
    price: 5000,
    userId: "user@example.com",
    userName: "Jean Dupont",
  },
  {
    id: "2",
    name: "Tâche 2",
    description: "Description 2",
    status: "terminé",
    price: 10000,
    userId: "user@example.com",
    userName: "Jean Dupont",
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || "";

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery) ||
      task.status.toLowerCase().includes(searchQuery)
  );

  const enrichedTasks = filteredTasks.map((task) => ({
    ...task,
    userName: task.userName || "Utilisateur inconnu",
  }));

  const reversedTasks = [...enrichedTasks].reverse();
  return NextResponse.json(reversedTasks);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, status, price = 0 } = await req.json();

  const newTask: Task = {
    id: Date.now().toString(),
    name,
    description,
    status,
    price,
    userId: userEmail,
    userName: userName || "Utilisateur inconnu",
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, description, status, price } = await req.json();
  const task = tasks.find((task) => task.id === id);

  if (!task || task.userId !== userEmail) {
    return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
  }

  task.name = name;
  task.description = description;
  task.status = status;
  task.price = price;

  return NextResponse.json(task);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1 || tasks[index].userId !== userEmail) {
    return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
  }

  tasks.splice(index, 1);
  return NextResponse.json({ message: "Task deleted" });
}
