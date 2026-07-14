import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProviderWrapper } from "../../fixtures/FormProviderWrapper";
import { RecipeFormRepeater } from "@recipes/form/shared/RecipeFormRepeater";

const renderRepeater = () =>
  render(
    <FormProviderWrapper>
      <RecipeFormRepeater name="steps" textButton="Añadir paso" />
    </FormProviderWrapper>,
  );

describe("RecipeFormRepeater", () => {
  it("should render a single empty field on mount", () => {
    renderRepeater();

    expect(document.getElementById("paso-0")).toBeInTheDocument();
    expect(document.getElementById("paso-1")).not.toBeInTheDocument();
  });

  it("should focus the first empty field instead of adding a new one", async () => {
    const user = userEvent.setup();
    renderRepeater();

    await user.click(screen.getByRole("button", { name: "Añadir paso" }));

    expect(document.getElementById("paso-1")).not.toBeInTheDocument();
    expect(document.getElementById("paso-0")).toHaveFocus();
  });

  it("should add a new field when there is no empty field left", async () => {
    const user = userEvent.setup();
    renderRepeater();

    await user.type(
      document.getElementById("paso-0") as HTMLInputElement,
      "Precalentar el horno",
    );
    await user.click(screen.getByRole("button", { name: "Añadir paso" }));

    expect(document.getElementById("paso-1")).toBeInTheDocument();
  });

  it("should remove a field when its remove button is clicked", async () => {
    const user = userEvent.setup();
    renderRepeater();

    await user.type(
      document.getElementById("paso-0") as HTMLInputElement,
      "Precalentar el horno",
    );
    await user.click(screen.getByRole("button", { name: "Añadir paso" }));
    expect(document.getElementById("paso-1")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "X" })[0]);

    expect(document.getElementById("paso-1")).not.toBeInTheDocument();
  });
});
