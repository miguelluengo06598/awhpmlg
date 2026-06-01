export function normalizeCertCode(term: string): string {
  return term.trim().toUpperCase().replace(/\s+/g, '-')
}

export function filterCertificates<
  T extends { certification_code: string; full_name: string }
>(certificates: T[], term: string): T[] {
  if (!term.trim()) return certificates
  // Code search: convert spaces → hyphens so "IDM 2026" matches "IDM-2026-1230"
  const codeQ = normalizeCertCode(term)
  // Name search: plain case-insensitive (don't add hyphens to names)
  const nameQ = term.trim().toUpperCase()
  return certificates.filter(
    (c) =>
      c.certification_code.toUpperCase().includes(codeQ) ||
      c.full_name.toUpperCase().includes(nameQ)
  )
}
