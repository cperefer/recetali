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

  await prisma.tagType.createMany({
    data: [
      {
        name: "FACIL",
      },
      {
        name: "TRADICIONAL",
      },
    ],
  });

  const sopa = await prisma.recipe.upsert({
    where: { id: 1, slug: "sopas_de_ajo" },
    update: {},
    create: {
      name: "Sopas de ajo",
      slug: "sopas_de_ajo",
      imageUrl: "imagen",
      category: "SOPAS_Y_CREMAS",
      userId: 2,
      dificulty: "EASY",
      timeToDone: 60,
      pax: 2,

      tags: {
        connect: [{ name: "TRADICIONAL" }, { name: "FACIL" }],
      },
    },
  });

  await prisma.step.createMany({
    data: [
      {
        recipeId: sopa.id,
        step: "En una cazuela calentamos aceite y metemos los ajos. Salteamos hasta que empiecen a estar doraditos, pero sin que se quemen. Añadimos también el jamón y removemos poco a poco para integrar los sabores.",
        order: 1,
      },
      {
        recipeId: sopa.id,
        step: "Cuando los ajos estén doraditos añadimos 4 rebanadas de pan y le damos unas vueltas para que se empapen bien.",
        order: 2,
      },
      {
        recipeId: sopa.id,
        step: "Retiramos un poco la cazuela del fuego para evitar que se queme y echamos el pimentón. Removemos para integrar todo.",
        order: 3,
      },
      {
        recipeId: sopa.id,
        step: "Volvemos a colocar la cazuela al fuego y, tras un par de minutos, añadimos la mitad del caldo.",
        order: 4,
      },
      {
        recipeId: sopa.id,
        step: "A partir de este momento es muy importante mantener el caldo a fuego medio-bajo para que nunca llegue a hervir. Removemos durante 3-5 minutos y añadimos el resto del caldo.",
        order: 5,
      },
      {
        recipeId: sopa.id,
        step: "Dejamos el caldo cociendo entre media hora y varias horas, según preferencia. Conviene ir probándolo de vez en cuando.",
        order: 6,
      },
      {
        recipeId: sopa.id,
        step: "Pasados unos 20-30 minutos añadimos el resto del pan, previamente tostado en aceite de oliva. Lo dejamos flotar en la superficie hasta que se ablande.",
        order: 7,
      },
      {
        recipeId: sopa.id,
        step: "Es importante no salpimentar hasta este punto y haber probado el caldo ya reducido, ya que el jamón puede aportar suficiente sal.",
        order: 8,
      },
      {
        recipeId: sopa.id,
        step: "Como toque final, echamos un par de huevos directamente en la sopa y removemos.",
        order: 9,
      },
    ],
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
