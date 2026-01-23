import { SLIDE_COUNT, SLIDES } from "./htmlBasicElements.jsx";

describe("HTML Basic Elements Slides", () => {
  test("SLIDE_COUNT matches actual slides array length", () => {
    expect(SLIDES.length).toBe(SLIDE_COUNT);
  });

  test("All slides have required type property", () => {
    SLIDES.forEach((slide, index) => {
      expect(slide).toHaveProperty("type");
      expect(typeof slide.type).toBe("string");
    });
  });

  test("All slides have a title", () => {
    SLIDES.forEach((slide, index) => {
      expect(slide).toHaveProperty("title");
      expect(typeof slide.title).toBe("string");
      expect(slide.title.length).toBeGreaterThan(0);
    });
  });
});
