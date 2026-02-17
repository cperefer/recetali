import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log(process.env.DATABASE_URL);
  const passwordAlicia = await bcrypt.hash("1234abcd", 10);
  const passwordMiguel = await bcrypt.hash("1234abcd", 10);

  const alicia = await prisma.user.upsert({
    where: { email: "b@b.es" },
    update: {},
    create: {
      email: "b@b.es",
      firstName: "Alicia",
      lastName: "Gento",
      password: passwordAlicia,
      role: "ADMIN",
    },
  });

  const miguel = await prisma.user.upsert({
    where: { email: "a@a.es" },
    update: {},
    create: {
      email: "a@a.es",
      firstName: "Miguel",
      lastName: "Pérez",
      password: passwordMiguel,
      role: "ADMIN",
    },
  });

  console.log({ alicia, miguel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
