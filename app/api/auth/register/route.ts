
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        id: new ObjectId().toString(),
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Utilisateur inscrit avec succès", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


