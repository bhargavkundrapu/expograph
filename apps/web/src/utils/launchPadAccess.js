/**
 * Startup LaunchPad uses the same entitlement as Real Client Lab checklist "hasAccess":
 * All Pack OR all three main courses (Vibe Coding, Prompt Engineering, Prompt to Profit).
 * @param {Record<string, unknown> | null | undefined} userOrMe — Auth `user` or `/api/v1/me` payload
 */
export function hasLaunchPadAccess(userOrMe) {
  return userOrMe?.client_lab_checklist?.hasAccess === true;
}
