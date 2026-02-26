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
