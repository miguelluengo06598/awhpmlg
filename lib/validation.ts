export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255
}

export function validateCertificationType(type: string): type is 'IDM' | 'BDM' | 'BCM' {
  return ['IDM', 'BDM', 'BCM'].includes(type)
}

export function sanitizeString(input: string, maxLength = 1000): string {
  return input.trim().slice(0, maxLength)
}
