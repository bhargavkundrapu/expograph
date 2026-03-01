# Iterate & Fix Bad Images

**Lesson ID**: M5-L5
**Module**: Image Prompting
**Difficulty**: Intermediate
**Time**: 10–15 minutes

---

## SEC-00: Lesson ID
> M5-L5 — Debug and improve image prompts step by step using the 3R Loop

---

## SEC-01: 🎯 Goal
What you'll learn in this lesson:
- 🎯 Use the 3R Loop (Request, Review, Refine) to systematically fix bad image outputs
- 🎯 Identify the five most common image prompt failures and their fixes
- 🎯 Build a personal image debugging checklist you can use every time

---

## SEC-02: 💡 Use Case
**When would you use this?**

You write a detailed image prompt, hit generate, and the result looks wrong — the face is distorted, the style is off, or the composition is nothing like what you asked for. Most people just hit "generate again" and hope for the best. That's a waste of time. This lesson teaches you to diagnose what went wrong and fix your prompt like a pro, so every round gets you closer to the image you want.

---

## SEC-03: ❌ Bad Prompt

Prompt:
```
A futuristic robot teacher in a classroom full of students,
photorealistic, 4k, ultra detailed, masterpiece
```

---

## SEC-04: Bad Output

Output:
```
A cluttered image with a shiny metallic robot standing in a
generic classroom. The students are blurry and some have
distorted hands. The robot's face looks uncanny. The composition
is random — the robot is too small in the frame. The style is
trying to be photorealistic but falls into the uncanny valley.
```

---

## SEC-05: 🔍 Why It Failed
- The prompt used **buzzwords** ("4k, masterpiece") instead of specific visual directions
- No **composition** instructions — the AI didn't know what to focus on
- The subject was **too complex** — many students plus a robot without clear hierarchy leads to chaos

---

## SEC-06: ✅ Good Prompt

Using the **3R Loop** to fix it step by step:

**Round 1 — Request:**
```
A futuristic robot teacher in a classroom full of students,
photorealistic, 4k, ultra detailed, masterpiece
```
Result: Cluttered, distorted, no clear focal point.

**Round 1 — Review:**
- Problem 1: Too many subjects competing for attention
- Problem 2: No camera angle or composition
- Problem 3: "4k masterpiece" adds nothing — need actual style details

**Round 2 — Refine:**
```
Subject: A sleek humanoid robot teacher standing at the front of a modern classroom, pointing at a holographic display
Composition: Medium shot, the robot is the clear focal point in the center, 3-4 students visible from behind (backs of heads only, slightly blurred)
Style: Cinematic concept art, clean sci-fi aesthetic, soft metallic surfaces
Lighting: Cool blue ambient light from the holographic display, warm overhead classroom lights
Mood: Futuristic but approachable, like a scene from a thoughtful sci-fi film
Negative prompt: no distorted hands, no extra limbs, no blurry faces, no cluttered background
```

---

## SEC-07: Good Output

Output:
```
A cinematic concept art image of a sleek humanoid robot standing
at the front of a modern, minimalist classroom. It points at a
glowing holographic display. Three students are visible from
behind, their heads slightly out of focus, keeping the robot as
the clear subject. The lighting blends cool blue from the display
with warm overhead lights. The robot's surface is smooth and
metallic. The mood is calm and futuristic. No distorted features.
Clean composition with a clear focal point.
```

---

## SEC-08: 🚀 Upgrade Prompt
Take it one level higher — use a systematic debugging checklist:

**Image Debugging Checklist** (run through this every time an image looks wrong):

```
1. SUBJECT CHECK — Is the main subject clear? Is there only one focal point?
   Fix: Simplify. Remove competing subjects. Use "focal point is X."

2. STYLE CHECK — Did the AI use the right art style?
   Fix: Be specific. Say "oil painting" not just "artistic." Add a reference like "in the style of Pixar 3D."

3. COMPOSITION CHECK — Is the framing and camera angle right?
   Fix: Add camera angle (low, high, eye-level), framing (rule of thirds), and shot type (close-up, wide).

4. ANATOMY CHECK — Are hands, faces, and limbs correct?
   Fix: Add negative prompts: "no extra fingers, no distorted faces, no extra limbs."

5. MOOD CHECK — Does the image feel right emotionally?
   Fix: Specify lighting (golden hour, neon, dramatic shadows) and color palette (warm, cool, muted).
```

