#!/usr/bin/env node
/**
 * Patches all Prompt Engineering lessons to add SEC-15_BEST_AI section
 * after SEC-07_GOOD_OUTPUT in every lesson's learn_setup_steps.
 *
 * Run: node _patch_pe_best_ai.js
 */
require("dotenv").config();
const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
});

const BEST_AI_MAP = {
  // ── M1: Foundations ──────────────────────────────────────────
  "prompt-anatomy-gccf": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "GPT-4o excels at following structured GCCF prompts and delivers clean, well-formatted outputs every time.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Copy the Good Prompt above, paste it into ChatGPT, and see how closely the output matches what we showed you!",
  },
  "ambiguity-killers": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is the best at following highly specific instructions -- it notices every detail you add and reflects it in the output.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Paste the Bad Prompt first, see the vague result. Then paste the Good Prompt and watch the magic of specificity!",
  },
  "clarifying-questions-system": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the best at multi-turn conversations -- it asks thoughtful follow-up questions and remembers everything you said.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask Claude to clarify before answering your next assignment. Notice how it asks better questions than ChatGPT!",
  },
  "few-shot-examples": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is a master at pattern matching -- give it 2-3 examples and it copies your exact style with scary accuracy.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Give ChatGPT 2 flashcard examples from your notes, then ask for 10 more. The consistency will surprise you!",
  },
  "persona-basics": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude stays in character better than any other AI -- it maintains persona tone, vocabulary, and expertise throughout the conversation.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Tell Claude 'You are a senior Python developer at Google' and ask it to review your code. Notice the expert-level feedback!",
  },

  // ── M2: Output Control ──────────────────────────────────────
  "format-control-tables": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT produces the cleanest markdown tables with perfect alignment and formatting -- ideal for comparison tables and data displays.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask ChatGPT for a comparison table of any 5 things you're studying -- paste the result into any markdown viewer and it'll look perfect!",
  },
  "format-control-json": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT generates the most reliable valid JSON -- you can paste its output directly into Postman or your code without fixing syntax errors.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Ask ChatGPT for mock API data in JSON format, copy the output, and paste it into jsonlint.com -- it will be valid every time!",
  },
  "length-control": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the most disciplined at respecting word and line limits -- when you say 'under 100 words', Claude actually counts.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask Claude for a 50-word summary, then count the words. Now try the same with ChatGPT and compare who follows the limit better!",
  },
  "strict-mode-no-extra-text": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT responds best to strict output instructions -- tell it 'no explanations, no greetings' and it obeys perfectly.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Use the STRICT OUTPUT MODE header from this lesson in ChatGPT. Watch how it gives you ONLY what you asked for -- zero fluff!",
  },
  "multi-version-output": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude excels at generating diverse variations -- each version has a genuinely different tone, style, and approach.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask Claude for 5 versions of your portfolio tagline -- notice how each one feels genuinely different, not just reworded!",
  },

  // ── M3: Debugging & Refinement ──────────────────────────────
  "common-failure-types": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is the best at diagnosing prompt failures -- it can break down exactly what went wrong and show you the fix.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Paste your worst prompt into ChatGPT and say 'Diagnose why this prompt fails using the 5 failure types'. You'll learn so much!",
  },
  "3r-loop-workflow": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude has the best conversation memory -- perfect for the Request → Review → Refine loop where context from earlier messages matters.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Start a 3R Loop with Claude for your next assignment. Request → Review its output → Refine with feedback. The 3rd version will be gold!",
  },
  "self-critique-prompts": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the most honest self-critic -- when you ask it to review its own work, it gives genuinely useful feedback instead of praising itself.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Ask Claude to write something, then say 'Now critique your own output. What would you improve?' Its honesty will impress you!",
  },
  "prompt-versioning": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is great at creating structured templates and tracking versions -- perfect for building your personal prompt library.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Ask ChatGPT to create a versioning template for your most-used prompt. Start building your prompt library today!",
  },
  "reusable-prompt-templates": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT excels at generating reusable templates with clear [BRACKET] placeholders you can fill in for any situation.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask ChatGPT: 'Create 5 reusable prompt templates for a college student -- with [BRACKETS] for customizable parts'. Save the best ones!",
  },

  // ── M4: Truthfulness & Reliability ──────────────────────────
  "dont-guess-mode": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the most honest AI when uncertain -- it says 'I don't know' instead of making up confident-sounding wrong answers.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "Gemini", url: "https://gemini.google.com", free: true },
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Ask Claude a niche question about your subject and add 'If you're not sure, say so'. Compare with ChatGPT -- notice who's more honest!",
  },
  "verification-prompts": {
    primary: { name: "Perplexity", model: "Online Search", why: "Perplexity searches the live internet and cites real sources for every claim -- the ultimate fact-checker for your research.", url: "https://perplexity.ai", free: true },
    alternatives: [
      { name: "Gemini", url: "https://gemini.google.com", free: true },
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Take any AI-generated fact from another tool, paste it into Perplexity and ask 'Verify this claim with sources'. Trust, but verify!",
  },
  "answer-from-given-text-only": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the best at staying grounded -- when you say 'answer ONLY from this text', it won't sneak in outside knowledge.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Paste a paragraph from your textbook into Claude and ask questions with 'Answer ONLY from the text above'. Watch it stay perfectly grounded!",
  },
  "handle-missing-info": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude gracefully handles incomplete information -- it tells you exactly what's missing instead of filling gaps with hallucinations.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Give Claude an incomplete problem and add 'If any information is missing, list what you need before answering'. It handles this beautifully!",
  },
  "anti-hallucination-checklist": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the most careful AI -- it naturally avoids hallucination and responds well to anti-hallucination instructions.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "Perplexity", url: "https://perplexity.ai", free: true },
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Use the anti-hallucination checklist from this lesson as a prefix to any Claude prompt. Your outputs will become dramatically more reliable!",
  },

  // ── M5: Image Prompting ─────────────────────────────────────
  "image-prompt-formula": {
    primary: { name: "ChatGPT", model: "DALL-E 3", why: "ChatGPT with DALL-E 3 lets you describe images in natural language and iterate through conversation -- the easiest way to start image prompting.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Midjourney", url: "https://midjourney.com", free: false },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Open ChatGPT, type the Good Prompt from this lesson, and watch DALL-E 3 generate your image. Then say 'Make it more vibrant' to iterate!",
  },
  "composition-control": {
    primary: { name: "Midjourney", model: "v6", why: "Midjourney gives you the most control over image composition -- framing, perspective, and spatial arrangement are its superpower.", url: "https://midjourney.com", free: false },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Try Midjourney with composition terms like 'rule of thirds', 'bird's eye view', or 'close-up shot' -- the results are stunning!",
  },
  "style-lighting-control": {
    primary: { name: "Midjourney", model: "v6", why: "Midjourney understands artistic styles and lighting like a professional photographer -- from 'golden hour' to 'cyberpunk neon'.", url: "https://midjourney.com", free: false },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "In Midjourney, try the same subject with different styles: 'watercolor painting', 'studio lighting', 'cinematic 35mm film'. See how each transforms the mood!",
  },
  "consistency-characters": {
    primary: { name: "Midjourney", model: "v6", why: "Midjourney's --sref and --cref flags give you the best character consistency across multiple images -- essential for storytelling.", url: "https://midjourney.com", free: false },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Create a character in Midjourney, then use --sref with the same seed to generate that character in different scenes. Consistency is magic!",
  },
  "iterate-fix-bad-images": {
    primary: { name: "ChatGPT", model: "DALL-E 3", why: "ChatGPT lets you iterate on images through conversation -- say 'make the background darker' or 'remove the hat' and it adjusts naturally.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Midjourney", url: "https://midjourney.com", free: false },
    ],
    try_prompt: "Generate an image in ChatGPT, then iterate: 'Make it brighter', 'Change the background to a library', 'Add glasses to the person'. Natural editing!",
  },

  // ── M6: Video Scripts ───────────────────────────────────────
  "hook-script-template": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT writes the most engaging hooks and scripts -- it understands viral content patterns and attention-grabbing openings.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Ask ChatGPT to write 5 hook options for a 60-second video about your project. Pick the one that makes YOU want to watch!",
  },
  "script-to-storyboard": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude excels at breaking scripts into structured storyboards -- it handles scene descriptions, transitions, and visual cues systematically.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Give Claude any script and say 'Convert this to a shot-by-shot storyboard with visual descriptions'. The detail will amaze you!",
  },
  "shot-list-broll": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT generates detailed, well-organized shot lists with specific B-roll suggestions that are actually filmable.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Describe your video topic to ChatGPT and ask for 'a 15-shot shot list with B-roll ideas, shot type, and duration for each'. Ready to film!",
  },
  "captions-onscreen-text": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is the best at writing punchy captions and on-screen text -- short, engaging, and perfectly timed for video.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Give ChatGPT your script and ask for 'on-screen text for each scene -- max 5 words per text, designed for mobile viewing'. Social media ready!",
  },
  "30-45-60-sec-templates": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT understands the exact pacing needed for 30, 45, and 60-second videos -- it writes scripts that fit the duration perfectly.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Ask ChatGPT for the same topic as a 30-sec, 45-sec, and 60-sec script. See how it adjusts depth and pacing for each duration!",
  },

  // ── M7: Coding With AI ─────────────────────────────────────
  "spec-prompts": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude deeply understands software requirements -- it asks the right questions and produces detailed, well-structured specs.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Copilot", url: "https://github.com/features/copilot", free: false },
    ],
    try_prompt: "Tell Claude about your next project idea and ask for 'a complete technical spec with requirements, architecture, and API endpoints'. Ship-ready specs!",
  },
  "debug-prompts": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT is the fastest at finding bugs -- paste your error and code, and it pinpoints the issue with a clear explanation.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Copilot", url: "https://github.com/features/copilot", free: false },
    ],
    try_prompt: "Next time you hit an error, paste the error message + your code into ChatGPT using the debug prompt from this lesson. Bug squashed in seconds!",
  },
  "refactor-prompts": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude gives the most thoughtful refactoring suggestions -- it understands code architecture and explains the 'why' behind each change.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Copilot", url: "https://github.com/features/copilot", free: false },
    ],
    try_prompt: "Paste your messiest function into Claude and say 'Refactor this for readability and performance. Explain each change.' Your code will glow up!",
  },
  "test-case-generation": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT generates comprehensive test cases fast -- edge cases, boundary values, and happy paths all covered systematically.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Copilot", url: "https://github.com/features/copilot", free: false },
    ],
    try_prompt: "Paste any function into ChatGPT and ask for '10 test cases including edge cases, using your testing framework'. Instant test coverage!",
  },
  "system-design-prompts": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude excels at system design thinking -- it considers scalability, trade-offs, and real-world constraints like a senior architect.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Ask Claude: 'Design a system for [your project] that handles 10K users. Include architecture diagram (text), database schema, and API design.' Interview-ready!",
  },

  // ── M8: Extraction, Notes & Research ────────────────────────
  "extract-to-table": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT extracts data into perfectly formatted tables -- paste messy text and get a clean, organized markdown table instantly.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Copy a messy paragraph from any website, paste it into ChatGPT with 'Extract the key data into a markdown table'. Instant organization!",
  },
  "extract-to-json": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT produces the cleanest JSON extraction -- valid syntax, consistent key naming, and proper nesting from unstructured text.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Paste any unstructured text and tell ChatGPT the exact JSON schema you want. Copy the output into your code -- it just works!",
  },
  "summarize-3-levels": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude writes the best summaries -- it captures the essence at each level without losing critical details or adding fluff.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Paste a long article into Claude and ask for 3-level summaries: tweet (30 words), paragraph (100 words), and study notes (300 words). Study smarter!",
  },
  "notes-to-flashcards-quiz": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT generates the most engaging flashcards and quiz questions -- well-structured, exam-relevant, and at the right difficulty level.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Paste your lecture notes into ChatGPT: 'Create 15 flashcards + 5 MCQs from these notes for exam prep'. Your study session just got 10x faster!",
  },
  "compare-2-documents": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude handles long texts best -- it can compare two documents side-by-side and find subtle differences that others miss.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "Gemini", url: "https://gemini.google.com", free: true },
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Paste two versions of your notes into Claude: 'Compare these two documents. Show similarities, differences, and which is more complete.' Research superpower!",
  },

  // ── M9: Reasoning, Math, QA & Interviews ───────────────────
  "stepwise-reasoning": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude produces the clearest step-by-step reasoning -- each step is logical, well-explained, and builds naturally on the previous one.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Give Claude a math or logic problem with 'Show your reasoning step by step. Label each step.' The clarity will help you understand, not just get answers!",
  },
  "final-only-vs-show-steps": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT switches cleanly between 'show steps' and 'final only' modes -- it respects which format you want without mixing them.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Try the same math problem twice in ChatGPT: once with 'show all steps' and once with 'give only the final answer'. See the difference in output!",
  },
  "practice-question-generator": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT generates the most diverse and exam-relevant practice questions -- from easy to hard, covering all question types.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Tell ChatGPT your exam topic and ask for '20 practice questions: 5 easy, 10 medium, 5 hard -- with answers'. Your own personal exam paper!",
  },
  "interview-simulator": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the most realistic interview simulator -- it stays in the interviewer role, asks follow-ups, and gives honest feedback.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Tell Claude: 'You are a senior engineer at Google interviewing me for SDE-1. Start the interview.' Practice until you're confident!",
  },
  "answer-evaluator-rubric": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude gives the most fair and detailed evaluations -- it applies rubrics consistently and provides actionable improvement suggestions.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Write an answer to an interview question, then ask Claude to 'Evaluate this on a rubric of Clarity, Depth, Examples, and Communication (1-5 each)'. Level up!",
  },

  // ── M10: Placement Toolkit ──────────────────────────────────
  "ats-resume-rewrite": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT understands ATS systems best -- it optimizes keywords, formatting, and structure to pass automated resume screening.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Gemini", url: "https://gemini.google.com", free: true },
    ],
    try_prompt: "Paste your resume + a job description into ChatGPT: 'Rewrite my resume to pass ATS for this role. Highlight matching keywords.' Get more interviews!",
  },
  "linkedin-profile-upgrade": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT writes the most engaging LinkedIn copy -- it balances professionalism with personality to make your profile stand out.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Paste your current LinkedIn About section into ChatGPT: 'Rewrite this to attract recruiters for [target role]. Keep it under 200 words.' Profile glow-up!",
  },
  "hr-interview-master": {
    primary: { name: "Claude", model: "Claude 3.5 Sonnet", why: "Claude is the best HR interview coach -- it gives realistic questions, evaluates your answers, and suggests improvements with empathy.", url: "https://claude.ai", free: true },
    alternatives: [
      { name: "ChatGPT", url: "https://chat.openai.com", free: true },
    ],
    try_prompt: "Tell Claude: 'You are an HR manager at [dream company]. Ask me behavioral interview questions one by one and rate my answers.' Practice makes perfect!",
  },
  "technical-interview-practice": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT covers the widest range of technical questions -- from DSA to system design to language-specific questions with detailed solutions.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
      { name: "Copilot", url: "https://github.com/features/copilot", free: false },
    ],
    try_prompt: "Ask ChatGPT: 'Give me a medium-difficulty coding problem for [your language]. After I solve it, review my solution.' Instant coding interview prep!",
  },
  "portfolio-project-storytelling": {
    primary: { name: "ChatGPT", model: "GPT-4o", why: "ChatGPT writes the most compelling project stories -- it turns technical details into narratives that impress recruiters and hiring managers.", url: "https://chat.openai.com", free: true },
    alternatives: [
      { name: "Claude", url: "https://claude.ai", free: true },
    ],
    try_prompt: "Tell ChatGPT about your best project: 'Write a portfolio story using Problem → Solution → Impact format. Make it impressive for recruiters.' Stand out!",
  },
};

