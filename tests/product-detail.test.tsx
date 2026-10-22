// Product detail pages (extra feature on top of Module 1).
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

afterEach(() => {
  cleanup();
  vi.doUnmock("@/lib/copper/catalog");
  vi.resetModules();
});

async function renderProduct(id: string) {
  vi.resetModules();
  const { default: Page } = await import("@/app/products/[id]/page");
  return render(await Page({ params: Promise.resolve({ id }) }));
}

describe("product detail pages", () => {
  it("shows name, price and features from the catalog", async () => {
    const { container } = await renderProduct("copper-home");
    expect(container.querySelector("h1")?.textContent).toBe("Copper Home");
    const text = container.textContent ?? "";
    expect(text).toContain("$149");
    expect(text).toContain("Monsoon Mode");
    expect(text).toContain("Memory kept: 30 days");
  });

  it("shows the Notes recording hours for Copper Notes", async () => {
    const text = (await renderProduct("copper-notes")).container.textContent ?? "";
    expect(text).toContain("$129");
    expect(text).toContain("Notes recording: 10 hours/month");
    expect(text).toContain("Notes recording: Unlimited");
  });

  it("gives not-found for an unknown product", async () => {
    await expect(renderProduct("nope")).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("follows catalog changes", async () => {
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getProducts: () =>
          actual.getProducts().map((p) => ({ ...p, priceUsd: p.priceUsd + 50 })),
      };
    });
    const text = (await renderProduct("copper-home")).container.textContent ?? "";
    expect(text).toContain("$199");
    expect(text).not.toContain("$149");
  });
});
