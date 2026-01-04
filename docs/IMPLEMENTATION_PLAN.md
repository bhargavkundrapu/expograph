# ExpoGraph - Next Phase Implementation Plan

## 📊 Current Status Analysis

### ✅ **What's Already Working**

1. **Backend APIs (All Ready)**
   - ✅ Progress tracking: `/api/v1/lms/lessons/:lessonId/start`, `/progress`, `/complete`
   - ✅ Progress summary: `/api/v1/lms/progress/summary`
   - ✅ Submissions: Student submit + mentor queue endpoints exist
   - ✅ Mentor review: `/api/v1/mentor/submissions/queue` + `/api/v1/mentor/submissions/:id/review`

2. **Frontend Pages (Partially Complete)**
   - ✅ Student lesson page exists (`StudentLesson.jsx`) - but **video player NOT rendered**
   - ✅ Student submissions page exists and works (`StudentSubmissions.jsx`)
   - ❌ Mentor queue UI missing (MentorHome is placeholder)
   - ❌ Progress dashboard missing (StudentHome is placeholder)

3. **Infrastructure**
   - ✅ Cloudflare Stream integration ready (video_id stored in lessons)
   - ✅ LocalStorage progress helpers exist in StudentLesson
   - ✅ Progress API functions exist (`progressApi.js`)

---

## 🎯 Implementation Tasks (Priority Order)

### **Phase 1: Video Player + Resume (HIGH PRIORITY)**

**File:** `apps/web/src/pages/lms/student/StudentLesson.jsx`

**What to Add:**
1. Render Cloudflare Stream player when `lesson.video_provider === "cloudflare_stream"` and `lesson.video_id` exists
2. Implement resume functionality:
   - On mount: Read `last_position_seconds` from backend progress OR localStorage
   - Set player's `currentTime` to resume position
   - Listen to player's `timeupdate` events (throttle to ~5-10 seconds)
   - Call `updateLessonProgress()` with `watchSecondsDelta` and `lastPositionSeconds`
3. Handle edge cases:
   - No video attached → show message
   - Video loading state
   - Error handling for Stream player

**Backend:** Already ready ✅

**Estimated Time:** 2-3 hours

---

### **Phase 2: Mentor Review Queue UI (HIGH PRIORITY)**

**Files to Create/Update:**
- `apps/web/src/pages/lms/mentor/MentorSubmissionsQueue.jsx` (new)
- `apps/web/src/app/router.jsx` (add route)

**What to Build:**
1. **Queue List Page** (`/lms/mentor/submissions`)
   - Fetch from `/api/v1/mentor/submissions/queue`
   - Display: Task title, student email, submission content, status badge, submitted date
   - Filter/sort: By status, date
   - Click to open review modal/page

2. **Review Modal/Page** (`/lms/mentor/submissions/:id`)
   - Show full submission content (code/text)
   - Form fields:
     - Score (0-100, optional)
     - Feedback (required, textarea)
     - Decision dropdown: `in_review`, `approved`, `changes_requested`
   - Submit to `/api/v1/mentor/submissions/:id/review`
   - After submit: Refresh queue list

**Backend:** Already ready ✅

**Estimated Time:** 3-4 hours

---

### **Phase 3: Student Progress Dashboard (MEDIUM PRIORITY)**

**File:** `apps/web/src/pages/lms/student/StudentHome.jsx`

**What to Build:**
1. **Progress Summary Cards**
   - Completed lessons count
   - In-progress lessons count
   - Total watch time (format: hours:minutes)
   - Fetch from `/api/v1/lms/progress/summary`

2. **Recent Activity**
   - Recently completed lessons (last 5)
   - Recently started lessons (last 5)
   - Link to full course tree

3. **Quick Actions**
   - "Continue Learning" → link to last in-progress lesson
   - "View All Courses" → link to `/lms/student/courses`
   - "My Submissions" → link to `/lms/student/submissions`

**Backend:** Already ready ✅ (may need to extend summary endpoint for recent activity)

**Estimated Time:** 2-3 hours

---

## 📝 Detailed Implementation Steps

### **Step 1: Video Player Implementation**

**Location:** `apps/web/src/pages/lms/student/StudentLesson.jsx`

**Changes Needed:**

1. **Add video state and refs:**
```jsx
const [videoReady, setVideoReady] = useState(false);
const [resumePosition, setResumePosition] = useState(0);
const streamRef = useRef(null);
```

2. **Fetch progress on mount:**
```jsx
// In loadEverything(), after lessonPack is set:
if (lessonId && lesson?.video_id) {
  // Try to get last position from backend progress
  // Fallback to localStorage
  const local = readLocalProgress(lessonId);
  const backendPos = /* fetch from progress API if needed */;
  setResumePosition(backendPos || local?.lastPositionSeconds || 0);
}
```

