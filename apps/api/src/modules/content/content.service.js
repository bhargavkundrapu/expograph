// apps/api/src/modules/content/content.service.js
const { HttpError } = require("../../utils/httpError");
const repo = require("./content.repo");

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

async function createCourseSmart({ tenantId, title, slug, description, level, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createCourse({ tenantId, title, slug: candidate, description, level, status: "draft", createdBy });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique slug");
}

async function createModuleSmart({ tenantId, courseId, title, slug, position, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createModule({ tenantId, courseId, title, slug: candidate, position, status: "draft", createdBy });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique module slug");
}

async function createLessonSmart({ tenantId, moduleId, title, slug, summary, position, goal, video_url, prompts, success_image_url, pdf_url = null, createdBy }) {
  const base = slug ? slugify(slug) : slugify(title);
  if (!base) throw new HttpError(400, "Invalid title/slug");

  const pdfUrl = pdf_url ?? null;

  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? base : `${base}-${Math.random().toString(16).slice(2, 6)}`;
    try {
      return await repo.createLesson({ 
        tenantId, 
        moduleId, 
        title, 
        slug: candidate, 
        summary, 
        position, 
        goal,
        video_url,
        prompts,
        success_image_url,
        pdf_url: pdfUrl,
        status: "draft", 
        createdBy 
      });
    } catch (e) {
      if (isUniqueViolation(e)) continue;
      throw e;
    }
  }
  throw new HttpError(500, "Could not create unique lesson slug");
}
async function updateCourse({ tenantId, courseId, patch, updatedBy }) {
  return repo.updateCourse({ tenantId, courseId, patch, updatedBy });
}
async function updateModule({ tenantId, moduleId, patch, updatedBy }) {
  return repo.updateModule({ tenantId, moduleId, patch, updatedBy });
}

async function updateLesson({ tenantId, lessonId, patch, updatedBy }) {
  return repo.updateLesson({ tenantId, lessonId, patch, updatedBy });
}
async function updateResource({ tenantId, resourceId, patch, updatedBy }) {
  return repo.updateResource({ tenantId, resourceId, patch, updatedBy });
}

async function updatePractice({ tenantId, practiceId, patch, updatedBy }) {
  return repo.updatePractice({ tenantId, practiceId, patch, updatedBy });
}

async function updateMcq({ tenantId, mcqId, patch, updatedBy }) {
  return repo.updateMcq({ tenantId, mcqId, patch, updatedBy });
}

async function updateSlide({ tenantId, slideId, patch, updatedBy }) {
  return repo.updateSlide({ tenantId, slideId, patch, updatedBy });
}

async function addMcq({ tenantId, lessonId, question, options, explanation, sortOrder, createdBy }) {
  return repo.addMcq({ tenantId, lessonId, question, options, explanation, sortOrder, createdBy });
}

async function addSlide({ tenantId, lessonId, title, content, slideNumber, imageUrl, sortOrder, createdBy }) {
  return repo.addSlide({ tenantId, lessonId, title, content, slideNumber, imageUrl, sortOrder, createdBy });
}

async function deleteMcq({ tenantId, mcqId }) {
  return repo.deleteMcq({ tenantId, mcqId });
}

async function deleteSlide({ tenantId, slideId }) {
  return repo.deleteSlide({ tenantId, slideId });
}

async function deleteResource({ tenantId, resourceId }) {
  return repo.deleteResource({ tenantId, resourceId });
}

async function deletePractice({ tenantId, practiceId }) {
  return repo.deletePractice({ tenantId, practiceId });
}

async function deleteCourse({ tenantId, courseId }) {
  return repo.deleteCourse({ tenantId, courseId });
}

async function deleteModule({ tenantId, moduleId }) {
  return repo.deleteModule({ tenantId, moduleId });
}

async function deleteLesson({ tenantId, lessonId }) {
  return repo.deleteLesson({ tenantId, lessonId });
}

module.exports = {
  createCourseSmart,
  createModuleSmart,
  createLessonSmart,
  updateCourse,
  updateModule,
  updateLesson,
  updateResource,
  updatePractice,
  updateMcq,
  updateSlide,
  addMcq,
  addSlide,
  deleteMcq,
  deleteSlide,
  deleteResource,
  deletePractice,
  deleteCourse,
  deleteModule,
  deleteLesson,
  ...repo,
};
