const z = require("zod");

const urlSchema = z.union([z.literal(""), z.string().url().max(500)]).optional().default("");
const singleLineSchema = (max) => z.string().max(max).optional().default("");

const educationItem = z.object({
  institution: singleLineSchema(200),
  degree: singleLineSchema(200),
  field: singleLineSchema(200),
  startDate: singleLineSchema(50),
  endDate: singleLineSchema(50),
  gpa: singleLineSchema(20),
});
const experienceItem = z.object({
  company: singleLineSchema(200),
  position: singleLineSchema(200),
  startDate: singleLineSchema(50),
  endDate: singleLineSchema(50),
  bullets: z.array(z.string().max(400)).max(6).optional().default([]),
});
const projectItem = z.object({
  name: singleLineSchema(200),
  description: singleLineSchema(500),
  technologies: singleLineSchema(200),
  link: urlSchema,
  bullets: z.array(z.string().max(400)).max(5).optional().default([]),
});
const certificationItem = z.object({
  name: singleLineSchema(200),
  issuer: singleLineSchema(200),
  date: singleLineSchema(50),
  credentialId: singleLineSchema(100),
});

const ResumeDataSchema = z.object({
  fullName: z.string().max(150).min(1),
  email: z.string().email().max(200),
  phone: singleLineSchema(80),
  linkedinUrl: urlSchema,
  githubUrl: urlSchema,
  portfolioUrl: urlSchema,
  summary: z.string().max(600).optional().default(""),
  skills: z
    .array(z.union([z.string().max(200), z.object({ name: z.string().max(200) })]))
    .max(15)
    .optional()
    .default([]),
  education: z.array(educationItem).max(5).optional().default([]),
  experience: z.array(experienceItem).max(5).optional().default([]),
  projects: z.array(projectItem).max(6).optional().default([]),
  certifications: z.array(certificationItem).max(8).optional().default([]),
});

const ALLOWED_TEMPLATE_IDS = [
  "modern",
  "classic",
  "modern-2",
  "classic-2",
  "modern-3",
  "classic-3",
  "modern-4",
  "classic-4",
];

const ResumePdfBodySchema = z.object({
  templateId: z.enum(ALLOWED_TEMPLATE_IDS),
  data: ResumeDataSchema,
});

function validateResumePdfBody(body) {
  return ResumePdfBodySchema.safeParse(body);
}

module.exports = {
  ResumeDataSchema,
  ResumePdfBodySchema,
  validateResumePdfBody,
  ALLOWED_TEMPLATE_IDS,
};
