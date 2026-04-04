/**
 * India-first B.Tech role taxonomy: Category → SubRole → keyword bundles + platform hints.
 */

/** @typedef {{ id: string; label: string; defaultKeywords: string[]; optionalKeywords: string[]; recommendedPlatforms: string[] }} SubRole */

/** @typedef {{ id: string; label: string; subRoles: SubRole[] }} RoleCategory */

/** @type {RoleCategory[]} */
export const roleTaxonomy = [
  {
    id: "software-it",
    label: "Software & IT",
    subRoles: [
      {
        id: "frontend-developer",
        label: "Frontend Developer",
        defaultKeywords: ["react", "javascript", "frontend developer"],
        optionalKeywords: ["typescript", "css", "html", "next.js"],
        recommendedPlatforms: ["linkedin", "naukri", "internshala"],
      },
      {
        id: "full-stack",
        label: "Full Stack",
        defaultKeywords: ["mern", "node.js", "react", "full stack developer"],
        optionalKeywords: ["mongodb", "express", "typescript"],
        recommendedPlatforms: ["linkedin", "naukri", "wellfound"],
      },
      {
        id: "qa",
        label: "QA / Testing",
        defaultKeywords: ["manual testing", "selenium", "qa intern"],
        optionalKeywords: ["automation", "jira", "api testing"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
      {
        id: "devops-cloud",
        label: "DevOps / Cloud",
        defaultKeywords: ["aws", "docker", "devops", "cloud intern"],
        optionalKeywords: ["kubernetes", "ci cd", "terraform"],
        recommendedPlatforms: ["linkedin", "naukri", "cutshort"],
      },
      {
        id: "data-analyst",
        label: "Data Analyst",
        defaultKeywords: ["python", "sql", "power bi", "data analyst"],
        optionalKeywords: ["excel", "tableau", "analytics"],
        recommendedPlatforms: ["linkedin", "naukri", "indeed"],
      },
      {
        id: "cybersecurity",
        label: "Cybersecurity",
        defaultKeywords: ["soc analyst", "security intern"],
        optionalKeywords: ["network security", "ceh", "siem"],
        recommendedPlatforms: ["linkedin", "naukri", "indeed"],
      },
    ],
  },
  {
    id: "ece-eee",
    label: "ECE / EEE",
    subRoles: [
      {
        id: "embedded",
        label: "Embedded Systems",
        defaultKeywords: ["embedded c", "stm32", "iot", "embedded engineer"],
        optionalKeywords: ["rtos", "microcontroller", "firmware"],
        recommendedPlatforms: ["naukri", "linkedin", "shine"],
      },
      {
        id: "vlsi",
        label: "VLSI",
        defaultKeywords: ["verilog", "systemverilog", "vlsi", "physical design"],
        optionalKeywords: ["fpga", "asic", "synopsys"],
        recommendedPlatforms: ["linkedin", "naukri", "hirist"],
      },
      {
        id: "pcb-design",
        label: "PCB / Hardware",
        defaultKeywords: ["altium", "pcb design", "hardware engineer"],
        optionalKeywords: ["circuit design", "electronics"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
      {
        id: "network-engineer",
        label: "Network Engineer",
        defaultKeywords: ["ccna", "network engineer"],
        optionalKeywords: ["routing", "switching", "firewall"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
    ],
  },
  {
    id: "mechanical",
    label: "Mechanical",
    subRoles: [
      {
        id: "design-engineer",
        label: "Design Engineer",
        defaultKeywords: ["solidworks", "catia", "design engineer"],
        optionalKeywords: ["cad", "mechanical design"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
      {
        id: "production-quality",
        label: "Production / Quality",
        defaultKeywords: ["production engineer", "quality", "manufacturing"],
        optionalKeywords: ["six sigma", "shop floor"],
        recommendedPlatforms: ["naukri", "shine", "foundit"],
      },
    ],
  },
  {
    id: "civil",
    label: "Civil",
    subRoles: [
      {
        id: "site-engineer",
        label: "Site Engineer",
        defaultKeywords: ["site engineer", "planning", "boq"],
        optionalKeywords: ["construction", "civil engineer"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
      {
        id: "estimation-autocad",
        label: "Estimation / AutoCAD",
        defaultKeywords: ["autocad", "estimation", "billing engineer"],
        optionalKeywords: ["civil draftsman", "quantity surveyor"],
        recommendedPlatforms: ["naukri", "indeed", "shine"],
      },
    ],
  },
  {
    id: "business",
    label: "Business (B.Tech common)",
    subRoles: [
      {
        id: "business-analyst",
        label: "Business Analyst",
        defaultKeywords: ["business analyst", "excel", "sql"],
        optionalKeywords: ["requirements", "stakeholder"],
        recommendedPlatforms: ["linkedin", "naukri", "indeed"],
      },
      {
        id: "product-intern",
        label: "Product Intern",
        defaultKeywords: ["product intern", "analytics", "roadmap"],
        optionalKeywords: ["prd", "user research"],
        recommendedPlatforms: ["linkedin", "internshala", "cutshort"],
      },
      {
        id: "sales-engineer",
        label: "Sales Engineer",
        defaultKeywords: ["sales engineer", "pre-sales", "field engineer"],
        optionalKeywords: ["b2b", "technical sales"],
        recommendedPlatforms: ["naukri", "linkedin", "indeed"],
      },
      {
        id: "technical-support",
        label: "Technical Support",
        defaultKeywords: ["technical support", "customer support", "it support"],
        optionalKeywords: ["helpdesk", "ticketing"],
        recommendedPlatforms: ["naukri", "indeed", "foundit"],
      },
    ],
  },
];

export const ALL_PLATFORM_IDS = [
  "linkedin",
  "naukri",
  "indeed",
  "internshala",
  "foundit",
  "shine",
  "freshersworld",
  "cutshort",
  "wellfound",
  "timesjobs",
  "hirist",
];

/** @type {Record<string, { label: string; domain: string }>} */
export const platformMeta = {
  linkedin: { label: "LinkedIn", domain: "linkedin.com" },
  naukri: { label: "Naukri", domain: "naukri.com" },
  indeed: { label: "Indeed", domain: "indeed.com" },
  internshala: { label: "Internshala", domain: "internshala.com" },
  foundit: { label: "Foundit", domain: "foundit.in" },
  shine: { label: "Shine", domain: "shine.com" },
  freshersworld: { label: "Freshersworld", domain: "freshersworld.com" },
  cutshort: { label: "CutShort", domain: "cutshort.io" },
  wellfound: { label: "Wellfound", domain: "wellfound.com" },
  timesjobs: { label: "TimesJobs", domain: "timesjobs.com" },
  hirist: { label: "Hirist", domain: "hirist.tech" },
};

/**
 * @param {string} categoryId
 * @param {string} subRoleId
 * @returns {SubRole | null}
 */
export function getSubRole(categoryId, subRoleId) {
  const cat = roleTaxonomy.find((c) => c.id === categoryId);
  if (!cat) return null;
  return cat.subRoles.find((s) => s.id === subRoleId) ?? null;
}

/**
 * @param {string} categoryId
 * @returns {SubRole[]}
 */
export function getSubRolesForCategory(categoryId) {
  const cat = roleTaxonomy.find((c) => c.id === categoryId);
  return cat ? cat.subRoles : [];
}
