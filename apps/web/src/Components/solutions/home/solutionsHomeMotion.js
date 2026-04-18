/** Shared motion preset for Solutions homepage sections. */
export const solutionsSectionFade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-48px" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};
