# Character Consistency

**Lesson ID**: M5-L4
**Module**: Image Prompting
**Difficulty**: Intermediate
**Time**: 10–15 minutes

---

## SEC-00: Lesson ID
> M5-L4 — Keep the same character looking consistent across multiple images

---

## SEC-01: 🎯 Goal
What you'll learn in this lesson:
- 🎯 Write a character reference sheet prompt that locks in a character's appearance
- 🎯 Reuse that reference across multiple images so the character looks the same every time
- 🎯 Add pose and scene variations while keeping the character's identity intact

---

## SEC-02: 💡 Use Case
**When would you use this?**

You're building a comic strip, a storyboard, or a series of social media posts featuring the same character — maybe a mascot for your project or a persona for your brand. If you describe the character differently each time, the AI gives you a different-looking person in every image. A character reference sheet solves this. It's how professionals keep characters on-model across dozens of frames.

---

## SEC-03: ❌ Bad Prompt

Prompt:
```
Image 1: A young Indian girl with brown hair smiling
Image 2: An Indian woman looking at a laptop
Image 3: A girl with dark hair in a classroom
```

---

## SEC-04: Bad Output

Output:
```
Image 1: A girl with shoulder-length wavy brown hair and a round face.
Image 2: A completely different woman with straight black hair,
         sharper features, and glasses.
Image 3: A third person — younger, with a ponytail, different skin
         tone, different face shape. None of them look related.
```

---

## SEC-05: 🔍 Why It Failed
- Each prompt describes the character **vaguely and differently** — so the AI creates three different people
- No **fixed details** like face shape, hairstyle, clothing, or distinguishing features
- No **character reference sheet** to anchor the AI to one consistent design

---

## SEC-06: ✅ Good Prompt

First, create a character reference sheet:

Prompt:
```
Character reference sheet for "Anika":
- Age: 21 years old
- Ethnicity: South Asian (Indian)
- Face: Oval face, warm brown skin, soft features
- Hair: Straight black hair, shoulder-length, with a side part
- Eyes: Dark brown, slightly almond-shaped
- Build: Average height, slim
- Signature outfit: Teal hoodie, black jeans, white sneakers
- Accessories: Small silver nose stud on the left side, thin-frame round glasses
- Expression default: Warm, confident smile

Show Anika in 4 poses on a white background: front view, side profile (left), three-quarter view, and back view. Clean lines, character design sheet style.
```

Then use it for each scene:

Prompt:
```
Anika (oval face, warm brown skin, straight black shoulder-length hair with side part, dark brown almond eyes, thin round glasses, silver nose stud, teal hoodie, black jeans, white sneakers) sitting at a wooden desk in a cozy room, working on a laptop, warm desk lamp lighting, digital illustration style, calm focused mood
```

---

## SEC-07: Good Output

Output:
```
A digital illustration of the same character — Anika — sitting at
a wooden desk. She has her signature straight black hair with a
side part, round glasses, and silver nose stud. She's wearing her
teal hoodie. A warm desk lamp illuminates her face as she focuses
on her laptop. The room feels cozy with soft shadows. Her face
shape, skin tone, and features match the reference sheet exactly.
The character is clearly recognizable as the same person.
```

---

## SEC-08: 🚀 Upgrade Prompt
Take it one level higher:

Prompt:
```
Anika (oval face, warm brown skin, straight black shoulder-length hair with side part, dark brown almond eyes, thin round glasses, silver nose stud, teal hoodie, black jeans, white sneakers) standing on stage at a college tech fest, presenting a project to a crowd

Pose: Standing confidently, right hand gesturing toward a screen, left hand holding a clicker
Expression: Excited, mid-sentence, eyebrows slightly raised
Composition: Medium shot, low angle camera to make her look confident
Style: Semi-realistic digital art, vibrant colors
Lighting: Stage spotlights from above, warm tones, slight lens flare
Mood: Energetic, proud, inspiring
```

**What changed**: Added a specific pose, expression, and scene while repeating every physical detail from the character sheet — this gives a completely new scene but the same recognizable character.

Here are more examples of reusing a character:

**Example 1 — Character in a different setting:**
```
Anika (same character details) walking through a rainy street, holding a transparent umbrella, neon signs reflecting on the wet road, cinematic photography style, contemplative mood
```
Expected result: Anika in a moody rain scene — same face, same outfit, different environment and emotion.

**Example 2 — Character in an action scene:**
```
Anika (same character details) running through a futuristic corridor, alarm lights flashing red, motion blur on the background, anime style, intense and urgent mood
```
Expected result: Anika in a dynamic running pose with anime aesthetics — recognizable character in a completely different genre.

---

## SEC-09: 📝 Guided Practice
Try this yourself:

1. Create a character reference sheet for a character of your choice — fill in face shape, hair, eyes, skin tone, outfit, and one unique accessory
2. Use that reference to write two prompts: one where the character is studying, and one where they are outdoors
3. Generate both images and check if the character looks like the same person

**Your task**: Write a character reference sheet with at least 8 physical details. Then write two scene prompts reusing those exact details. Check if both images look like the same character.

---

## SEC-10: 🏆 Challenge
**5-Minute Challenge**:

You're creating a 3-panel comic strip for Instagram. Panel 1: Your character wakes up tired. Panel 2: They drink coffee and look alive. Panel 3: They sit at their laptop looking confident. Write all three prompts using a single character reference sheet. Every prompt must repeat the character's physical details so the AI keeps them consistent.

---

## SEC-11: ✅ Checklist
Before moving on, confirm:
- [ ] I can write a character reference sheet with at least 8 physical details
- [ ] I can reuse the same character description across different scene prompts
- [ ] I tried the guided practice and generated two images of the same character
- [ ] I completed the challenge

---

## SEC-12: 🧠 What You Learned
- AI image tools generate a new random character every time unless you lock in specific details
- A character reference sheet lists face shape, hair, eyes, skin, outfit, and accessories — repeat it in every prompt
- You can change the pose, scene, and mood while keeping identity by copy-pasting the character block into each new prompt

---

## SEC-13: 📋 Mini Quiz
**Q1**: Why does the AI generate a different-looking person each time?
- A) The AI is broken
- B) Each prompt describes the character differently or too vaguely
- C) AI tools can only generate one character per account

**Answer**: B) Each prompt describes the character differently or too vaguely — without fixed details, the AI fills in gaps randomly each time.

**Q2**: What is the most important thing to include in every prompt to keep a character consistent?
- A) The character's name only
- B) The same physical details (face, hair, eyes, outfit, accessories) repeated every time
- C) The same background and lighting

**Answer**: B) The same physical details repeated every time — names alone don't help AI image tools, but specific physical descriptions do.

---

## SEC-14: ⚡ One-Line Takeaway
> A character reference sheet is your character's passport — carry it into every prompt, and they'll always look like themselves.
