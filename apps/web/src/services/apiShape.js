export function unwrapData(json) {
  return json?.data ?? json;
}

export function unwrapArray(json) {
  const d = unwrapData(json);
  return Array.isArray(d) ? d : [];
}