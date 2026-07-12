import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildRecipeInput } from "../../fixtures/recipe";

const {
  authMock,
  recipeCreateMock,
  revalidatePathMock,
  mkdirMock,
  writeFileMock,
} = vi.hoisted(() => ({
  authMock: vi.fn(),
  recipeCreateMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  mkdirMock: vi.fn(),
  writeFileMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: () => authMock(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    recipe: {
      create: (args: unknown) => recipeCreateMock(args),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: (path: string) => revalidatePathMock(path),
}));

vi.mock("fs/promises", () => {
  const mkdir = (...args: unknown[]) => mkdirMock(...args);
  const writeFile = (...args: unknown[]) => writeFileMock(...args);

  return { mkdir, writeFile, default: { mkdir, writeFile } };
});

vi.mock("@/app/generated/prisma/client", () => ({
  Dificulty: { EASY: "EASY", MEDIUM: "MEDIUM", HARD: "HARD" },
  RecipeCategory: {
    ENTRANTES: "ENTRANTES",
    ENSALADAS: "ENSALADAS",
    SOPAS_Y_CREMAS: "SOPAS_Y_CREMAS",
    VERDURAS: "VERDURAS",
    LEGUMBRES: "LEGUMBRES",
    CARNES: "CARNES",
    PESCADOS_Y_MARISCOS: "PESCADOS_Y_MARISCOS",
    ARROCES: "ARROCES",
    HUEVOS: "HUEVOS",
    PASTAS: "PASTAS",
    POSTRES: "POSTRES",
    OTRO: "OTRO",
  },
}));

const { createRecipe } = await import("@/app/actions/recipe");

const lastCreateCallData = () => {
  const lastCall = recipeCreateMock.mock.calls.at(-1) as
    | [{ data: Record<string, unknown> }]
    | undefined;

  if (!lastCall) {
    throw new Error("prisma.recipe.create was not called");
  }

  return lastCall[0].data;
};

describe("createRecipe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMock.mockResolvedValue({ user: { id: "1" } });
    recipeCreateMock.mockImplementation(async ({ data }) => ({
      id: 1,
      ...data,
    }));
  });

  it("should throw when there is no active session", async () => {
    authMock.mockResolvedValue(null);

    await expect(createRecipe(buildRecipeInput())).rejects.toThrow(
      "No session provided",
    );
    expect(recipeCreateMock).not.toHaveBeenCalled();
  });

  it("should derive a normalized slug from the recipe name", async () => {
    await createRecipe(buildRecipeInput({ name: "  Tarta de Manzana!! " }));

    expect(lastCreateCallData().slug).toBe("tarta_de_manzana");
  });

  it("should fall back to a generated slug when the name has no valid characters", async () => {
    await createRecipe(buildRecipeInput({ name: "!!!" }));

    expect(lastCreateCallData().slug).toMatch(/^receta-\d+$/);
  });

  it("should fall back to a default title when no name is provided", async () => {
    await createRecipe(buildRecipeInput({ name: undefined }));

    expect(lastCreateCallData().name).toBe("Receta sin título");
  });

  it("should apply default values for optional fields", async () => {
    await createRecipe(
      buildRecipeInput({ category: undefined, dificulty: undefined }),
    );

    expect(lastCreateCallData()).toMatchObject({
      category: "OTRO",
      dificulty: "EASY",
      observations: "",
      timesDone: 0,
      imageUrl: "",
    });
  });

  it("should use the provided category and dificulty instead of the defaults", async () => {
    await createRecipe(
      buildRecipeInput({ category: "POSTRES", dificulty: "HARD" }),
    );

    expect(lastCreateCallData()).toMatchObject({
      category: "POSTRES",
      dificulty: "HARD",
    });
  });

  it("should convert pax and timeToDone to numbers when provided", async () => {
    await createRecipe(buildRecipeInput({ pax: 4, timeToDone: 45 }));

    expect(lastCreateCallData()).toMatchObject({ pax: 4, timeToDone: 45 });
  });

  it("should associate the recipe with the logged in user", async () => {
    authMock.mockResolvedValue({ user: { id: "7" } });

    await createRecipe(buildRecipeInput());

    expect(lastCreateCallData().userId).toBe(7);
  });

  it("should filter out blank steps and ingredients and trim their values", async () => {
    await createRecipe(
      buildRecipeInput({
        steps: ["  Mezclar  ", "", "   ", "Hornear"],
        ingredients: ["Harina", "  ", "Azúcar  "],
      }),
    );

    const data = lastCreateCallData();

    expect(data.steps).toEqual({
      create: [
        { step: "Mezclar", order: 1 },
        { step: "Hornear", order: 2 },
      ],
    });
    expect(data.ingredients).toEqual({
      create: [{ description: "Harina" }, { description: "Azúcar" }],
    });
  });

  it("should create a recipe without steps or ingredients when none are provided", async () => {
    await createRecipe(buildRecipeInput());

    const data = lastCreateCallData();

    expect(data.steps).toEqual({ create: [] });
    expect(data.ingredients).toEqual({ create: [] });
  });

  it("should use the provided imageUrl when no image file is uploaded", async () => {
    await createRecipe(
      buildRecipeInput({ imageUrl: "/images/existing.jpg" }),
    );

    expect(lastCreateCallData().imageUrl).toBe("/images/existing.jpg");
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeFileMock).not.toHaveBeenCalled();
  });

  it("should save an uploaded image to disk and use the resulting path as imageUrl", async () => {
    const image = new File(["fake-image-content"], "photo.png", {
      type: "image/png",
    });

    await createRecipe(buildRecipeInput({ name: "Tarta", image }));

    expect(mkdirMock).toHaveBeenCalledTimes(1);
    expect(writeFileMock).toHaveBeenCalledTimes(1);
    expect(lastCreateCallData().imageUrl).toBe("/images/recipes/tarta.png");
  });

  it("should revalidate the recipes path after creating a recipe", async () => {
    await createRecipe(buildRecipeInput());

    expect(revalidatePathMock).toHaveBeenCalledWith("/recipes");
  });

  it("should return the recipe created by the database", async () => {
    recipeCreateMock.mockResolvedValue({ id: 42, slug: "tarta" });

    const result = await createRecipe(buildRecipeInput());

    expect(result).toEqual({ id: 42, slug: "tarta" });
  });

  it("should produce NaN for pax and timeToDone when they are not provided (known limitation)", async () => {
    await createRecipe(
      buildRecipeInput({ pax: undefined, timeToDone: undefined }),
    );

    const data = lastCreateCallData();

    expect(data.pax).toBeNaN();
    expect(data.timeToDone).toBeNaN();
  });
});
