/**
 * Builds Dictionary lesson content for Prompt Engineering: one lesson per module at the end.
 * Each Dictionary lesson has: nav links, intro, and one SEC-DICT-ENTRY per lesson in the module
 * with a default prompt (placeholders) and 20+ keywords for different scenarios.
 */

function sec(type, data) {
  return { type, data };
}

/** Unique default prompt + 20+ keywords per lesson; see _seed_pe_dictionary_data.js */
const { DICT_CONTENT } = require("./_seed_pe_dictionary_data");

/** Fallback when lesson slug is not in DICT_CONTENT (e.g. new lesson added later). */
function getFallbackContent(lessonTitle, lessonSlug) {
  return {
    defaultPrompt: "Goal: [YOUR GOAL — what you want AI to do].\nContext: [YOUR CONTEXT].\nConstraints: [LIMITS].\nFormat: [OUTPUT FORMAT].\nReplace each [bracket] with your details.",
    keywords: [
      { word: "Goal", explanation: "Exact outcome: explain, compare, write, or generate." },
      { word: "Context", explanation: "Your level, role, or situation." },
      { word: "Constraints", explanation: "Word count, time, tone, or scope." },
      { word: "Format", explanation: "Bullets, table, paragraph, or code." },
      { word: "Topic", explanation: "Subject or domain." },
      { word: "Audience", explanation: "Who will use the output." },
      { word: "Length", explanation: "Short, medium, or long." },
      { word: "Tone", explanation: "Formal, casual, or technical." },
      { word: "Examples", explanation: "Number of examples." },
      { word: "Language", explanation: "English or Hindi." },
      { word: "Depth", explanation: "Overview, intermediate, or expert." },
      { word: "Purpose", explanation: "Exam, interview, or project." },
      { word: "Include", explanation: "What must be in the output." },
      { word: "Exclude", explanation: "What to leave out." },
      { word: "Style", explanation: "Bullets, narrative, or steps." },
      { word: "Criteria", explanation: "What to evaluate." },
      { word: "Sources", explanation: "Given text only or allow general knowledge." },
      { word: "Priority", explanation: "Most important section." },
      { word: "Deadline", explanation: "Urgent vs polished." },
      { word: "Output type", explanation: "Notes, essay, code, or table." },
    ],
  };
}

function getContentForLesson(lessonSlug, lessonTitle) {
  const entry = DICT_CONTENT[lessonSlug];
  if (entry && entry.defaultPrompt && Array.isArray(entry.keywords) && entry.keywords.length >= 1) {
    return entry;
  }
  const fallback = getFallbackContent(lessonTitle, lessonSlug);
  return {
    defaultPrompt: fallback.defaultPrompt,
    keywords: fallback.keywords,
  };
}

/**
 * Build sections for the Dictionary lesson: NAV, INTRO, then one ENTRY per lesson in the module.
 * @param {Array<{ title: string, slug: string }>} lessons - All lessons in the module (excluding Dictionary)
 * @param {string} moduleTitle - e.g. "Foundations"
 */
function buildDictionarySections(lessons, moduleTitle) {
  const navLinks = lessons.map((l) => ({
    title: l.title,
    anchorId: l.slug,
  }));
  const intro = sec("SEC-DICT-NAV", { links: navLinks });
  const introDesc = sec("SEC-DICT-INTRO", {
    headline: `${moduleTitle} — Dictionary`,
    description: "For every lesson in this module you get one default prompt with [placeholders] you can fill for any scenario, and 20+ keywords to swap so the same prompt works for study, coding, projects, or interviews. We built this with love so you never run out of the right words.",
  });
  const entries = lessons.map((l) => {
    const { defaultPrompt, keywords } = getContentForLesson(l.slug, l.title);
    return sec("SEC-DICT-ENTRY", {
      anchorId: l.slug,
      lessonSlug: l.slug,
      lessonTitle: l.title,
      defaultPrompt,
      keywords,
    });
  });
  return [intro, introDesc, ...entries];
}

/**
 * Returns the full Dictionary lesson object to append to a module's lessons array.
 */
function buildDictionaryLesson(lessonsInModule, moduleTitle) {
  const sections = buildDictionarySections(lessonsInModule, moduleTitle);
  return {
    title: "Dictionary",
    slug: "dictionary",
    goal: "Quick-reference default prompts and 20+ keywords for every lesson in this module — adapt any prompt to your scenario by replacing placeholders and swapping keywords.",
    summary: "One default prompt per lesson (with [placeholders]) and 20+ keywords with clear explanations so you can create different scenarios for study, coding, projects, and interviews.",
    sections,
  };
}

module.exports = { buildDictionaryLesson, buildDictionarySections, getContentForLesson, DICT_CONTENT };
