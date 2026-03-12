/** Shared resume data shape for templates and export */
export interface ResumeEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ResumeExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeProject {
  name: string;
  description?: string;
  technologies?: string;
  link?: string;
  bullets: string[];
}

export interface ResumeCertification {
  name: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
}

export interface ResumeData {
  fullName: string;
  /** Optional job title shown in header (e.g. "Marketing Manager") */
  professionalTitle?: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  profilePhotoUrl?: string;
  summary?: string;
  skills: string[] | { name?: string }[];
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  achievements?: string[];
}
