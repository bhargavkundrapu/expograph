export const LIMITS = {
  summary: 600,
  skillField: 200,
  skillsMax: 15,
  educationMax: 5,
  experienceMax: 5,
  experienceBulletsMax: 6,
  projectsMax: 6,
  projectBulletsMax: 5,
  certificationsMax: 8,
};

export const TEMPLATES = [
  { id: "modern", name: "Modern", style: "modern" },
  { id: "classic", name: "Classic", style: "classic" },
  { id: "modern-2", name: "Modern II", style: "modern" },
  { id: "classic-2", name: "Classic II", style: "classic" },
  { id: "modern-3", name: "Modern III", style: "modern" },
  { id: "classic-3", name: "Classic III", style: "classic" },
  { id: "modern-4", name: "Modern IV", style: "modern" },
  { id: "classic-4", name: "Classic IV", style: "classic" },
];

export const INITIAL_DATA = {
  fullName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  summary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
};
