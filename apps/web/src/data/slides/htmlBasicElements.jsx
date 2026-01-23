// HTML Basic Elements - Slide Deck
// EXACT SLIDE COUNT: 18 slides
import React from "react";

export const SLIDE_COUNT = 18;

// Illustration components
const CoverIllustration1 = () => (
  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-md flex items-center justify-center">
    <div className="text-6xl font-bold text-blue-600">&lt;/&gt;</div>
  </div>
);

const WhyHtmlIllustration = () => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-8 border-2 border-blue-200">
    <div className="text-center">
      <div className="text-6xl mb-4">🌐</div>
      <p className="text-[#183B56] font-semibold">Building Blocks of the Web</p>
    </div>
  </div>
);

const WhatIsHtmlIllustration = () => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-8 border-2 border-purple-200">
    <div className="text-6xl text-center mb-4">📝</div>
    <p className="text-center text-[#183B56] font-semibold">Markup Language</p>
  </div>
);

const HeadingsIllustration = () => (
  <div className="bg-white rounded-md p-6 border-2 border-slate-200">
    <div className="space-y-2 text-left">
      <h1 className="text-3xl font-bold text-[#1565D8]">&lt;h1&gt; Largest Heading</h1>
      <h2 className="text-2xl font-bold text-[#1565D8]">&lt;h2&gt; Smaller</h2>
      <h3 className="text-xl font-bold text-[#1565D8]">&lt;h3&gt; Even Smaller</h3>
      <h6 className="text-sm font-bold text-[#1565D8]">&lt;h6&gt; Smallest</h6>
    </div>
  </div>
);

const LinksIllustration = () => (
  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-md p-8 border-2 border-blue-200">
    <div className="space-y-4">
      <a href="#" className="block text-[#1565D8] underline text-lg font-semibold">
        Visit Example.com →
      </a>
      <a href="#" className="block text-[#1565D8] underline text-lg font-semibold">
        About Us →
      </a>
      <a href="#" className="block text-[#1565D8] underline text-lg font-semibold">
        Contact →
      </a>
    </div>
  </div>
);

const UnorderedListsIllustration = () => (
  <div className="bg-white rounded-md p-6 border-2 border-slate-200 text-left">
    <ul className="space-y-2 text-[#183B56]">
      <li className="list-disc list-inside">• First item</li>
      <li className="list-disc list-inside">• Second item</li>
      <li className="list-disc list-inside">• Third item</li>
    </ul>
  </div>
);

const DivSpanIllustration = () => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md p-6 border-2 border-indigo-200">
    <div className="text-center space-y-2">
      <div className="bg-white p-3 rounded border border-indigo-200">Block Element (Div)</div>
      <p>Inline <span className="bg-yellow-200 px-2 py-1 rounded">Span</span> Element</p>
    </div>
  </div>
);

const ButtonIllustration = () => (
  <div className="space-y-4">
    <button className="w-full bg-[#1565D8] text-white px-6 py-3 rounded-lg font-semibold">
      Click Me
    </button>
    <button className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold">
      Submit
    </button>
  </div>
);

const SemanticHtmlIllustration = () => (
  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-md p-6 border-2 border-green-200">
    <div className="text-center space-y-2 text-sm text-[#183B56]">
      <div className="font-bold">&lt;header&gt;</div>
      <div className="font-bold">&lt;main&gt;</div>
      <div className="font-bold">&lt;footer&gt;</div>
    </div>
  </div>
);

const FinalCoverIllustration = () => (
  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-md flex items-center justify-center">
    <div className="text-6xl">🚀</div>
  </div>
);

