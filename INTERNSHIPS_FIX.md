# Micro-Internships SuperAdmin Fix

## Problem
- SuperAdmin portal showed no projects in the micro-internships section
- Student portal correctly showed one project
- SuperAdmin's `loadProjects` function was empty (just set projects to empty array)

## Root Cause
1. **Frontend Issue**: `SuperAdminInternships.jsx` had an empty `loadProjects` function that didn't fetch any data
2. **Backend Issue**: No endpoint existed to list ALL projects for SuperAdmin (only student endpoint existed, which filters for published/open batches)

## Solution

### Backend Changes

1. **Added `listAllProjects` function** (`apps/api/src/modules/internships/internships.repo.js`):
   - Lists ALL projects regardless of status (draft, published, archived)
   - Includes batch information, application counts, and assignment counts
   - Returns one row per project-batch combination

2. **Added controller function** (`apps/api/src/modules/internships/internships.controller.js`):
   - `listAllProjects` controller that calls the service

3. **Added route** (`apps/api/src/modules/internships/internships.routes.mentor.js`):
   - `GET /api/v1/mentor/internships/projects` - Lists all projects for SuperAdmin/Mentor

### Frontend Changes

1. **Fixed `loadProjects` function** (`apps/web/src/pages/lms/superadmin/SuperAdminInternships.jsx`):
   - Now actually calls `/api/v1/mentor/internships/projects` endpoint
   - Properly unwraps and sets the projects data

2. **Enhanced project display**:
   - Shows project status (draft, published, archived)
   - Displays batch information if available
   - Shows application/approval/assignment counts
   - Shows difficulty level and track
   - Provides "Create Batch" button for projects without batches
   - Provides "Edit" button to modify projects

## API Endpoints

### Student Portal
- `GET /api/v1/lms/internships/projects` - Lists only published projects with open batches

### SuperAdmin/Mentor Portal
- `GET /api/v1/mentor/internships/projects` - Lists ALL projects (draft, published, archived) with all batches

## Data Structure

The `listAllProjects` endpoint returns:
```javascript
{
  project_id: "uuid",
  title: "string",
  slug: "string",
  track: "string",
  difficulty: "beginner|intermediate|advanced",
  brief: "string",
  skills: "array or string",
  project_status: "draft|published|archived",
  created_at: "timestamp",
  batch_id: "uuid or null",
  batch_name: "string or null",
  start_at: "timestamp or null",
  end_at: "timestamp or null",
  max_seats: "number or null",
  batch_status: "open|closed or null",
  applied_count: "number",
  approved_count: "number",
  assigned_count: "number"
}
```

## Testing

1. **SuperAdmin Portal**:
   - Navigate to `/lms/superadmin/internships`
   - Should see all projects (including drafts)
   - Should see batch information if batches exist
   - Should be able to create batches for projects without batches

2. **Student Portal**:
   - Navigate to `/lms/student/internships`
   - Should only see published projects with open batches
   - Should match what was visible before

## Deployment

After deploying:
1. Backend changes will add the new endpoint
2. Frontend changes will fetch and display all projects for SuperAdmin
3. SuperAdmin can now see all projects, not just published ones

