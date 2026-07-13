import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProviderWrapper } from "../../fixtures/FormProviderWrapper";
import { RecipeFormImage } from "@recipes/form/RecipeFormImage";

const createObjectURLMock = vi.fn(() => "blob:preview-url");
const revokeObjectURLMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: createObjectURLMock,
    revokeObjectURL: revokeObjectURLMock,
  });
});

const renderImageField = () =>
  render(
    <FormProviderWrapper>
      <RecipeFormImage />
    </FormProviderWrapper>,
  );

const buildImageFile = (name = "photo.png") =>
  new File(["fake-image-content"], name, { type: "image/png" });

describe("RecipeFormImage", () => {
  it("should show a placeholder and no remove button when no image is selected", () => {
    renderImageField();

    expect(
      screen.getByText("Arrastra una imagen aquí o haz click para seleccionar"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Eliminar" }),
    ).not.toBeInTheDocument();
  });

  it("should show a preview and a remove button after selecting a file", async () => {
    const user = userEvent.setup();
    renderImageField();

    const fileInput = document.getElementById(
      "recipe-image-input",
    ) as HTMLInputElement;
    await user.upload(fileInput, buildImageFile());

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText("Vista previa de la receta")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
  });

  it("should show a preview when an image is dropped on the drop zone", () => {
    renderImageField();

    const dropZone = screen.getByLabelText(
      "Arrastra una imagen aquí o haz click para seleccionar",
    );
    fireEvent.drop(dropZone, { dataTransfer: { files: [buildImageFile()] } });

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText("Vista previa de la receta")).toBeInTheDocument();
  });

  it("should ignore dropped files that are not images", () => {
    renderImageField();

    const dropZone = screen.getByLabelText(
      "Arrastra una imagen aquí o haz click para seleccionar",
    );
    const textFile = new File(["not an image"], "note.txt", {
      type: "text/plain",
    });
    fireEvent.drop(dropZone, { dataTransfer: { files: [textFile] } });

    expect(createObjectURLMock).not.toHaveBeenCalled();
    expect(
      screen.getByText("Arrastra una imagen aquí o haz click para seleccionar"),
    ).toBeInTheDocument();
  });

  it("should clear the preview and revoke the object URL when removed", async () => {
    const user = userEvent.setup();
    renderImageField();

    const fileInput = document.getElementById(
      "recipe-image-input",
    ) as HTMLInputElement;
    await user.upload(fileInput, buildImageFile());
    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:preview-url");
    expect(
      screen.queryByAltText("Vista previa de la receta"),
    ).not.toBeInTheDocument();
    expect(fileInput.value).toBe("");
  });

  it("should open the file dialog when clicking the drop zone or the change-image button", async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");
    renderImageField();

    await user.click(screen.getByRole("button", { name: "Cambiar imagen" }));

    expect(clickSpy).toHaveBeenCalled();
  });
});
