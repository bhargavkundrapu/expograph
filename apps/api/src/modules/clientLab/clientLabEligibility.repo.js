const { query } = require("../../db/query");

async function getEligibility({ userId }) {
  const { rows } = await query(
    `SELECT eligible_client_lab, eligible_since FROM users WHERE id = $1 LIMIT 1`,
    [userId]
  );
  return rows[0] ?? { eligible_client_lab: false, eligible_since: null };
}

async function setEligibility({ userId, eligible, eligibleSince }) {
  await query(
    `UPDATE users SET eligible_client_lab = $1, eligible_since = $2 WHERE id = $3`,
    [!!eligible, eligibleSince ?? null, userId]
  );
}

module.exports = { getEligibility, setEligibility };
