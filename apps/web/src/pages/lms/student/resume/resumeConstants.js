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
  achievementsMax: 10,
};

export const TEMPLATES = [
  { id: "clean", name: "ATS Friendly", style: "ats" },
];

export const INITIAL_DATA = {
  fullName: "",
  professionalTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  profilePhotoUrl: "",
  summary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  templateId: "clean",
};
