/**
 * Colleges controller - SuperAdmin CRUD + public list for purchase form dropdown.
 */
const repo = require("./colleges.repo");

async function list(req, res) {
  const tenantId = req.tenant?.id ?? req.auth?.tenantId;
  if (!tenantId) {
    return res.status(400).json({ ok: false, error: "Tenant context required" });
  }
  const rows = await repo.listByTenant({ tenantId });
  res.json({ ok: true, data: rows });
}

async function add(req, res) {
  const tenantId = req.tenant?.id ?? req.auth?.tenantId;
  const name = req.body?.name;
  if (!tenantId) {
    return res.status(400).json({ ok: false, error: "Tenant context required" });
  }
  if (!name || !String(name).trim()) {
    return res.status(400).json({ ok: false, error: "Name is required" });
  }
  const row = await repo.create({ tenantId, name: String(name).trim() });
  res.status(201).json({ ok: true, data: row });
}

async function remove(req, res) {
  const tenantId = req.tenant?.id ?? req.auth?.tenantId;
  const { id } = req.params;
  if (!tenantId || !id) {
    return res.status(400).json({ ok: false, error: "Tenant and id required" });
  }
  const deleted = await repo.remove({ tenantId, id });
  if (!deleted) {
    return res.status(404).json({ ok: false, error: "College not found" });
  }
  res.json({ ok: true });
}

module.exports = {
  list,
  add,
  remove,
};
