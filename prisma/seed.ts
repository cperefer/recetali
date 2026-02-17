import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log(process.env.DATABASE_URL);
  const passwordAlicia = await bcrypt.hash("1234abcd", 10);
  const passwordMiguel = await bcrypt.hash("1234abcd", 10);

  const alicia = await prisma.user.upsert({
    where: { email: "gento_alicia@hotmail.com" },
    update: {},
    create: {
      email: "gento_alicia@hotmail.com",
      firstName: "Alicia",
      lastName: "Gento",
      password: passwordAlicia,
      role: "ADMIN",
    },
  });

  const miguel = await prisma.user.upsert({
    where: { email: "migui_kaos14@hotmail.com" },
    update: {},
    create: {
      email: "migui_kaos14@hotmail.com",
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
