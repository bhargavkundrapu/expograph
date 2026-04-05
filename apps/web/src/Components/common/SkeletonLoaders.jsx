// Skeleton loading components for different page layouts

// Student Home Page Skeletons - matches StudentHome section colors (slate-50, white, #0b0f27 carousel)
export function StudentHomeSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-slate-50">
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 min-w-0 space-y-6 lg:space-y-8">
          {/* Welcome Header Skeleton */}
          <div className="mb-4 sm:mb-6 lg:mb-8 animate-pulse">
            <div className="h-9 sm:h-12 bg-slate-700/30 rounded-lg w-72 sm:w-96 mb-2"></div>
          </div>

          {/* Carousel Skeleton - navy #0b0f27 with subtle shimmer */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div
              className="relative h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden animate-pulse"
              style={{ background: "#0b0f27" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50" />
            </div>
          </div>

          {/* Schedule Section - white card + navy header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-24 sm:h-28 relative" style={{ background: "#0b0f27" }}>
              <div className="absolute inset-0 bg-slate-700/30 animate-pulse" />
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-slate-200 rounded w-16" />
                      <div className="h-3 bg-slate-200 rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - white cards */}
        <div className="w-full lg:w-72 xl:w-80 2xl:w-96 flex-shrink-0 space-y-4 sm:space-y-6">
          {/* Events Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-slate-700/40 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-12" />
            </div>
            <div className="h-4 bg-slate-200 rounded w-full mb-3" />
            <div className="h-5 bg-slate-200 rounded w-32" />
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-slate-700/40 rounded w-28" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <div className="h-10 sm:h-12 bg-slate-700/30 rounded w-16" />
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-200 rounded-full" />
            </div>
            <div className="h-14 bg-slate-100 border border-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Courses Page Skeleton
export function StudentCoursesSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-10 bg-slate-200 rounded w-96 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>

        {/* Courses Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              </div>
              <div className="h-3 bg-slate-200 rounded w-16 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div className="flex gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 bg-slate-200 rounded-full w-16"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Bookmarks Page Skeleton
export function StudentBookmarksSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none p-4 sm:p-6 lg:p-8 bg-slate-50 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-10 sm:h-12 bg-slate-200 rounded-lg w-64" />
          <div className="h-4 bg-slate-200 rounded w-80" />
        </div>

        {/* Bookmarked Lessons card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 bg-slate-200 rounded w-40" />
            <div className="h-6 bg-slate-200 rounded w-16" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
                <div className="w-6 h-6 rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Notes card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 bg-slate-200 rounded w-24" />
            <div className="h-6 bg-slate-200 rounded w-16" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-3">
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Certifications Page Skeleton
export function StudentCertificatesSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none p-4 sm:p-6 lg:p-8 bg-slate-50 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-10 sm:h-12 bg-slate-200 rounded-lg w-64" />
          <div className="h-4 bg-slate-200 rounded w-full max-w-md" />
          <div className="h-4 bg-slate-200 rounded w-3/4 max-w-sm" />
        </div>

        {/* How it works card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-40" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 bg-slate-200 rounded w-11/12" />
            ))}
          </div>
        </div>

        {/* Certifications list */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-6 bg-slate-200 rounded w-24" />
              </div>
              <div className="h-3 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-9 bg-slate-200 rounded w-32" />
                <div className="h-9 bg-slate-200 rounded w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Course Tree Skeleton
export function StudentCourseTreeSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-5 bg-slate-200 rounded w-32 mb-4"></div>
          <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
          <div className="h-10 bg-slate-200 rounded w-96"></div>
        </div>

        {/* Topics Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-16 mb-1"></div>
                  <div className="h-5 bg-slate-200 rounded w-48"></div>
                </div>
                <div className="w-5 h-5 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Lesson Skeleton - course-aware full page skeleton
export function StudentLessonSkeleton({ courseType }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 animate-pulse">
      <main className="flex-1 flex flex-col min-w-0">
        {/* Navbar skeleton - hidden on mobile */}
        <nav className="hidden md:block flex-shrink-0 bg-white border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="h-10 bg-slate-100 rounded w-52 ml-8"></div>
            <div className="flex items-center gap-6 mr-16">
              <div className="w-56 lg:w-72 h-10 bg-slate-50 border border-slate-200 rounded-lg"></div>
              <div className="h-5 bg-slate-100 rounded w-12"></div>
              <div className="h-5 bg-slate-100 rounded w-14"></div>
            </div>
          </div>
        </nav>

        {/* Mobile top bar skeleton */}
        <div className="flex md:hidden items-center gap-2 px-3 py-2 bg-white border-b border-slate-200">
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
          <div className="flex-1 min-w-0">
            <div className="h-3 bg-slate-100 rounded w-24 mb-1"></div>
            <div className="h-4 bg-slate-200 rounded w-40"></div>
          </div>
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar skeleton - desktop only */}
          <div className="hidden md:flex md:self-stretch md:min-h-0">
            <div className="w-72 lg:w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-slate-700 rounded"></div>
                <div className="h-5 bg-slate-700 rounded w-32"></div>
              </div>
              <div className="h-12 bg-slate-700/60 rounded-lg"></div>
              {/* Module with lessons */}
              <div className="space-y-1 mt-4">
                <div className="h-10 bg-slate-700/50 rounded-lg"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-9 bg-slate-700/30 rounded-lg ml-3"></div>
                ))}
              </div>
              <div className="space-y-1 mt-2">
                <div className="h-10 bg-slate-700/50 rounded-lg"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 bg-slate-700/30 rounded-lg ml-3"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Breadcrumb bar */}
            <div className="hidden md:block bg-white border-b border-slate-200">
              <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-2">
                <div className="h-4 bg-slate-200 rounded w-28"></div>
                <div className="h-4 bg-slate-100 rounded w-3"></div>
                <div className="h-4 bg-slate-200 rounded w-36"></div>
              </div>
            </div>

            {/* Content skeleton - course-specific */}
            <div className="flex-1 overflow-y-auto bg-white">
              <LessonContentSkeleton courseType={courseType} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generic Card Skeleton
