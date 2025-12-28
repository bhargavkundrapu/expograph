const repo = require("./internships.repo");
const { HttpError } = require("../../utils/httpError");

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function isUniqueViolation(err) {
  return err && err.code === "23505";
}

async function createProjectDraft({ tenantId, title, slug, track, difficulty, brief, skills, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");
  // keep it simple: no retry loop now; add later if needed
  return repo.createProject({ tenantId, title, slug: base, track, difficulty, brief, skills, createdBy });
}

async function approveApplication({ tenantId, applicationId, mentorId }) {
  if (!mentorId) throw new HttpError(400, "Mentor is required");

  try {
    const result = await repo.approveApplicationCreateAssignment({ tenantId, applicationId, mentorId });

    if (!result.assignment) {
      // could be: already approved/rejected OR seats full
      throw new HttpError(409, "Cannot approve: either seats full or application not in 'applied' state");
    }

    return result;
  } catch (e) {
    // active assignment uniqueness or double-apply uniqueness
    if (isUniqueViolation(e)) {
      throw new HttpError(409, "Student already has an active assignment or already applied");
    }
    throw e;
  }
}

module.exports = {
  slugify,
  createProjectDraft,
  approveApplication,
  ...repo,
};
