export function homePathForRole(role) {
  if (role === "SuperAdmin") return "/lms/superadmin";
  if (role === "TenantAdmin") return "/lms/admin";
  if (role === "Mentor") return "/lms/mentor";
  return "/lms/student";
}
