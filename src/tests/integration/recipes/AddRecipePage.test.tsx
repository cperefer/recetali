import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const { validateSessionMock } = vi.hoisted(() => ({
  validateSessionMock: vi.fn(),
}));

vi.mock("@/lib/validateSession", () => ({
  validateSession: () => validateSessionMock(),
}));

vi.mock("@recipes/form/RecipeForm", () => ({
  RecipeForm: () => <div data-testid="recipe-form" />,
}));

const { default: AddRecipePage, generateMetadata } =
  await import("@/app/(recipe)/recipe/add/page");

describe("AddRecipePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate the session before rendering the recipe form", async () => {
    const element = await AddRecipePage();
    render(element);

    expect(validateSessionMock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("recipe-form")).toBeInTheDocument();
  });

  it("should expose the page title through generateMetadata", async () => {
    const metadata = await generateMetadata();

    expect(metadata).toEqual({ title: "Recetali - Crear receta" });
  });
});
