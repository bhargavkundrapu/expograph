# Implementation Guide: Building Admin Pages Using Certificates/Workshops Pattern

This guide explains how to implement the remaining 3 admin pages (Podcasts, Real World Lab, Internships) using the same pattern as **SuperAdminCertificates.jsx** and **SuperAdminWorkshops.jsx**.

## 📋 Template Structure

All pages follow this structure:
1. **Cards View** - Overview with statistics and action cards
2. **List View** - Grid/list with search/filter
3. **Add/Create View** - Form to create new items
4. **Edit View** - Form to edit existing items (optional)
5. **Details View** - Full details with relationships/stats

## 🎨 Common UI Patterns

### Color Schemes
- **Workshops**: Orange to Red gradient (`from-orange-500 to-red-600`)
- **Certificates**: Amber to Yellow gradient (`from-amber-500 to-yellow-600`)
- **Podcasts**: Purple to Indigo gradient (`from-purple-500 to-indigo-600`)
- **Client Lab**: Blue to Cyan gradient (`from-blue-500 to-cyan-600`)
- **Internships**: Green to Emerald gradient (`from-green-500 to-emerald-600`)

### State Management Pattern
```javascript
const [view, setView] = useState("cards"); // "cards" | "list" | "add" | "edit" | "details"
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [loading, setLoading] = useState(true);
const [searchQuery, setSearchQuery] = useState("");
const [selectedItem, setSelectedItem] = useState(null);
const [addForm, setAddForm] = useState({ /* form fields */ });
```

## 📦 Module 1: Podcasts (Episodes Management)

### API Endpoints (Already Created ✅)
- `GET /api/v1/admin/podcasts/episodes` - List episodes
- `POST /api/v1/admin/podcasts/episodes` - Create episode
- `GET /api/v1/admin/podcasts/episodes/:id` - Get episode with stats
- `PATCH /api/v1/admin/podcasts/episodes/:id` - Update episode
- `DELETE /api/v1/admin/podcasts/episodes/:id` - Delete episode
- `GET /api/v1/admin/podcasts/series` - List series (optional)

### Implementation Steps

1. **Copy SuperAdminCertificates.jsx** → Rename to `SuperAdminPodcasts.jsx`

2. **Replace State Variables:**
   ```javascript
   // Replace certificates → episodes
   const [episodes, setEpisodes] = useState([]);
   const [series, setSeries] = useState([]); // Optional
   
   // Replace addForm fields:
   const [addForm, setAddForm] = useState({
     title: "",
     description: "",
     showNotes: "",
     seriesId: "",
     audioUrl: "",
     audioDurationSeconds: 0,
     coverImageUrl: "",
     episodeNumber: null,
     publishedAt: "",
     status: "draft",
     transcriptUrl: "",
     transcriptText: "",
   });
   ```

3. **Update API Calls:**
   ```javascript
   // Replace fetchCertificates:
   const fetchEpisodes = async () => {
     const res = await apiFetch("/api/v1/admin/podcasts/episodes", { token });
     if (res?.ok) {
       setEpisodes(res.data || []);
     }
   };
   
   // Replace handleIssueCertificate:
   const handleAddEpisode = async () => {
     const res = await apiFetch("/api/v1/admin/podcasts/episodes", {
       method: "POST",
       token,
       body: addForm,
     });
     // ... rest
   };
   ```

4. **Update UI Elements:**
   - Replace `FiAward` → `FiRadio` (or `FiHeadphones`)
   - Replace gradient: `from-purple-500 to-indigo-600`
   - Update titles: "Certificates" → "Podcast Episodes"
   - Add audio player preview in details view
   - Add transcript section in details view

5. **Add Episode-Specific Features:**
   - Audio URL input with validation
   - Duration display (format seconds to mm:ss)
   - Transcript text area (Markdown support)
   - Show notes editor
   - Series dropdown (if using series)

### Example Form Fields:
```javascript
// Audio URL (required)
<input type="url" value={addForm.audioUrl} placeholder="https://..." />

// Duration in seconds
<input type="number" value={addForm.audioDurationSeconds} min="0" />

// Transcript (large textarea)
<textarea rows={10} value={addForm.transcriptText} />

// Show Notes (Markdown)
<textarea rows={6} value={addForm.showNotes} placeholder="Markdown supported..." />

// Published Date (datetime-local)
<input type="datetime-local" value={addForm.publishedAt} />
```

---

## 📦 Module 2: Real World Lab (Client Lab Projects)

### API Endpoints (Already Available ✅)
- `GET /api/v1/admin/client-lab/projects` - List all projects
- `POST /api/v1/admin/client-lab/projects` - Create project
- `GET /api/v1/admin/client-lab/clients` - List clients
- `POST /api/v1/admin/client-lab/clients` - Create client
- `POST /api/v1/admin/client-lab/projects/:projectId/tasks` - Create task

### Implementation Steps

1. **Copy SuperAdminWorkshops.jsx** → Rename to `SuperAdminClientLab.jsx`

2. **Replace State Variables:**
   ```javascript
   const [projects, setProjects] = useState([]);
   const [clients, setClients] = useState([]);
   const [selectedProject, setSelectedProject] = useState(null);
   const [tasks, setTasks] = useState([]); // For project details
   
   const [addForm, setAddForm] = useState({
     title: "",
     slug: "",
     scope: "",
     clientId: "",
     status: "active",
     startDate: "",
     endDate: "",
   });
   ```

