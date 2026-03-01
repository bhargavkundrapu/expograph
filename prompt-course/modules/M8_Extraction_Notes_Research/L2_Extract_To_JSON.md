# SEC-00: Lesson ID

**M8-L2 — Extract to JSON**
- **Module:** M8 – Extraction, Notes & Research
- **Difficulty:** Intermediate
- **Time:** 10–15 minutes

---

# SEC-01: 🎯 Goal

By the end of this lesson, you will be able to:

- 🎯 Extract data from unstructured text and output it as clean, valid JSON
- 🎯 Define a JSON schema with specific keys, data types, and nesting in your prompt
- 🎯 Handle arrays, missing data, and null values in extraction prompts

---

# SEC-02: 💡 Use Case

Sometimes you need extracted data in a format your code can use directly. JSON is that format.

- **Projects:** Extract product details from a webpage description and feed it into your app's database
- **Coding:** Pull config values from documentation and generate a ready-to-use JSON config file
- **Research:** Convert interview notes or survey responses into structured JSON for analysis

Tables are for humans. JSON is for code. This lesson teaches you to get the code-ready version.

---

# SEC-03: ❌ Bad Prompt

```
Convert this to JSON:

Dr. Priya Sharma is a cardiologist at City Hospital, Mumbai. She has
12 years of experience and specializes in interventional cardiology and
heart failure management. She is available on Monday, Wednesday, and
Friday from 10 AM to 2 PM. Her consultation fee is 1500 rupees.
Contact: priya.sharma@cityhospital.in, phone 9876543210.
```

---

# SEC-04: ❌ Bad Output

```
{
  "doctor": "Dr. Priya Sharma, cardiologist, City Hospital Mumbai,
  12 years exp, specializes in interventional cardiology and heart
  failure, available Mon/Wed/Fri 10-2, fee 1500, email
  priya.sharma@cityhospital.in, phone 9876543210"
}
```

---

# SEC-05: 🔍 Why It Failed

- **No schema provided.** The AI crammed everything into a single string because it didn't know which keys to use.
- **No data types specified.** Experience, fee, and phone could be numbers but ended up as text.
- **No structure for repeated data.** Specializations and available days are arrays, but the AI didn't know that.

---

# SEC-06: ✅ Good Prompt

```
Extract data from the text below into valid JSON using this exact schema:

{
  "name": (string),
  "specialty": (string),
  "hospital": (string),
  "city": (string),
  "experience_years": (integer),
  "specializations": (array of strings),
  "fee_inr": (integer),
  "contact": {
    "email": (string),
    "phone": (string)
  }
}

Return ONLY the JSON. No explanation.

Text:
Dr. Priya Sharma is a cardiologist at City Hospital, Mumbai. She has
12 years of experience and specializes in interventional cardiology and
heart failure management. Her consultation fee is 1500 rupees.
Contact: priya.sharma@cityhospital.in, phone 9876543210.
```

---

# SEC-07: ✅ Good Output

```json
{
  "name": "Dr. Priya Sharma",
  "specialty": "Cardiologist",
  "hospital": "City Hospital",
  "city": "Mumbai",
  "experience_years": 12,
  "specializations": [
    "Interventional Cardiology",
    "Heart Failure Management"
  ],
  "fee_inr": 1500,
  "contact": {
    "email": "priya.sharma@cityhospital.in",
    "phone": "9876543210"
  }
}
```

---

# SEC-08: 🚀 Upgrade Prompt

```
Extract data from the text below into valid JSON using this schema:

{
  "name": (string),
  "specialty": (string),
  "hospital": (string),
  "city": (string),
  "experience_years": (integer),
  "specializations": (array of strings),
  "availability": [
    {
      "day": (string),
      "start_time": (string, 24h format like "10:00"),
      "end_time": (string, 24h format like "14:00")
    }
  ],
  "fee_inr": (integer),
  "contact": {
    "email": (string or null),
    "phone": (string or null)
  }
}

Rules:
- If a field is not mentioned in the text, set it to null.
- The "availability" array must have one object per available day.
- Return ONLY valid JSON. No markdown fences. No explanation.

Text:
[paste text here]
```

**What changed:**
- Added an `availability` array with structured objects per day instead of a flat string
- Added explicit null rules — if data is missing, the field still appears as `null` instead of being skipped
- This produces JSON that code can parse without crashing on missing keys

---

# SEC-09: 📝 Guided Practice

Follow these steps:

1. **Pick a short text.** Copy a "About Us" or "Team" paragraph from any company website — something with names, roles, and details.
2. **Design your schema.** Write the JSON keys you want: name, role, department, and at least one nested object or array.
3. **Write the prompt.** Include your schema, a null rule for missing fields, and the "Return ONLY JSON" instruction.

**Your task:** Paste the AI's output into a JSON validator (jsonlint.com or a VS Code extension). Does it pass? If not, check which key has the wrong type and tighten your schema.

---

# SEC-10: 🏆 Challenge

**5-Minute Challenge:**

You received this event description:

"TechFest 2025 is a two-day hackathon at IIT Bombay on March 15-16. Registration fee is 500 INR per team. Max team size is 4. Themes: AI in Healthcare, FinTech, and EdTech. Contact the organizer Raj at raj@techfest.org or call 9988776655."

Write one prompt that extracts this into JSON with these keys: `event_name`, `type`, `venue`, `dates` (array), `fee_inr`, `max_team_size`, `themes` (array), `organizer` (object with `name`, `email`, `phone`). The output must be valid JSON.

---

# SEC-11: ✅ Checklist

Before you move on, confirm:

- [ ] I defined every JSON key name and its data type in the prompt
- [ ] I included at least one array or nested object in my schema
- [ ] I set a rule for missing data (null vs. skip vs. empty string)
- [ ] I told the AI to return only raw JSON with no extra text

---

# SEC-12: 🧠 What You Learned

- The AI needs a full schema with key names and data types to produce usable JSON from raw text.
- Arrays and nested objects work reliably when you show the AI the exact structure you expect.
- Setting explicit null rules prevents your code from breaking on missing fields.

---

# SEC-13: 📋 Mini Quiz

**Q1:** You extract text to JSON and get `"age": "twenty-two"` instead of `"age": 22`. What's the fix?

- A) Use a different AI model
- B) Specify the data type as `(integer)` in your schema
- C) Ask for XML instead of JSON

**Answer:** B — Always specify the data type next to each key. Writing `"age": (integer)` tells the AI to use a number, not a word.

**Q2:** Your JSON extraction skips a field that wasn't in the source text. The key just disappears. How do you prevent this?

**Answer:** Add a rule: "If a field is not mentioned in the text, set its value to null." This keeps every key present so your code doesn't crash when trying to access it.

---

# SEC-14: ⚡ One-Line Takeaway

> Show the AI your exact JSON schema — keys, types, and null rules — and it will extract structured data from any text.
