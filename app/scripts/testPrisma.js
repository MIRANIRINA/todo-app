const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("📊 Liste des utilisateurs existants :", users);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
