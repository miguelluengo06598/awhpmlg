import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Convención shadcn/ui: fusiona clases Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
