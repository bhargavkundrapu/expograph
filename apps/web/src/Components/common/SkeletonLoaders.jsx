// Skeleton loading components for different page layouts

// Student Home Page Skeletons
export function StudentHomeSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-12 bg-slate-200 rounded w-96 mb-3"></div>
          <div className="h-6 bg-slate-200 rounded w-64"></div>
        </div>

        {/* Carousel Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-60 bg-slate-200 rounded-[24px]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Schedule Skeleton */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="h-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"></div>
              <div className="p-6 space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 bg-slate-200 rounded w-20"></div>
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning Skeleton */}
            <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-lg p-8 animate-pulse">
              <div className="h-8 bg-white/20 rounded w-48 mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-64 mb-4"></div>
              <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
              <div className="h-10 bg-white/20 rounded w-full"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Events Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-slate-200 rounded w-20"></div>
                <div className="h-4 bg-slate-200 rounded w-12"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
              <div className="h-5 bg-slate-200 rounded w-32"></div>
            </div>

            {/* Leaderboard Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-slate-200 rounded w-28"></div>
                <div className="h-4 bg-slate-200 rounded w-12"></div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                  <div className="h-3 bg-slate-200 rounded w-48"></div>
                </div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>

            {/* Learning Consistency Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="h-6 bg-slate-200 rounded w-40"></div>
                <div className="h-6 bg-slate-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-full mb-6"></div>
              <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-6">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-200 rounded"></div>
                    <div className="h-8 bg-slate-200 rounded w-8"></div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded w-24"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-200 rounded"></div>
                    <div className="h-8 bg-slate-200 rounded w-8"></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-slate-200 rounded w-32"></div>
                  <div className="h-8 bg-slate-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-32 mb-4"></div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-200 rounded border border-slate-200"></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-32 mb-4"></div>
              <div className="h-12 bg-slate-200 rounded w-24 mb-6"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Courses Page Skeleton
export function StudentCoursesSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
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

// Student Course Tree Skeleton
export function StudentCourseTreeSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
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

// Student Lesson Skeleton
export function StudentLessonSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-900 p-4">
          <div className="h-10 bg-slate-700 rounded mb-4"></div>
          <div className="h-16 bg-slate-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-6xl mx-auto p-8">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-4 bg-slate-200 rounded w-24"></div>
              <div className="h-4 bg-slate-200 rounded w-4"></div>
              <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>

            {/* Video Player Skeleton */}
            <div className="bg-black rounded-lg shadow-xl mb-8" style={{ aspectRatio: '16/9' }}>
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
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

// Lesson Content Skeleton (for content area only)
export function LessonContentSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      {/* Goal Section Skeleton */}
      <div className="px-8 pt-8 pb-6">
        <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <div className="w-6 h-6 bg-amber-200 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-amber-200 rounded w-32"></div>
            <div className="h-4 bg-amber-200 rounded w-full"></div>
            <div className="h-4 bg-amber-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Video Player Skeleton */}
      <div className="px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black overflow-hidden shadow-xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center" style={{ maxHeight: "450px" }}>
              <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Presentation Skeleton */}
      <div className="px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-100 border border-slate-300 h-[600px] flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-slate-300 rounded mx-auto"></div>
              <div className="h-4 bg-slate-300 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompts Section Skeleton */}
      <div className="px-8 pb-8">
        <div className="border border-slate-300 bg-white rounded-none">
          {/* Tabs Skeleton */}
          <div className="bg-slate-50 border-b border-slate-300 flex gap-0">
            <div className="px-5 py-3 bg-slate-200 w-32"></div>
            <div className="px-5 py-3 bg-slate-100 w-32"></div>
            <div className="px-5 py-3 bg-slate-100 w-40"></div>
          </div>
          {/* Content Skeleton */}
          <div className="p-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generic Page Skeleton (for pages without specific skeletons)
export function GenericPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 animate-pulse">
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
