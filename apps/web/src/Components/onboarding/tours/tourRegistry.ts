/**
 * Tour registry: route patterns -> tour (key, version, steps).
 * Role-aware: students see student tours only.
 */

import { tourKey as homeKey, tourVersion as homeVer, steps as homeSteps } from "./student/lmsHomeTour";
import { tourKey as coursesKey, tourVersion as coursesVer, steps as coursesSteps } from "./student/lmsCoursesTour";
import { tourKey as courseDetailKey, tourVersion as courseDetailVer, steps as courseDetailSteps } from "./student/lmsCourseDetailTour";
import { tourKey as lessonKey, tourVersion as lessonVer, steps as lessonSteps } from "./student/lmsLessonTour";
import { tourKey as certKey, tourVersion as certVer, steps as certSteps } from "./student/lmsCertificationsTour";
import { tourKey as resumeKey, tourVersion as resumeVer, steps as resumeSteps } from "./student/lmsResumeTour";
import { tourKey as projectsKey, tourVersion as projectsVer, steps as projectsSteps } from "./student/lmsProjectsTour";
import { tourKey as clientLabKey, tourVersion as clientLabVer, steps as clientLabSteps } from "./student/lmsClientLabTour";
import { tourKey as packKey, tourVersion as packVer, steps as packSteps } from "./student/lmsPackTour";
import { tourKey as profileKey, tourVersion as profileVer, steps as profileSteps } from "./student/lmsProfileTour";

export type TourMeta = {
  tourKey: string;
  tourVersion: number;
  steps: import("../TourEngine").TourStep[];
  title: string;
  role: string;
};

const STUDENT_TOURS: TourMeta[] = [
  { tourKey: homeKey, tourVersion: homeVer, steps: homeSteps, title: "LMS Home", role: "Student" },
  { tourKey: coursesKey, tourVersion: coursesVer, steps: coursesSteps, title: "Courses", role: "Student" },
  { tourKey: courseDetailKey, tourVersion: courseDetailVer, steps: courseDetailSteps, title: "Course Detail", role: "Student" },
  { tourKey: lessonKey, tourVersion: lessonVer, steps: lessonSteps, title: "Lesson", role: "Student" },
  { tourKey: certKey, tourVersion: certVer, steps: certSteps, title: "Certifications", role: "Student" },
  { tourKey: resumeKey, tourVersion: resumeVer, steps: resumeSteps, title: "Resume Builder", role: "Student" },
  { tourKey: projectsKey, tourVersion: projectsVer, steps: projectsSteps, title: "Projects / Demo Day", role: "Student" },
  { tourKey: clientLabKey, tourVersion: clientLabVer, steps: clientLabSteps, title: "Real Client Lab", role: "Student" },
  { tourKey: packKey, tourVersion: packVer, steps: packSteps, title: "Pack Upgrade", role: "Student" },
  { tourKey: profileKey, tourVersion: profileVer, steps: profileSteps, title: "Profile", role: "Student" },
];

const ROUTE_PATTERNS: Array<{ pattern: RegExp; tour: TourMeta }> = [
  { pattern: /^\/lms\/student\/?$/, tour: STUDENT_TOURS[0] },
  { pattern: /^\/lms\/student\/courses\/list?\/?$/, tour: STUDENT_TOURS[1] },
  { pattern: /^\/lms\/student\/courses\/[^/]+$/i, tour: STUDENT_TOURS[2] },
  {
    pattern: /^\/lms\/student\/(courses|bonus-courses)\/[^/]+\/modules\/[^/]+\/lessons\/[^/]+/i,
    tour: STUDENT_TOURS[3],
  },
  { pattern: /^\/lms\/student\/certificates/i, tour: STUDENT_TOURS[4] },
  { pattern: /^\/lms\/student\/resume-builder/i, tour: STUDENT_TOURS[5] },
  { pattern: /^\/lms\/student\/submissions/i, tour: STUDENT_TOURS[6] },
  { pattern: /^\/lms\/student\/client-lab/i, tour: STUDENT_TOURS[7] },
  { pattern: /^\/lms\/student\/profile/i, tour: STUDENT_TOURS[9] },
];

// Pack tour: course detail when viewing a pack, or a dedicated pack route if any
const PACK_ROUTE = { pattern: /\/pack|\/checkout|packs?\//i, tour: STUDENT_TOURS[8] };

/**
 * Get tour for current pathname. Matches first route pattern.
 * pathname should be from React Router (e.g. location.pathname).
 */
export function getTourForRoute(
  pathname: string,
  _params?: Record<string, string>,
  userRole?: string
): { tourKey: string; tourVersion: number; steps: import("../TourEngine").TourStep[] } | null {
  const role = userRole || "Student";
  if (role !== "Student") return null;

  const normalized = pathname.replace(/\?.*$/, "");

  // Pack: often on course detail page with pack slug
  if (PACK_ROUTE.pattern.test(normalized)) {
    return {
      tourKey: PACK_ROUTE.tour.tourKey,
      tourVersion: PACK_ROUTE.tour.tourVersion,
      steps: PACK_ROUTE.tour.steps,
    };
  }

  for (const { pattern, tour } of ROUTE_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        tourKey: tour.tourKey,
        tourVersion: tour.tourVersion,
        steps: tour.steps,
      };
    }
  }

  // /lms/student/courses without /list -> courses list page
  if (/^\/lms\/student\/courses\/?$/.test(normalized)) {
    const coursesTour = STUDENT_TOURS[1];
    return {
      tourKey: coursesTour.tourKey,
      tourVersion: coursesTour.tourVersion,
      steps: coursesTour.steps,
    };
  }
  if (/^\/lms\/student\/bonus-courses\/?(\/list)?\/?$/.test(normalized)) {
    const coursesTour = STUDENT_TOURS[1];
    return {
      tourKey: coursesTour.tourKey,
      tourVersion: coursesTour.tourVersion,
      steps: coursesTour.steps,
    };
  }

  return null;
}

/**
 * List all tours available for a role (for Help / Tours page).
 */
export function listAllTours(userRole?: string): TourMeta[] {
  const role = userRole || "Student";
  return getToursByRole(role);
}

export function getToursByRole(role: string): TourMeta[] {
  if (role === "Student") return [...STUDENT_TOURS];
  return [];
}

/**
 * Get a single tour by key (for replay from Help).
 */
export function getTourByKey(tourKey: string, userRole?: string): TourMeta | null {
  const list = getToursByRole(userRole || "Student");
  return list.find((t) => t.tourKey === tourKey) || null;
}