After running the checklist, here's the final version:

Prompt:
```
Subject: A sleek humanoid robot teacher standing at the front of a modern classroom, pointing at a holographic star map
Focal point: The robot is the single main subject
Composition: Medium-wide shot, eye-level camera, robot placed on the left third, holographic display fills the right third
Style: Cinematic concept art, Pixar-meets-Blade-Runner aesthetic, clean and polished
Lighting: Cool blue holographic glow on the robot's face, warm golden overhead classroom lights, soft shadows
Color palette: Deep navy, electric blue, warm amber accents
Mood: Awe-inspiring, calm, futuristic wonder
Negative prompt: no distorted hands, no extra limbs, no blurry faces, no text, no watermark
Aspect ratio: 16:9
```

**What changed**: Applied the full 5-point debugging checklist — every common failure point is now addressed in the prompt.

Here are more examples of the 3R Loop fixing bad images:

**Example 1 — Fixing a cluttered background:**
```
Problem: "A dog in a park" gave a messy image with too many elements.
Refined: "A golden retriever sitting in a meadow, soft blurred background, shallow depth of field, centered framing, nothing else in the scene"
```
Expected result: A clean, focused image of just the dog with a dreamy blurred background.

**Example 2 — Fixing wrong style:**
```
Problem: "Cartoon cat" gave a 3D render instead of a 2D cartoon.
Refined: "A cat in flat 2D cartoon style, thick black outlines, cel-shaded, like a Saturday morning cartoon, solid color fills, no 3D rendering, no shading gradients"
```
Expected result: A proper flat 2D cartoon cat with clean outlines — not a 3D-looking render.

**Example 3 — Fixing distorted anatomy:**
```
Problem: A portrait had six fingers and asymmetrical eyes.
Refined: Added "no extra fingers, no extra limbs, symmetrical face, anatomically correct hands" to the negative prompt, and switched to close-up framing to reduce complexity.
```
Expected result: A cleaner portrait with correct anatomy because the AI had fewer body parts to render.

---

## SEC-09: 📝 Guided Practice
Try this yourself:

1. Write an intentionally simple prompt (no style, no composition) and generate an image
2. Run it through the 5-point debugging checklist: Subject, Style, Composition, Anatomy, Mood
3. Rewrite the prompt fixing every issue you found, then generate again

**Your task**: Generate a "before" image from a simple prompt. Then apply the debugging checklist and generate the "after" version. Compare both side by side.

---

## SEC-10: 🏆 Challenge
**5-Minute Challenge**:

Here's a broken prompt — fix it using the 3R Loop and debugging checklist:

```
A beautiful fantasy castle on a mountain with dragons and knights
and a princess and clouds and a rainbow, ultra HD, 8k, best quality
```

Identify at least 3 problems. Rewrite the prompt so it has one clear focal point, a specific style, proper composition, and a mood. Write the final fixed prompt.

---

## SEC-11: ✅ Checklist
Before moving on, confirm:
- [ ] I can identify the five common image prompt failures (subject, style, composition, anatomy, mood)
- [ ] I can apply the 3R Loop to improve an image prompt in rounds
- [ ] I tried the guided practice and compared before/after images
- [ ] I completed the challenge

---

## SEC-12: 🧠 What You Learned
- Never accept a bad image — use the 3R Loop to Request, Review, and Refine in rounds
- Most image failures come from five issues: unclear subject, wrong style, bad composition, distorted anatomy, or missing mood
- A debugging checklist removes guesswork — run through all five checks before generating again

---

## SEC-13: 📋 Mini Quiz
**Q1**: What is the first step of the 3R Loop when your image looks wrong?
- A) Delete the prompt and start from scratch
- B) Review the output — identify what specifically went wrong
- C) Add "4k masterpiece" to the prompt

**Answer**: B) Review the output — before changing anything, figure out what failed so you fix the right thing.

**Q2**: Your AI image has a person with six fingers. What should you add to fix this?
- A) "Make it more realistic"
- B) A negative prompt like "no extra fingers, no extra limbs, anatomically correct hands"
- C) "Better quality please"

**Answer**: B) A negative prompt — telling the AI what to avoid is more effective than vague quality words.

---

## SEC-14: ⚡ One-Line Takeaway
> Bad images aren't failures — they're feedback; use the 3R Loop to turn every flawed output into a better prompt.