export function CardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
        >
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  );
}

// Schedule Item Skeleton
export function ScheduleItemSkeleton({ count = 5 }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"></div>
      <div className="p-6 space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 animate-pulse">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
              <div className="flex items-center gap-2">
                <div className="h-5 bg-slate-200 rounded w-20"></div>
                <div className="h-4 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
            <div className="w-5 h-5 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lesson Content Skeleton (for content area only) - delegates to course-specific skeleton
export function LessonContentSkeleton({ courseType }) {
  if (courseType === "prompt-engineering") return <PromptEngineeringContentSkeleton />;
  if (courseType === "vibe-coding") return <VibeCodingContentSkeleton />;
  if (courseType === "ai-automations") return <AiAutomationsContentSkeleton />;
  if (courseType === "chatgpt-business") return <ChatGptBusinessContentSkeleton />;
  return <GenericLessonContentSkeleton />;
}

function ChatGptBusinessContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="px-4 md:px-8 pt-6 pb-8 space-y-5">
        {/* CBM-00 Lesson ID */}
        <div className="flex gap-2">
          <div className="h-6 bg-emerald-200 rounded-full w-16"></div>
          <div className="h-6 bg-slate-200 rounded w-48"></div>
        </div>
        {/* CBM-01 Outcome Goal - emerald/teal gradient */}
        <div className="bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-300/60 rounded-lg"></div>
            <div className="h-4 bg-emerald-300/50 rounded w-28"></div>
          </div>
          <div className="h-5 bg-emerald-200/50 rounded w-4/5"></div>
        </div>
        {/* CBM-02 Where You Use It - amber */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg"></div>
            <div className="h-4 bg-amber-200 rounded w-36"></div>
          </div>
          <div className="h-3 bg-amber-100 rounded w-full mb-2"></div>
          <div className="h-3 bg-amber-100 rounded w-3/4"></div>
        </div>
        {/* CBM-03 Inputs */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
            <div className="h-4 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 bg-slate-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        {/* CBM-04/05 Bad prompt + output - red */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="h-4 bg-red-200 rounded w-24 mb-3"></div>
          <div className="h-20 bg-red-100 rounded w-full"></div>
        </div>
        {/* CBM-06 Why Failed */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="h-4 bg-slate-200 rounded w-28 mb-3"></div>
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="h-3 bg-slate-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        {/* CBM-07/08 Good prompt + output - emerald */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="h-4 bg-emerald-200 rounded w-28 mb-3"></div>
          <div className="h-24 bg-emerald-100 rounded w-full"></div>
        </div>
        {/* CBM-09 Upgrade - violet */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-violet-100 rounded-lg"></div>
            <div className="h-4 bg-violet-200 rounded w-36"></div>
          </div>
          <div className="h-20 bg-violet-100 rounded w-full"></div>
        </div>
        {/* CBM-10 3 Variations - teal */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <div className="h-4 bg-teal-200 rounded w-28 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 bg-teal-100 rounded w-full"></div>
            ))}
          </div>
        </div>
        {/* CBM-11 Prompt Card - amber */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
          <div className="h-4 bg-amber-200 rounded w-36 mb-3"></div>
          <div className="h-24 bg-white border border-amber-200 rounded"></div>
        </div>
        {/* CBM-12 Guided Practice - sky */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <div className="h-4 bg-sky-200 rounded w-28 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-3 bg-sky-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        {/* CBM-13 Challenge - teal gradient */}
        <div className="bg-gradient-to-r from-teal-200 to-cyan-200 rounded-xl p-5">
          <div className="h-4 bg-white/40 rounded w-32 mb-2"></div>
          <div className="h-3 bg-white/30 rounded w-4/5"></div>
        </div>
        {/* CBM-14 Checklist */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="h-4 bg-slate-200 rounded w-28 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-4 h-4 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
        {/* CBM-15/16 Learned + Takeaway */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <div className="h-4 bg-emerald-200 rounded w-36 mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 bg-emerald-100 rounded w-full"></div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-6">
          <div className="h-4 bg-white/30 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

function AiAutomationsContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="px-4 md:px-8 pt-6 pb-8 space-y-5">
        {/* AA-01 Today's Win - teal gradient hero */}
        <div className="bg-gradient-to-br from-teal-200 via-cyan-100 to-sky-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-300/50 rounded-xl"></div>
            <div className="h-3 bg-teal-300/50 rounded w-20"></div>
          </div>
          <div className="h-6 bg-teal-300/40 rounded w-4/5 mb-2"></div>
          <div className="h-4 bg-teal-200/40 rounded w-3/5"></div>
        </div>

        {/* AA-02 Why Care - orange card */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-orange-100 rounded-xl"></div>
            <div className="h-4 bg-orange-200 rounded w-32"></div>
          </div>
          <div className="h-3 bg-orange-100 rounded w-full mb-2"></div>
          <div className="h-3 bg-orange-100 rounded w-3/4"></div>
          <div className="mt-3 p-3 bg-white/60 rounded-xl border border-orange-100">
            <div className="h-3 bg-orange-100 rounded w-4/5"></div>
          </div>
        </div>

        {/* AA-03 Simple Meaning - sky card */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-sky-100 rounded-xl"></div>
            <div className="h-4 bg-sky-200 rounded w-28"></div>
            <div className="h-5 bg-sky-100 rounded-full w-16"></div>
          </div>
          <div className="h-3 bg-sky-100 rounded w-full mb-2"></div>
          <div className="h-3 bg-sky-100 rounded w-2/3"></div>
          <div className="mt-3 p-3 bg-white/60 rounded-xl border border-sky-100">
            <div className="h-3 bg-sky-100 rounded w-3/4"></div>
          </div>
        </div>

        {/* AA-04 Where Used - indigo card */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl"></div>
            <div className="h-4 bg-indigo-200 rounded w-28"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/60 rounded-xl p-3 border border-indigo-100 flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-3 bg-indigo-200 rounded w-24 mb-1.5"></div>
                  <div className="h-3 bg-indigo-100 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-05 Flow - white with teal accents */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-100 rounded-xl"></div>
              <div className="h-4 bg-teal-200 rounded w-24"></div>
            </div>
          </div>
          <div className="p-5 flex flex-col md:flex-row gap-3">
            <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl p-3.5 h-16"></div>
            <div className="flex-[2] bg-slate-50 border border-slate-200 rounded-xl p-3.5 h-20"></div>
            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 h-16"></div>
          </div>
        </div>

        {/* AA-06 Tool Setup - emerald card */}
        <div className="bg-emerald-50/50 border-2 border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl"></div>
            <div className="h-4 bg-emerald-200 rounded w-20"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/70 rounded-xl p-3 border border-emerald-100 flex items-start gap-3">
                <div className="w-4 h-4 bg-emerald-200 rounded mt-0.5"></div>
                <div className="flex-1">
                  <div className="h-3 bg-emerald-200 rounded w-28 mb-1.5"></div>
                  <div className="h-3 bg-emerald-100 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-07 Build Steps - white with blue */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-xl"></div>
              <div className="h-4 bg-blue-200 rounded w-24"></div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
                <div className="h-3 bg-slate-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-08 Test - violet card */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-violet-100 rounded-xl"></div>
            <div className="h-4 bg-violet-200 rounded w-28"></div>
          </div>
          <div className="w-full bg-violet-200/50 rounded-full h-1.5 mb-4"></div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/60 rounded-xl p-3 border border-violet-100">
                <div className="h-3 bg-violet-200 rounded w-3/4 mb-1.5"></div>
                <div className="h-3 bg-violet-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-09 Mistakes - red card */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-red-100 rounded-xl"></div>
            <div className="h-4 bg-red-200 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white/70 rounded-xl p-3.5 border border-red-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 bg-red-100 rounded-full"></div>
                  <div className="h-3 bg-red-200 rounded w-40"></div>
                </div>
                <div className="h-3 bg-red-100 rounded w-full pl-7"></div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-10 Upgrade - dark gradient */}
        <div className="bg-gradient-to-br from-violet-200 via-indigo-200 to-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/30 rounded-xl"></div>
            <div className="h-4 bg-white/40 rounded w-28"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 bg-white/30 rounded w-3/4"></div>
            ))}
          </div>
          <div className="mt-4 p-3.5 bg-white/20 rounded-xl">
            <div className="h-3 bg-white/30 rounded w-4/5"></div>
          </div>
        </div>

        {/* AA-11 Mini Task - cyan gradient */}
        <div className="bg-gradient-to-r from-cyan-200 to-teal-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/30 rounded-xl"></div>
            <div className="h-4 bg-white/40 rounded w-20"></div>
          </div>
          <div className="h-3 bg-white/30 rounded w-4/5 mb-2"></div>
          <div className="h-3 bg-white/30 rounded w-2/3"></div>
        </div>

        {/* AA-12 Money Angle - amber gradient */}
        <div className="bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/30 rounded-xl"></div>
            <div className="h-4 bg-white/40 rounded w-24"></div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 mb-3">
            <div className="h-3 bg-white/30 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-white/40 rounded w-24"></div>
          </div>
          <div className="h-3 bg-white/30 rounded w-full"></div>
        </div>

        {/* AA-13 Key Notes - teal card */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-teal-100 rounded-xl"></div>
            <div className="h-4 bg-teal-200 rounded w-20"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-1.5"></div>
                <div className="h-3 bg-teal-100 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* AA-14 Quick Quiz - indigo card */}
        <div className="border-2 border-indigo-200 rounded-2xl p-5 bg-indigo-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl"></div>
            <div className="h-4 bg-indigo-200 rounded w-24"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-9 bg-white border border-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericLessonContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="px-4 md:px-8 pt-6 pb-6">
        <div className="bg-slate-50 border-l-4 border-slate-300 pl-4 py-3">
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="px-4 md:px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black overflow-hidden shadow-xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center" style={{ maxHeight: "450px" }}>
              <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 pb-8">
        <div className="border border-slate-300 bg-white">
          <div className="bg-slate-50 border-b border-slate-300 flex gap-0">
            <div className="px-5 py-3 bg-slate-200 w-32"></div>
            <div className="px-5 py-3 bg-slate-100 w-32"></div>
            <div className="px-5 py-3 bg-slate-100 w-40"></div>
          </div>
          <div className="p-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prompt Engineering course content skeleton - mirrors SEC-01 through SEC-14
function PromptEngineeringContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="px-4 md:px-8 pt-4 md:pt-6 pb-4 md:pb-8 space-y-5">

        {/* SEC-01 Goal - blue gradient card */}
        <div className="bg-gradient-to-r from-blue-500/80 to-indigo-500/80 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <div className="h-5 bg-white/25 rounded w-28"></div>
          </div>
          <div className="h-5 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/15 rounded w-2/3 mt-2"></div>
        </div>

        {/* SEC-02 Use Case - amber card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg"></div>
            <div className="h-5 bg-amber-200 rounded w-36"></div>
          </div>
          <div className="h-4 bg-amber-100 rounded w-full mb-2"></div>
          <div className="h-4 bg-amber-100 rounded w-4/5"></div>
          <div className="flex gap-2 mt-3">
            <div className="h-5 bg-amber-100 rounded-full w-16"></div>
            <div className="h-5 bg-amber-100 rounded-full w-14"></div>
            <div className="h-5 bg-amber-100 rounded-full w-20"></div>
          </div>
        </div>

        {/* SEC-03 Bad Prompt - red prompt block */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-36"></div>
            <div className="h-5 bg-red-100 rounded-full w-20"></div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-red-100 rounded w-full"></div>
            <div className="h-4 bg-red-100 rounded w-5/6"></div>
            <div className="h-4 bg-red-100 rounded w-3/4"></div>
          </div>
        </div>

        {/* SEC-04 Bad Output - red output */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-36"></div>
            <div className="h-5 bg-red-100 rounded-full w-24"></div>
          </div>
          <div className="border-l-4 border-l-red-300 bg-red-50/50 rounded-r-lg p-4 space-y-2">
            <div className="h-4 bg-red-100/70 rounded w-full"></div>
            <div className="h-4 bg-red-100/70 rounded w-4/5"></div>
          </div>
        </div>

        {/* SEC-05 Why Failed - slate card with reasons */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-red-100 rounded-full flex-shrink-0"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* SEC-06 Good Prompt - green prompt block */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-28"></div>
            <div className="h-5 bg-emerald-100 rounded-full w-20"></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-emerald-100 rounded w-full"></div>
            <div className="h-4 bg-emerald-100 rounded w-5/6"></div>
            <div className="h-4 bg-emerald-100 rounded w-4/5"></div>
            <div className="h-4 bg-emerald-100 rounded w-3/4"></div>
          </div>
          <div className="h-3 bg-emerald-100 rounded w-40 mt-2"></div>
        </div>

        {/* SEC-07 Good Output - green output */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-40"></div>
            <div className="h-5 bg-emerald-100 rounded-full w-24"></div>
          </div>
          <div className="border-l-4 border-l-emerald-300 bg-emerald-50/50 rounded-r-lg p-4 space-y-2">
            <div className="h-4 bg-emerald-100/70 rounded w-full"></div>
            <div className="h-4 bg-emerald-100/70 rounded w-5/6"></div>
            <div className="h-4 bg-emerald-100/70 rounded w-3/4"></div>
          </div>
        </div>

        {/* SEC-15 Best AI - recommendation card */}
        <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-400/80 to-teal-500/80 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <div>
              <div className="h-4 bg-white/25 rounded w-24 mb-1"></div>
              <div className="h-3 bg-white/15 rounded w-32"></div>
            </div>
          </div>
          <div className="bg-white p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 bg-slate-200 rounded w-20"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-14"></div>
                  <div className="h-4 bg-emerald-50 rounded-full w-10"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-9 bg-emerald-100 rounded-lg w-32 mt-3"></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="h-3 bg-slate-100 rounded w-28 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-7 bg-slate-50 border border-slate-200 rounded-lg w-20"></div>
                <div className="h-7 bg-slate-50 border border-slate-200 rounded-lg w-20"></div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-200/40">
              <div className="h-4 bg-amber-100/50 rounded w-full"></div>
            </div>
          </div>
        </div>

        {/* SEC-08 Upgrade - violet card */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-violet-100 rounded-lg"></div>
            <div className="h-5 bg-violet-200 rounded w-20"></div>
            <div className="h-5 bg-violet-100 rounded-full w-20"></div>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-violet-100 rounded w-full"></div>
            <div className="h-4 bg-violet-100 rounded w-5/6"></div>
            <div className="h-4 bg-violet-100 rounded w-4/5"></div>
          </div>
          <div className="h-4 bg-violet-100 rounded w-48 mt-3"></div>
        </div>

        {/* SEC-09 Guided Practice - sky card */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-sky-100 rounded-lg"></div>
            <div className="h-5 bg-sky-200 rounded w-28"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-sky-200 rounded-full flex-shrink-0"></div>
                <div className="h-4 bg-sky-100 rounded w-full pt-1"></div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-sky-200">
            <div className="h-4 bg-sky-100 rounded w-3/4"></div>
          </div>
        </div>

        {/* SEC-10 Challenge - cyan-teal gradient */}
        <div className="bg-gradient-to-r from-cyan-500/80 to-teal-400/80 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            <div className="h-5 bg-white/25 rounded w-36"></div>
          </div>
          <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
          <div className="h-4 bg-white/15 rounded w-4/5"></div>
        </div>

        {/* SEC-11 Checklist - white card */}
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
            <div className="h-5 bg-slate-200 rounded w-36"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 bg-slate-200 rounded mt-0.5"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* SEC-12 What You Learned - teal card */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg"></div>
            <div className="h-5 bg-teal-200 rounded w-28"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-teal-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="h-4 bg-teal-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* SEC-13 Mini Quiz - indigo card */}
        <div className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg"></div>
            <div className="h-5 bg-indigo-200 rounded w-24"></div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-indigo-100 rounded w-3/4 mb-2"></div>
              <div className="space-y-1.5">
                {["A", "B", "C"].map(l => (
                  <div key={l} className="h-9 bg-white border border-slate-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEC-14 Takeaway - dark gradient */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 text-center">
          <div className="h-5 w-5 bg-yellow-400/40 rounded mx-auto mb-2"></div>
          <div className="h-5 bg-white/15 rounded w-2/3 mx-auto"></div>
        </div>

        {/* Mark complete / Next */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <div className="h-10 bg-slate-100 border border-slate-200 rounded-md w-40"></div>
          <div className="h-10 bg-blue-100 rounded-md w-32"></div>
        </div>
      </div>
    </div>
  );
}

// Vibe Coding course content skeleton - mirrors VC-01 through VC-10
function VibeCodingContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      {/* Top sections: VC-01 to VC-04 */}
      <div className="px-4 md:px-8 pt-4 md:pt-6 pb-2 md:pb-4 space-y-5">

        {/* VC-01 Mission - blue-violet gradient */}
        <div className="bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-violet-600/80 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/15 rounded-xl"></div>
            <div className="h-3 bg-white/20 rounded w-20"></div>
          </div>
          <div className="h-6 bg-white/20 rounded w-full mb-2"></div>
          <div className="h-6 bg-white/15 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-2/3 mt-3"></div>
        </div>

        {/* VC-02 What You'll Build - white card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl"></div>
            <div className="h-5 bg-slate-200 rounded w-36"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-indigo-100 rounded-lg flex-shrink-0"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-5 bg-slate-100 rounded-full w-16"></div>
            ))}
          </div>
        </div>

        {/* VC-03 Prerequisites - amber card */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl"></div>
            <div className="h-5 bg-amber-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 bg-amber-200 rounded-full flex-shrink-0 mt-0.5"></div>
                <div className="h-4 bg-amber-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* VC-04 Workflow - white card with steps */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-xl"></div>
            <div className="h-5 bg-slate-200 rounded w-36"></div>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 bg-blue-500/60 rounded-full flex-shrink-0"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="w-4 h-4 bg-slate-200 rounded flex-shrink-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prompts Tabs skeleton */}
      <div className="px-4 md:px-8 pb-4 md:pb-8">
        <div className="mt-8 border border-slate-300 bg-white">
          <div className="bg-slate-50 border-b border-slate-300 flex gap-0">
            <div className="px-5 py-3 bg-slate-200 w-24"></div>
            <div className="px-5 py-3 bg-slate-100 w-28"></div>
            <div className="px-5 py-3 bg-slate-100 w-32"></div>
          </div>
          <div className="p-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* VC-05 Success Criteria - emerald */}
      <div className="px-4 md:px-8 pb-4 md:pb-6">
        <div className="rounded-2xl p-5 border-2 border-emerald-200 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl"></div>
            <div className="h-5 bg-emerald-200 rounded w-36"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 bg-emerald-200 rounded mt-0.5"></div>
                <div className="h-4 bg-emerald-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success images placeholder */}
      <div className="px-4 md:px-8 pb-4 md:pb-8">
        <div className="mt-4">
          <div className="h-5 bg-slate-200 rounded w-36 mb-3"></div>
          <div className="border border-slate-200 bg-slate-100 h-48 md:h-64"></div>
        </div>
      </div>

      {/* Bottom sections: VC-06 to VC-10 */}
      <div className="px-4 md:px-8 pb-4 md:pb-8 space-y-5">

        {/* VC-06 Under the Hood - slate collapsible */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="w-9 h-9 bg-slate-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-5 bg-slate-200 rounded w-32 mb-1"></div>
              <div className="h-3 bg-slate-100 rounded w-44"></div>
            </div>
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
          </div>
        </div>

        {/* VC-07 Pro Tips - violet */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-violet-100 rounded-xl"></div>
            <div className="h-5 bg-violet-200 rounded w-20"></div>
            <div className="h-5 bg-violet-100 rounded-full w-16"></div>
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 bg-violet-200 rounded flex-shrink-0 mt-0.5"></div>
                <div className="h-4 bg-violet-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* VC-08 Common Pitfalls - red */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-red-100 rounded-xl"></div>
            <div className="h-5 bg-red-200 rounded w-28"></div>
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="bg-white/70 rounded-xl p-3.5 border border-red-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-100 rounded-full"></div>
                  <div className="h-4 bg-red-100 rounded w-3/4"></div>
                </div>
                <div className="h-4 bg-red-50 rounded w-full ml-7"></div>
              </div>
            ))}
          </div>
        </div>

        {/* VC-09 Level Up - purple gradient */}
        <div className="bg-gradient-to-r from-purple-500/80 to-indigo-600/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/15 rounded-xl"></div>
            <div className="h-5 bg-white/20 rounded w-36"></div>
          </div>
          <div className="h-4 bg-white/15 rounded w-full mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-4/5"></div>
        </div>

        {/* VC-10 Checkpoint - dark slate */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-xl"></div>
              <div className="h-5 bg-white/15 rounded w-32"></div>
            </div>
            <div className="h-5 bg-white/10 rounded-full w-10"></div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-4"></div>
          <div className="space-y-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 bg-white/10 rounded mt-0.5"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mark complete / Next */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <div className="h-10 bg-slate-100 border border-slate-200 rounded-md w-40"></div>
          <div className="h-10 bg-blue-100 rounded-md w-32"></div>
        </div>
      </div>
    </div>
  );
}

// Courses page skeleton (for /courses route - dark theme, premium pricing layout)
export function CoursesPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse">
      {/* Heading Skeleton */}
      <div className="mx-auto mb-12 sm:mb-14 max-w-2xl text-center">
        <div className="h-9 sm:h-10 bg-white/10 rounded-xl mx-auto w-72 sm:w-80 mb-3 sm:mb-4" />
        <div className="h-4 bg-white/10 rounded w-64 sm:w-72 mx-auto mb-2" />
        <div className="h-4 bg-white/10 rounded w-80 sm:w-96 mx-auto" />
      </div>

      {/* Packs Section Skeleton */}
      <div className="mb-14 sm:mb-16">
        <div className="h-4 bg-white/10 rounded w-28 mb-5 sm:mb-6" />
        <div className="grid gap-5 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-white/10 rounded-2xl bg-white/[0.03] aspect-[4/3] min-h-[260px] sm:min-h-[280px] flex flex-col p-6 sm:p-7"
            >
              <div className="h-6 sm:h-7 bg-white/10 rounded-lg w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-full mb-2" />
              <div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
              <div className="h-8 sm:h-9 bg-white/10 rounded w-24 mb-6" />
              <div className="space-y-2.5 flex-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-white/10 rounded w-full" />
                ))}
              </div>
              <div className="h-11 sm:h-12 bg-white/10 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section Skeleton */}
      <div>
        <div className="h-4 bg-white/10 rounded w-36 mb-5 sm:mb-6" />
        <div className="grid gap-5 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-white/10 rounded-2xl bg-white/[0.02] aspect-[4/3] min-h-[260px] sm:min-h-[280px] flex flex-col p-6 sm:p-7"
            >
              <div className="h-6 sm:h-7 bg-white/10 rounded-lg w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-full mb-2" />
              <div className="h-8 sm:h-9 bg-white/10 rounded w-20 mb-6" />
              <div className="space-y-2.5 flex-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-white/10 rounded w-full" />
                ))}
              </div>
              <div className="h-11 sm:h-12 bg-white/10 rounded-xl w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generic Page Skeleton (for pages without specific skeletons)
export function GenericPageSkeleton() {
  return (
    <div className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-slate-50 p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-slate-200 rounded w-64 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded w-96"></div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Full LaunchPad-shaped skeleton — matches StartupLaunchPadShell (light gradient) so LMS main area doesn’t show dark chrome behind a loader. */
export function LaunchPadLoadingSkeleton() {
  return (
    <div
      className="min-h-screen rounded-t-3xl overflow-hidden md:rounded-none bg-gradient-to-b from-slate-50 via-white to-slate-100 animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-2.5 w-24 rounded bg-slate-200" />
            <div className="h-5 w-44 sm:w-56 max-w-full rounded bg-slate-200" />
          </div>
          <div className="h-10 w-24 sm:w-32 shrink-0 rounded-xl bg-slate-200" />
        </div>
        <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-3 sm:mt-4 pt-0.5 pb-2 flex gap-1 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-9 w-[4.5rem] sm:w-20 shrink-0 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 pb-28 md:pb-10 space-y-4">
        <div className="h-8 w-48 max-w-[80%] rounded-lg bg-slate-200" />
        <div className="h-4 w-full max-w-2xl rounded bg-slate-200" />
        <div className="h-4 w-[85%] max-w-xl rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm space-y-3"
            >
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-5/6 rounded bg-slate-200" />
              <div className="h-8 w-24 rounded-lg bg-slate-200 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// App route-level skeleton fallback (used by lazy-loaded routes)
export function RouteFallbackSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] p-6 animate-pulse">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-8 w-48 rounded-lg bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
}
