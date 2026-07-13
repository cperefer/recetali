import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, redirectMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: () => authMock(),
}));

vi.mock("next/navigation", () => ({
  redirect: (path: string) => redirectMock(path),
}));

const { validateSession } = await import("@/lib/validateSession");

describe("validateSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to home when there is no active session", async () => {
    authMock.mockResolvedValue(null);

    await validateSession();

    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("should not redirect when there is an active session", async () => {
    authMock.mockResolvedValue({ user: { id: "1" } });

    await validateSession();

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
