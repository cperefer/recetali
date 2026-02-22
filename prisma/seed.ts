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
        "Pelamos y fileteamos los ajos. Además, en un cazo a parte vamos poniendo el caldo a calentar a fuego bajo<br /> En una cazuela calentamos aceite y metemos los ajos. Saltear hasta que los ajos empiecen a estar doraditos pero sin que se quemen. Añadimos también el jamón y vamos removiendo poco a poco para integrar los sabores.<br /> Cuando los ajos estén doraditos añadimos 4 de las rebanadas de pan y le damos unas vueltas para que se empape.<br /> Retiramos un poco la cazuela del fuego para evitar que se queme y echamos el pimentón. Le damos unas vueltas para ir integrando todo<br /> Volvemos a colocar la cazuela al fuego y tras un par de minutos echamos la mitad del caldo.<br /> A partir de este momento es muy importante tener el caldo a fuego medio / bajo para que nunca llegue a hervir. Removemos durante 3 - 5 minutos y añadimos el resto del caldo.<br /> Dejamos el caldo cociendo durante un tiempo que puede variar entre media hora y horas, ya al gusto del consumidor. A mi me gusta ir probando de vez en cuando.<br /> Pasados unos 20 - 30 minutos añadimos el resto del pan que hemos tostado previamente en aceite de oliva. Lo dejamos flotar en la superficie hasta que se ablande.<br /> Es importante no salpimentar hasta este punto habiendo probado el caldo ya reducido. Esto es porque hemos usado jamón y es facil no coger el punto de sal por ello.<br /> Como toque final, echamos un par de huevos y los echamos a la sopa removiendo.",
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
