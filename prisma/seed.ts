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

  const sopa = await prisma.recipe.upsert({
    where: { id: 1, slug: "sopas_de_ajo" },
    update: {},
    create: {
      name: "Sopas de ajo",
      slug: "sopas_de_ajo",
      steps:
        "Frie ajo, mete pan, añade caldo, que haga chup pero sin llegar a hervir y echar un huevito",
      imageUrl: "imagen",
      category: "SOPAS_Y_CREMAS",
      userId: 2,
      dificulty: "EASY",
      timeToDone: 60,
      pax: 2,
    },
  });

  const ajo = await prisma.ingredient.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ajo",
      type: "VEGETAL",
    },
  });

  const ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 1 },
    update: {},
    create: {
      recipeId: 1,
      ingredientId: 1,
      quantity: "4",
      unit: "ENTERO",
    },
  });

  console.log({ alicia, miguel, sopa, ajo, ajosopa });
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