export const SLIDES = [
  // Slide 1: Cover Slide
  {
    type: "cover",
    title: "HTML Basic Elements",
    subtitle: "Introduction to Web Development",
    illustration: <CoverIllustration1 />,
  },

  // Slide 2: Agenda
  {
    type: "agenda",
    smallLabel: "Course Overview",
    title: "What We'll Learn",
    items: [
      { title: "Introduction", subtopics: ["What is HTML?", "HTML Structure"] },
      { title: "Basic Elements", subtopics: ["Headings", "Paragraphs", "Links"] },
      { title: "Media & Lists", subtopics: ["Images", "Unordered Lists", "Ordered Lists"] },
      { title: "Forms & Tables", subtopics: ["Input Elements", "Buttons", "Data Tables"] },
      { title: "Summary", subtopics: ["Key Takeaways", "Next Steps"] },
    ],
  },

  // Slide 3: Why HTML
  {
    type: "bullets-image",
    smallLabel: "HTML Basics",
    title: "Why HTML?",
    bullets: [
      "HTML is the foundation of every website",
      "It structures content on web pages",
      "Works with CSS (styling) and JavaScript (interactivity)",
      "Essential skill for web developers",
      "Easy to learn and widely used",
    ],
    illustration: <WhyHtmlIllustration />,
  },

  // Slide 4: What is HTML
  {
    type: "bullets-image",
    smallLabel: "HTML Basics",
    title: "What is HTML?",
    bullets: [
      "HTML stands for HyperText Markup Language",
      "It's not a programming language, but a markup language",
      "Uses tags to define elements like headings, paragraphs, images",
      "Tells browsers how to display content",
      "Every website uses HTML",
    ],
    illustration: <WhatIsHtmlIllustration />,
  },

  // Slide 5: HTML Document Structure
  {
    type: "code-example",
    smallLabel: "HTML Structure",
    title: "HTML Document Structure",
    explanation: "Every HTML document follows a standard structure with essential elements.",
    fileName: "index.html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome!</h1>
  <p>This is my webpage.</p>
</body>
</html>`,
  },

  // Slide 6: Headings
  {
    type: "bullets-image",
    smallLabel: "HTML Elements",
    title: "Headings (h1 to h6)",
    bullets: [
      "Headings create hierarchy in your content",
      "h1 is the largest (main title)",
      "h6 is the smallest",
      "Use headings to organize sections",
      "Search engines use headings to understand content",
    ],
    illustration: <HeadingsIllustration />,
  },

  // Slide 7: Paragraphs
  {
    type: "code-example",
    smallLabel: "HTML Elements",
    title: "Paragraph Element",
    explanation: "Paragraphs are used to display blocks of text. Each paragraph automatically adds spacing.",
    fileName: "example.html",
    code: `<p>This is a paragraph of text.
It will wrap automatically
when the text is too long.</p>

<p>This is another paragraph.
Each paragraph is separated
by default spacing.</p>`,
    output: `This is a paragraph of text.
It will wrap automatically
when the text is too long.

This is another paragraph.
Each paragraph is separated
by default spacing.`,
  },

  // Slide 8: Links
  {
    type: "bullets-image",
    smallLabel: "HTML Elements",
    title: "Anchor Element - Links",
    bullets: [
      "Links connect pages together",
      "Use &lt;a&gt; tag with href attribute",
      "Can link to other websites or pages",
      "Essential for website navigation",
      "Users click links to move between pages",
    ],
    illustration: <LinksIllustration />,
  },

  // Slide 9: Images
  {
    type: "code-example",
    smallLabel: "HTML Elements",
    title: "Image Element",
    explanation: "Images make websites visual and engaging. Always include alt text for accessibility.",
    fileName: "example.html",
    code: `<img src="photo.jpg" 
     alt="Beautiful sunset">
     
<img src="logo.png" 
     alt="Company Logo" 
     width="200">`,
  },

  // Slide 10: Unordered Lists
  {
    type: "bullets-image",
    smallLabel: "HTML Elements",
    title: "Unordered Lists",
    bullets: [
      "Create bulleted lists with &lt;ul&gt;",
      "Each item uses &lt;li&gt; tag",
      "Perfect for navigation menus",
      "Great for feature lists",
      "No specific order required",
    ],
    illustration: <UnorderedListsIllustration />,
  },

  // Slide 11: Ordered Lists
  {
    type: "code-example",
    smallLabel: "HTML Elements",
    title: "Ordered Lists",
    explanation: "Ordered lists create numbered sequences. Perfect for step-by-step instructions.",
    fileName: "recipe.html",
    code: `<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix ingredients</li>
  <li>Pour into pan</li>
  <li>Bake for 30 minutes</li>
</ol>`,
    output: `1. Preheat oven to 350°F
2. Mix ingredients
3. Pour into pan
4. Bake for 30 minutes`,
  },

  // Slide 12: Div and Span
  {
    type: "bullets-image",
    smallLabel: "HTML Elements",
    title: "Div and Span",
    bullets: [
      "Div is a block-level container",
      "Span is an inline container",
      "Used for grouping and styling",
      "Div creates new lines, span doesn't",
      "Essential for layouts and CSS styling",
    ],
    illustration: <DivSpanIllustration />,
  },

  // Slide 13: Forms - Input
  {
    type: "code-example",
    smallLabel: "HTML Forms",
    title: "Form Input Elements",
    explanation: "Input elements allow users to enter data. Different types serve different purposes.",
    fileName: "form.html",
    code: `<form>
  <input type="text" 
         placeholder="Enter name">
  <input type="email" 
         placeholder="Email">
  <input type="password" 
         placeholder="Password">
  <button type="submit">
    Submit
  </button>
</form>`,
  },

  // Slide 14: Buttons
  {
    type: "bullets-image",
    smallLabel: "HTML Elements",
    title: "Button Element",
    bullets: [
      "Buttons trigger actions when clicked",
      "Use &lt;button&gt; tag",
      "Can submit forms or trigger JavaScript",
      "Essential for user interactions",
      "Make websites interactive",
    ],
    illustration: <ButtonIllustration />,
  },

  // Slide 15: Tables
  {
    type: "code-example",
    smallLabel: "HTML Elements",
    title: "Table Element",
    explanation: "Tables organize data into rows and columns. Perfect for structured information.",
    fileName: "data.html",
    code: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>Sarah</td>
    <td>30</td>
    <td>London</td>
  </tr>
</table>`,
  },

  // Slide 16: Semantic HTML
  {
    type: "bullets-image",
    smallLabel: "Modern HTML",
    title: "Semantic HTML",
    bullets: [
      "Semantic elements describe meaning",
      "Improves accessibility for screen readers",
      "Better SEO (search engines understand content)",
      "Examples: &lt;header&gt;, &lt;nav&gt;, &lt;article&gt;",
      "Makes code more maintainable",
    ],
    illustration: <SemanticHtmlIllustration />,
  },

  // Slide 17: Summary
  {
    type: "summary",
    title: "Key Takeaways",
    bullets: [
      "HTML structures web content using elements and tags",
      "Headings (h1-h6) create content hierarchy",
      "Paragraphs (&lt;p&gt;) display text blocks",
      "Links (&lt;a&gt;) connect pages together",
      "Images (&lt;img&gt;) add visuals to pages",
      "Lists organize information (ordered & unordered)",
      "Forms collect user input",
      "Tables organize structured data",
      "Semantic HTML improves accessibility and SEO",
    ],
    conclusion: "HTML is the foundation of web development. Practice building simple pages to master these elements!",
  },

  // Slide 18: Next Steps
  {
    type: "cover",
    title: "All The Best",
    subtitle: "Keep Learning & Practicing",
    illustration: <FinalCoverIllustration />,
  },
];

// Runtime validation
if (SLIDES.length !== SLIDE_COUNT) {
  throw new Error(
    `Slide count mismatch! Expected ${SLIDE_COUNT} slides, but got ${SLIDES.length}`
  );
}
