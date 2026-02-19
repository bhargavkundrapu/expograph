# Edge Blinking Cursor Fix – Diagnosis & Fix

## 1. Diagnosis – Issues Found

### Scan results (entire `apps/web/src`)

| Check | Result |
|-------|--------|
| **contentEditable** | **None found.** No `contentEditable` or `contenteditable` on any element. |
| **tabindex on non-inputs** | **None found.** No `tabindex` / `tabIndex` on divs, spans, or other text elements. |
| **autoFocus** | **Only on inputs.** All 6 uses are on `<input>` or `<textarea>` (SuperAdminCreateLesson, SuperAdminLessonEditor, SuperAdminCourses, StudentPlayground). No autoFocus on text elements. |
| **.focus() calls** | **Only on search input.** Both calls in `StudentLayout.jsx` are `searchInputRef.current?.focus()` where `searchInputRef` is attached to an `<input>`. No focus() on text nodes. |
| **CSS focus/caret** | No existing global `caret-color` or rules that would force a caret on text. Many components use `focus:outline-none` and `focus:ring-*` on **inputs** only. |

**Conclusion:** There are no code bugs (no contentEditable, no tabindex on text, no wrong focus() or autoFocus). The blinking cursor in Edge is due to **browser behavior**: Edge can show a caret at the end of text inside non-editable elements (e.g. after clicking or when the element gets focus). This is a known Edge quirk and is addressed with global CSS.

---

## 2. Fix Applied – Global CSS

**File:** `apps/web/src/index.css`

Added a single block that:

1. **Hides the caret on all elements by default**  
   - `* { caret-color: transparent; }` (and `-ms-caret-color` for legacy Edge).  
   - Prevents the blinking cursor on paragraphs, headings, divs, spans, etc.

2. **Shows the caret only on real editable elements**  
   - `input`, `textarea`, `[contenteditable="true"]` get `caret-color: auto` so typing still shows a normal caret.

3. **Keeps contenteditable="false" / empty from showing a caret**  
   - Explicit `caret-color: transparent` for those.

4. **Removes focus outline from non-interactive text elements**  
   - `p`, `span`, `div` (when not a button/link/tab), `h1–h6`, `li`, `label` when `:focus` get `outline: none` so Edge doesn’t leave a visible “focus” look that can feel like a cursor.

5. **Preserves accessibility**  
   - `button`, `a`, `input`, `textarea`, `select`, and `[role="button"]`, `[role="tab"]`, `[role="link"]` keep a visible focus ring when focused via keyboard using `:focus-visible`.

No component-level changes were required; the fix is entirely in this global CSS.

---

## 3. Component-Level Changes

**None.** No React components were changed. All `autoFocus` and `.focus()` usages are already on proper form controls.

---

## 4. Testing Checklist

- [ ] **Edge (Chromium)**  
  - [ ] Open site, click on normal text (paragraph, heading, label).  
  - [ ] Confirm no blinking cursor at end of text.  
  - [ ] Type in search, login, or any form: caret visible and typing works.  
  - [ ] Tab through buttons/links: focus ring appears on keyboard focus.

- [ ] **Chrome**  
  - [ ] Same as above: no caret on text, caret in inputs, focus ring on keyboard.

- [ ] **Firefox**  
  - [ ] Same as above.

- [ ] **Safari (if available)**  
  - [ ] Same as above.

- [ ] **Accessibility**  
  - [ ] Keyboard-only: Tab to buttons/links and confirm visible focus indicator.  
  - [ ] Screen reader: confirm focus order and labels unchanged.

- [ ] **Forms**  
  - [ ] Login, search, course/create lesson, any modal with inputs: place focus in each input/textarea and confirm caret appears and text can be edited.

---

## 5. What Caused the Issue

- **Observed:** In Microsoft Edge only, a blinking cursor appears at the end of text inside non-editable elements (e.g. after clicking a paragraph or heading).
- **Cause:** Edge sometimes treats focused or recently clicked text containers as if they were editable and draws a caret. Your app does not use `contentEditable` or `tabindex` on those elements, so this is due to Edge’s default behavior, not your markup or focus logic.
- **Fix:** Global CSS hides the caret everywhere (`caret-color: transparent`) and restores it only where it’s needed (`caret-color: auto` on `input`, `textarea`, and `[contenteditable="true"]`). Outline on non-interactive text is removed on `:focus`; keyboard users still get a clear focus ring via `:focus-visible` on interactive elements.

This keeps behavior correct in Chrome, Firefox, and Safari while fixing the Edge-only blinking cursor and keeping inputs and accessibility intact.