3. **Update API Calls:**
   ```javascript
   const fetchProjects = async () => {
     const res = await apiFetch("/api/v1/admin/client-lab/projects", { token });
     // ...
   };
   
   const fetchClients = async () => {
     const res = await apiFetch("/api/v1/admin/client-lab/clients", { token });
     // ...
   };
   ```

4. **Update UI Elements:**
   - Replace gradient: `from-blue-500 to-cyan-600`
   - Replace icon: `FiBriefcase`
   - Update titles: "Workshops" → "Client Lab Projects"

5. **Add Client Lab-Specific Features:**
   - Client dropdown in project form
   - Task kanban board in project details
   - Project members management
   - Deliverables tracking (repo/deploy/demo URLs)

### Details View Should Show:
- Project information (client, status, dates)
- Tasks grouped by status (todo/doing/review/done)
- Project members list
- Deliverables list

---

## 📦 Module 3: Internships (Micro Projects & Batches)

### API Endpoints (Use Mentor Routes ✅)
- `GET /api/v1/mentor/internships/projects` - List all projects
- `POST /api/v1/mentor/internships/projects` - Create project
- `POST /api/v1/mentor/internships/projects/:projectId/batches` - Create batch
- `GET /api/v1/mentor/internships/applications` - List applications
- `POST /api/v1/mentor/internships/applications/:applicationId/approve` - Approve
- `POST /api/v1/mentor/internships/applications/:applicationId/reject` - Reject

### Implementation Steps

1. **Copy SuperAdminWorkshops.jsx** → Rename to `SuperAdminInternships.jsx`

2. **Replace State Variables:**
   ```javascript
   const [projects, setProjects] = useState([]);
   const [selectedProject, setSelectedProject] = useState(null);
   const [batches, setBatches] = useState([]);
   const [applications, setApplications] = useState([]);
   
   const [addForm, setAddForm] = useState({
     title: "",
     slug: "",
     track: "",
     difficulty: "",
     brief: "",
     skills: [],
     status: "draft",
   });
   
   // Batch form
   const [batchForm, setBatchForm] = useState({
     batchName: "",
     startAt: "",
     endAt: "",
     maxSeats: 0,
   });
   ```

3. **Update API Calls:**
   ```javascript
   // Use /api/v1/mentor/internships instead of /api/v1/admin
   const fetchProjects = async () => {
     const res = await apiFetch("/api/v1/mentor/internships/projects", { token });
     // ...
   };
   
   const fetchApplications = async (batchId) => {
     const res = await apiFetch(`/api/v1/mentor/internships/applications?batchId=${batchId}`, { token });
     // ...
   };
   ```

4. **Update UI Elements:**
   - Replace gradient: `from-green-500 to-emerald-600`
   - Replace icon: `FiLayers` or `FiBriefcase`
   - Update titles: "Workshops" → "Internship Projects"

5. **Add Internship-Specific Features:**
   - Project creation with track/difficulty
   - Batch creation for each project
   - Application management (approve/reject)
   - Mentor assignment in approval
   - Deliverables review

### Details View Should Show:
- Project information (track, difficulty, brief, skills)
- Batches list with stats (applied, approved, assigned)
- Applications table (if batch selected)
- Deliverables list (if batch selected)

---

## 🔄 Common Implementation Pattern

### Step-by-Step for Any Module:

1. **Copy the template file** (Certificates or Workshops)

2. **Replace state variables:**
   - `certificates` → `episodes` / `projects` / `internships`
   - `addForm` → Update with module-specific fields

3. **Update API endpoints:**
   - Change `/api/v1/admin/certificates` → `/api/v1/admin/podcasts/episodes`
   - Update method (GET/POST/PATCH/DELETE)

4. **Update UI colors:**
   - Change gradient colors
   - Change icons (`FiAward` → module-specific icon)

5. **Update form fields:**
   - Add/remove fields based on API schema
   - Update validation

6. **Update details view:**
   - Show module-specific stats
   - Display relationships (e.g., episodes in series, tasks in project)

---

## 🎯 Quick Reference: API Endpoints

### Podcasts
- `GET /api/v1/admin/podcasts/episodes` - List
- `POST /api/v1/admin/podcasts/episodes` - Create
- `GET /api/v1/admin/podcasts/episodes/:id` - Get with stats
- `PATCH /api/v1/admin/podcasts/episodes/:id` - Update
- `DELETE /api/v1/admin/podcasts/episodes/:id` - Delete

### Client Lab
- `GET /api/v1/admin/client-lab/projects` - List
- `POST /api/v1/admin/client-lab/projects` - Create
- `GET /api/v1/admin/client-lab/clients` - List clients

### Internships
- `GET /api/v1/mentor/internships/projects` - List (use mentor routes!)
- `POST /api/v1/mentor/internships/projects` - Create
- `GET /api/v1/mentor/internships/applications` - List

---

## ✅ Checklist for Each Module

- [ ] Copy template file
- [ ] Update state variables
- [ ] Update API endpoints
- [ ] Update form fields
- [ ] Update UI colors/icons
- [ ] Update search filters
- [ ] Add module-specific features
- [ ] Test CRUD operations
- [ ] Update router.jsx
- [ ] Test navigation

---

## 📝 Notes

- All modules follow the same pattern - just change the entity name and API endpoints
- Use the same gradient/style system for consistency
- Reuse the same search/filter logic
- Details views can show relationships (e.g., tasks in project, episodes in series)
- Backend APIs are already created - just connect the frontend!

This guide should help you quickly implement the remaining 3 pages. Each follows the exact same pattern as Certificates/Workshops! 🚀