3. **Render Stream player:**
```jsx
{lesson?.video_provider === "cloudflare_stream" && lesson?.video_id ? (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
    <Stream
      src={lesson.video_id}
      controls
      autoplay={false}
      currentTime={resumePosition}
      onTimeUpdate={(e) => {
        // Throttle: update every 10 seconds
        // Call updateLessonProgress()
      }}
      onReady={() => setVideoReady(true)}
    />
  </div>
) : lesson?.video_id ? (
  <div className="text-slate-400">Video format not supported yet.</div>
) : null}
```

4. **Implement progress tracking:**
   - Use `setInterval` or throttle `onTimeUpdate`
   - Call `updateLessonProgress()` with delta and current position
   - Save to localStorage as backup

---

### **Step 2: Mentor Queue UI**

**Create:** `apps/web/src/pages/lms/mentor/MentorSubmissionsQueue.jsx`

**Structure:**
```jsx
export default function MentorSubmissionsQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  
  // Fetch queue on mount
  // Render list with review button
  // Modal/page for review form
}
```

**Add Route:** `apps/web/src/app/router.jsx`
```jsx
{
  path: "/lms/mentor",
  children: [
    { index: true, element: <MentorHome /> },
    { path: "submissions", element: <MentorSubmissionsQueue /> },
    { path: "submissions/:id", element: <MentorSubmissionReview /> }, // optional: separate page
  ],
}
```

**Update MentorHome:** Add link to submissions queue

---

### **Step 3: Progress Dashboard**

**Update:** `apps/web/src/pages/lms/student/StudentHome.jsx`

**Structure:**
```jsx
export default function StudentHome() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch from /api/v1/lms/progress/summary
  // Render cards + quick actions
}
```

**May need backend extension:** Add `recent_lessons` to summary endpoint (optional, can be Phase 4)

---

## 🔧 Technical Considerations

### **Video Resume Logic:**
- Priority: Backend progress > localStorage > 0
- Throttle updates: Every 10 seconds is fine (don't spam API)
- Handle player errors gracefully
- Store resume position in localStorage as backup

### **Mentor Queue:**
- Show submission content in code block (if text) or formatted view
- Allow mentor to see student's previous submissions (if any)
- After review, update queue list (remove or update status)

### **Progress Dashboard:**
- Format watch time nicely: "2h 30m" or "150 minutes"
- Show percentage if possible (completed / total published lessons)
- Make cards clickable → navigate to relevant pages

---

## 📋 Testing Checklist

### Video Player:
- [ ] Video loads when `video_id` is present
- [ ] Resume works from backend progress
- [ ] Resume works from localStorage (fallback)
- [ ] Progress updates sent to backend (throttled)
- [ ] No video → shows appropriate message
- [ ] Player errors handled gracefully

### Mentor Queue:
- [ ] Queue list loads submissions
- [ ] Review form validates (feedback required)
- [ ] Submit review updates status
- [ ] Queue refreshes after review
- [ ] Empty queue shows message

### Progress Dashboard:
- [ ] Summary loads correctly
- [ ] Watch time formatted nicely
- [ ] Quick action links work
- [ ] Loading skeleton shown
- [ ] Error state handled

---

## 🚀 Deployment Notes

1. **No backend changes needed** (all APIs exist)
2. **Frontend only** - deploy to Vercel
3. **Test on staging** before production
4. **Monitor** video playback performance (Cloudflare Stream)

---

## 📅 Suggested Timeline

- **Day 1:** Video player + resume (Phase 1)
- **Day 2:** Mentor queue UI (Phase 2)
- **Day 3:** Progress dashboard (Phase 3)
- **Day 4:** Testing + polish

**Total Estimated Time:** 7-10 hours

---

## 🎯 Success Criteria

✅ Students can watch videos and resume where they left off  
✅ Mentors can review submissions efficiently  
✅ Students see their progress at a glance  
✅ All features follow existing code patterns (skeletons, error handling, AbortController)  
✅ No breaking changes to existing functionality  

---

## 📚 Reference Files

**Backend APIs:**
- `apps/api/src/modules/progress/progress.controller.js`
- `apps/api/src/modules/submissions/submissions.controller.mentor.js`
- `apps/api/src/modules/submissions/submissions.repo.js`

**Frontend Patterns:**
- `apps/web/src/pages/lms/student/StudentSubmissions.jsx` (good example of list + loading)
- `apps/web/src/pages/lms/student/StudentLesson.jsx` (current lesson page)
- `apps/web/src/features/progress/progressApi.js` (API helpers)

---

**Ready to start? Begin with Phase 1 (Video Player) - it's the most critical missing piece!**

