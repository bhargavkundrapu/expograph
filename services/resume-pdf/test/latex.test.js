const path = require("path");
const latex = require(path.join(__dirname, "..", "src", "latex"));
const escapeLaTeX = latex.escapeLaTeX;
const sanitizeSingleLine = latex.sanitizeSingleLine;
const buildEducationBlock = latex.buildEducationBlock;
const buildExperienceBlock = latex.buildExperienceBlock;
const buildProjectsBlock = latex.buildProjectsBlock;
const buildCertificationsBlock = latex.buildCertificationsBlock;
const buildSkillsBlock = latex.buildSkillsBlock;
const fillTemplate = latex.fillTemplate;

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

assert(escapeLaTeX("Hello") === "Hello");
assert(escapeLaTeX("Cost $100") === "Cost \\$100");
assert(escapeLaTeX("a & b") === "a \\& b");
assert(escapeLaTeX("x_y") === "x\\_y");
assert(escapeLaTeX("50%") === "50\\%");
assert(sanitizeSingleLine("  a  b  \n\t") === "a b");

const edu = [{ institution: "MIT", degree: "BS", field: "CS", startDate: "2018", endDate: "2022", gpa: "3.9" }];
const eduBlock = buildEducationBlock(edu);
assert(eduBlock.includes("MIT") && eduBlock.includes("BS") && eduBlock.includes("2018"));

const exp = [{ company: "Acme", position: "Dev", startDate: "2022", endDate: "Now", bullets: ["Did X", "Did Y"] }];
const expBlock = buildExperienceBlock(exp);
assert(expBlock.includes("Acme") && expBlock.includes("Did X"));

const proj = [{ name: "P1", description: "D", technologies: "R", link: "https://x.com", bullets: ["B1"] }];
assert(buildProjectsBlock(proj).includes("P1"));

const certs = [{ name: "AWS", issuer: "Amazon", date: "2023", credentialId: "123" }];
assert(buildCertificationsBlock(certs).includes("AWS"));

assert(buildSkillsBlock(["a", "b"]) === "a, b");
assert(buildSkillsBlock([]) === "");

const filled = fillTemplate("Name: {{{FULL_NAME}}}", { fullName: "Jane" });
assert(filled.includes("Jane"));

console.log("All LaTeX tests passed.");
process.exit(0);
