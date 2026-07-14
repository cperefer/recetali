import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { createRecipeMock, routerMock } = vi.hoisted(() => ({
  createRecipeMock: vi.fn(),
  routerMock: { back: vi.fn(), push: vi.fn(), replace: vi.fn() },
}));

vi.mock("@/app/actions/recipe", () => ({
  createRecipe: (...args: unknown[]) => createRecipeMock(...args),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

const { RecipeForm } = await import("@recipes/form/RecipeForm");

// RecipeFormInformation labels the name/description/pax/timeToDone/observations
// fields incorrectly (mismatched or missing `htmlFor`/`id`), so those fields
// have no accessible name and must be located by DOM order or placeholder.
const getInformationTextboxes = () => {
  const textboxes = screen.getAllByRole("textbox");
  return {
    nameInput: textboxes[0],
    descriptionTextarea: textboxes[1],
  };
};

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  const { nameInput, descriptionTextarea } = getInformationTextboxes();

  await user.type(nameInput, "Tarta de manzana");
  await user.type(descriptionTextarea, "Una tarta clásica de manzana");
  await user.type(screen.getByPlaceholderText("2"), "4");
  await user.type(screen.getByPlaceholderText("min"), "45");
  await user.selectOptions(screen.getByLabelText("Dificultad"), "hard");
  await user.selectOptions(screen.getByLabelText("Categoría"), "postres");

  const stepInput = document.getElementById("paso-0") as HTMLInputElement;
  const ingredientInput = document.getElementById(
    "ingrediente-0",
  ) as HTMLInputElement;

  await user.type(stepInput, "Mezclar los ingredientes");
  await user.type(ingredientInput, "Manzana");
};

describe("RecipeForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the recipe creation sections and submit button", () => {
    render(<RecipeForm />);

    expect(
      screen.getByRole("heading", { name: "Crear una receta" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pasos")).toBeInTheDocument();
    expect(screen.getByText("Ingredientes")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("should not call createRecipe when required fields are left empty", async () => {
    const user = userEvent.setup();
    render(<RecipeForm />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(createRecipeMock).not.toHaveBeenCalled();
  });

  it("should submit the collected form data and replace the history entry with the created recipe", async () => {
    const user = userEvent.setup();
    createRecipeMock.mockResolvedValue({ slug: "tarta-de-manzana" });

    render(<RecipeForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(createRecipeMock).toHaveBeenCalledTimes(1);
    const submittedData = createRecipeMock.mock.calls[0][0];
    expect(submittedData).toMatchObject({
      name: "Tarta de manzana",
      description: "Una tarta clásica de manzana",
      pax: "4",
      timeToDone: "45",
      dificulty: "HARD",
      category: "POSTRES",
    });

    expect(routerMock.replace).toHaveBeenCalledWith(
      "/recipes/tarta-de-manzana",
    );
  });

  it("should not replace the history entry when createRecipe does not return a created recipe", async () => {
    const user = userEvent.setup();
    createRecipeMock.mockResolvedValue(null);

    render(<RecipeForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(createRecipeMock).toHaveBeenCalledTimes(1);
    expect(routerMock.replace).not.toHaveBeenCalled();
  });

  it("should add a new step field when the add-step button is clicked", async () => {
    const user = userEvent.setup();
    render(<RecipeForm />);

    const stepsSection = screen.getByText("Pasos").closest("div")!
      .parentElement as HTMLElement;
    await user.type(
      document.getElementById("paso-0") as HTMLInputElement,
      "Precalentar el horno",
    );
    await user.click(
      within(stepsSection).getByRole("button", { name: "Añadir paso" }),
    );

    expect(document.getElementById("paso-1")).toBeInTheDocument();
  });
});
