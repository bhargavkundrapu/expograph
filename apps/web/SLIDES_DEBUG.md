# Slides Debugging Guide

## How to See the Slides

1. **Navigate to a Lesson Page**
   - Go to any lesson in the Student LMS portal
   - The slides should now be visible by default (I've enabled them for all lessons)

2. **Check the Slides Tab**
   - Click on the "Slides" tab in the lesson view
   - The slides should appear automatically

3. **If Slides Don't Appear:**

   **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for any errors in the Console tab
   - Common issues:
     - Import errors
     - React rendering errors
     - Slide count mismatches

   **Check Network Tab:**
   - Verify that the slide data file is loading
   - Look for `htmlBasicElements.js` in the network requests

   **Verify Lesson Data:**
   - The slides are now enabled for ALL lessons (for testing)
   - Check if the lesson data is loading properly

## Quick Test

To test if slides are working, you can:

1. Open browser console
2. Type: `window.location.href` to see current URL
3. Navigate to any lesson page
4. Click the "Slides" tab
5. Check console for any errors

## Expected Behavior

- Slides should show 18 slides total
- Navigation buttons (Previous/Next) should work
- Slide indicators at bottom should be clickable
- Keyboard navigation (Arrow keys, Space) should work
- Fullscreen button should toggle fullscreen mode

## Troubleshooting

If slides still don't appear:

1. **Clear browser cache** and reload
2. **Check if React is properly imported** in the slide data file
3. **Verify the component is rendering** by checking React DevTools
4. **Check for JavaScript errors** in the console

## File Locations

- Slide Data: `apps/web/src/data/slides/htmlBasicElements.js`
- Slide Viewer: `apps/web/src/Components/presentation/SlideDeckViewer.jsx`
- Integration: `apps/web/src/pages/lms/student/StudentLesson.jsx`
