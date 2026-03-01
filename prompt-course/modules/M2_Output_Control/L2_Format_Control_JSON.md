# SEC-00: Lesson ID

**M2-L2 — Format Control: JSON**
- **Module:** M2 – Output Control
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Get AI to return valid, parseable JSON instead of plain text
- 🎯 Define an exact JSON schema with specific keys and data types in your prompt
- 🎯 Request nested JSON structures with arrays and objects for real project use

---

# SEC-02: 💡 Use Case

JSON output from AI is useful when:

- **Projects:** Generating mock data or seed data for your app's database
- **Coding:** Creating config files, API response mocks, or test fixtures
- **Studying:** Building structured flashcard decks you can import into apps
- **Placements:** Quickly drafting sample API responses for system design discussions

If you can get AI to produce valid JSON directly, you skip the manual formatting step entirely.

---

# SEC-03: ❌ Bad Prompt

```
Give me student data.
```

---

# SEC-04: ❌ Bad Output

```
Sure! Here is some student data. John is a 20-year-old computer science
student in his third year. He has a GPA of 3.7. Jane is 21 years old,
studying electrical engineering in her final year with a GPA of 3.9.
They are both active members of the coding club.
```

---

# SEC-05: 🔍 Why It Failed

- **No format requested.** The AI had no reason to pick JSON over prose.
- **No schema provided.** Without knowing which keys you need, the AI described students in sentences.
- **No data constraints.** You got a vague narrative instead of structured, usable data.

---

# SEC-06: ✅ Good Prompt

```
Give me data for 3 students as a valid JSON array.

Each student object must have exactly these keys:
- "name" (string)
- "age" (integer)
- "major" (string)
- "gpa" (float, max 4.0)

Return ONLY the JSON. No explanation before or after.
```

---

# SEC-07: ✅ Good Output

```json
[
  {
    "name": "Aarav Mehta",
    "age": 20,
    "major": "Computer Science",
    "gpa": 3.7
  },
  {
    "name": "Priya Sharma",
    "age": 21,
    "major": "Electrical Engineering",
    "gpa": 3.9
  },
  {
    "name": "Rohan Das",
    "age": 19,
    "major": "Mathematics",
    "gpa": 3.5
  }
]
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Generate a JSON array of 3 student records. Each object must follow this exact schema:

{
  "id": (integer, starting from 1),
  "name": (string),
  "age": (integer, between 18 and 25),
  "major": (string),
  "gpa": (float, 0.0 to 4.0),
  "courses": [
    {
      "courseName": (string),
      "grade": (string, one of "A", "B", "C")
    }
  ],
  "contact": {
    "email": (string, format: firstname.lastname@university.edu),
    "phone": (string, format: +91-XXXXXXXXXX)
  }
}

Each student must have exactly 2 courses in the "courses" array.
Return ONLY valid JSON. No markdown fences, no explanation.
```

**What changed:**
- Added an `id` field with an auto-increment rule
- Introduced nested objects (`contact`) and arrays (`courses`)
- Specified exact value formats for email and phone
- Set boundary constraints (age range, GPA range, grade options)

---

# SEC-09: 🛠️ Guided Practice

Follow these steps:

1. **Choose a data type.** Think of something you need mock data for — maybe products, books, or tasks.
2. **Define the schema.** Write out every key, its data type, and any constraints (e.g., price must be a positive float).
3. **Write the prompt.** Request 3 items as a JSON array. Include at least one nested object or array.

**Your task:** Paste the AI's output into a JSON validator (like jsonlint.com). Does it pass without errors? If not, check what you missed in your schema definition.

---

# SEC-10: 🏆 Challenge

**5-minute challenge:**

You are building a library management app and need seed data. Write one prompt that generates a JSON array of 4 books. Each book must have:

- `title` (string)
- `author` (string)
- `year` (integer)
- `genres` (array of 2 strings)
- `availability`: an object with `copies` (integer) and `isAvailable` (boolean)

The output must be valid JSON with no extra text.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I explicitly asked for JSON format in my prompt
- [ ] I defined every key name and its expected data type
- [ ] I included constraints (ranges, allowed values, formats) for at least two fields
- [ ] I told the AI to return only JSON with no extra text

---

# SEC-12: 📚 What You Learned

1. AI will not produce JSON unless you ask for it — always state the format explicitly.
2. Providing a schema with key names, types, and constraints gives you predictable, valid output.
3. Nested structures (objects inside objects, arrays of objects) work well when you show the AI the shape you expect.

---

# SEC-13: ❓ Mini Quiz

**Q1:** You ask for JSON but the AI wraps it in \`\`\`json ... \`\`\` markdown fences. How do you prevent this?

**A1:** Add "Return ONLY raw JSON. No markdown fences, no code blocks, no explanation" to your prompt. Being explicit about what to exclude is just as important as what to include.

**Q2:** Your JSON output has `"gpa": "3.7"` (string) instead of `"gpa": 3.7` (number). What went wrong?

**A2:** You either forgot to specify the data type, or wrote it ambiguously. Fix it by writing `"gpa" (float)` or `"gpa": (number, e.g., 3.7)` in your schema to make the type clear.

---

# SEC-14: 💬 One-Line Takeaway

> If you show the AI the exact JSON shape you want — keys, types, and nesting — it will fill in the data and hand you valid JSON every time.
