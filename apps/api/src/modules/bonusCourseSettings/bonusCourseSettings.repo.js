// apps/api/src/modules/bonusCourseSettings/bonusCourseSettings.repo.js
const { query } = require("../../db/query");

const BONUS_COURSE_UNLOCK_KEY = "bonus_course_unlock";

const RULES = [
  "all_pack_only",
  "all_three_main",
  "all_pack_or_all_three",
  "any_two_main",
  "any_one_main",
  "custom",
];

const DEFAULT_CONFIG = {
  rule: "all_pack_or_all_three",
  requiredCourseSlugs: [],
  bonusCourseSlug: "ai-automations",
};

async function getConfig({ tenantId }) {
  const { rows } = await query(
    `SELECT key, enabled, config FROM feature_flags
     WHERE tenant_id = $1 AND key = $2 LIMIT 1`,
    [tenantId, BONUS_COURSE_UNLOCK_KEY]
  ).catch(() => ({ rows: [] }));

  const row = rows[0];
  if (!row || !row.config || typeof row.config !== "object") {
    return { ...DEFAULT_CONFIG };
  }

  const config = row.config;
  return {
    rule: RULES.includes(config.rule) ? config.rule : DEFAULT_CONFIG.rule,
    requiredCourseSlugs: Array.isArray(config.requiredCourseSlugs)
      ? config.requiredCourseSlugs.filter((s) => typeof s === "string" && s.trim())
      : DEFAULT_CONFIG.requiredCourseSlugs,
    bonusCourseSlug:
      typeof config.bonusCourseSlug === "string" && config.bonusCourseSlug.trim()
        ? config.bonusCourseSlug.trim().replace(/_/g, "-")
        : DEFAULT_CONFIG.bonusCourseSlug,
  };
}

async function setConfig({ tenantId, config, updatedBy }) {
  const rule = RULES.includes(config.rule) ? config.rule : DEFAULT_CONFIG.rule;
  const requiredCourseSlugs = Array.isArray(config.requiredCourseSlugs)
    ? config.requiredCourseSlugs.filter((s) => typeof s === "string" && s.trim())
    : [];
  const bonusCourseSlug =
    typeof config.bonusCourseSlug === "string" && config.bonusCourseSlug.trim()
      ? config.bonusCourseSlug.trim().replace(/_/g, "-")
      : DEFAULT_CONFIG.bonusCourseSlug;

  const payload = { rule, requiredCourseSlugs, bonusCourseSlug };

  await query(
    `INSERT INTO feature_flags (tenant_id, key, enabled, config, updated_by, updated_at)
     VALUES ($1, $2, true, $3, $4, now())
     ON CONFLICT (tenant_id, key)
     DO UPDATE SET enabled = true, config = $3, updated_by = $4, updated_at = now()`,
    [tenantId, BONUS_COURSE_UNLOCK_KEY, JSON.stringify(payload), updatedBy ?? null]
  );

  return { ...payload };
}

module.exports = { getConfig, setConfig, BONUS_COURSE_UNLOCK_KEY, RULES, DEFAULT_CONFIG };
