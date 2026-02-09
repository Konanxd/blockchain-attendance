import { PrismaClient, OperatorRole } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  /* ---------------- OPERATOR ---------------- */
  const operator = await prisma.operator.upsert({
    where: { apiKey: "DEV_OPERATOR_KEY" },
    update: {},
    create: {
      name: "Gatekeeper 1",
      apiKey: "DEV_OPERATOR_KEY",
      role: "OPERATOR",
    },
  });

  /* ---------------- EVENT ---------------- */
  const event = await prisma.event.upsert({
    where: { eventCode: "EVENT-001" },
    update: {},
    create: {
      name: "Blockchain Conference",
      eventCode: "EVENT-001",
    },
  });

  /* ---------------- USER ---------------- */
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      name: "Test User",
      email: "user@test.com",
      password: "hashed-password-placeholder",
    },
  });

  /* ---------------- TICKET ---------------- */
  const ticketId = crypto.randomUUID();

  await prisma.ticket.upsert({
    where: { ticketId },
    update: {},
    create: {
      ticketId,
      userId: user.id,
      eventId: event.id,
      used: false,
    },
  });

  console.log("Seed data created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
