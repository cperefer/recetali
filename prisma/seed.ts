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

  let ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 1 },
    update: {},
    create: {
      recipeId: 1,
      description: "4 dientes de ajo",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 2 },
    update: {},
    create: {
      recipeId: 1,
      description: "2 huevos",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 3 },
    update: {},
    create: {
      recipeId: 1,
      description: "6 rebanadas de pan duro",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 4 },
    update: {},
    create: {
      recipeId: 1,
      description: "50 gramos de jamón serrano",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 5 },
    update: {},
    create: {
      recipeId: 1,
      description: "1 litro de caldo de pollo",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 6 },
    update: {},
    create: {
      recipeId: 1,
      description: "sal y pimienta al gusto",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 7 },
    update: {},
    create: {
      recipeId: 1,
      description: "2 cucharadas de pimentón dulce",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 8 },
    update: {},
    create: {
      recipeId: 1,
      description: "una pizca de pimentón de la Vera",
    },
  });

  ajosopa = await prisma.recipeIngredient.upsert({
    where: { id: 9 },
    update: {},
    create: {
      recipeId: 1,
      description: "50 ml de aceite de oliva virgen extra",
    },
  });

  console.log({ alicia, miguel, sopa, ajosopa });
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