async function run() {
  console.log("Patching Prompt Engineering lessons with SEC-15_BEST_AI...\n");

  const courseRows = await pool.query(
    `SELECT id FROM courses WHERE slug ILIKE '%prompt%' LIMIT 1`
  );
  if (courseRows.rows.length === 0) {
    console.error("Prompt Engineering course not found.");
    process.exit(1);
  }
  const courseId = courseRows.rows[0].id;

  const lessonRows = await pool.query(
    `SELECT l.id, l.slug, l.learn_setup_steps
     FROM lessons l
     JOIN course_modules m ON l.module_id = m.id
     WHERE m.course_id = $1
     ORDER BY m.position, l.position`,
    [courseId]
  );

  let updated = 0;
  let skipped = 0;

  for (const lesson of lessonRows.rows) {
    const sections = lesson.learn_setup_steps;
    if (!Array.isArray(sections)) { skipped++; continue; }

    const alreadyHas = sections.some((s) => s.type === "SEC-15_BEST_AI");
    if (alreadyHas) { skipped++; continue; }

    const aiData = BEST_AI_MAP[lesson.slug];
    if (!aiData) {
      console.warn(`  No AI data for slug: ${lesson.slug} — skipping`);
      skipped++;
      continue;
    }

    const sec07Index = sections.findIndex((s) => s.type === "SEC-07_GOOD_OUTPUT");
    const insertAt = sec07Index >= 0 ? sec07Index + 1 : sections.length;

    const newSection = { type: "SEC-15_BEST_AI", data: aiData };
    sections.splice(insertAt, 0, newSection);

    await pool.query(
      `UPDATE lessons SET learn_setup_steps = $1 WHERE id = $2`,
      [JSON.stringify(sections), lesson.id]
    );
    updated++;
    console.log(`  ✓ ${lesson.slug}`);
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
  await pool.end();
}

run().catch((err) => { console.error(err); process.exit(1); });

module.exports = { BEST_AI_MAP };
