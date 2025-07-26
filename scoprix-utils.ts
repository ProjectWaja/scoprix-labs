import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): T {
  let timeout: NodeJS.Timeout | null = null
  
  return ((...args: any[]) => {
    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func(...args)
    }, wait)
    
    if (callNow) func(...args)
  }) as T
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString()
}

// Construction industry specific utilities
export function generateCORNumber(): string {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  return `COR-${year}-${randomNum}`
}

export function calculateSMACNARate(baseRate: number, location: string): number {
  const locationMultipliers: { [key: string]: number } = {
    'Los Angeles, CA': 1.15,
    'San Francisco, CA': 1.25,
    'San Diego, CA': 1.10,
    'Phoenix, AZ': 1.05,
    'Las Vegas, NV': 1.08,
    'Seattle, WA': 1.12,
  }
  
  return baseRate * (locationMultipliers[location] || 1.0)
}

export function formatConfidenceScore(score: number): string {
  return `${Math.round(score)}%`
}

export function getProjectPhase(percentage: number): string {
  if (percentage <= 30) return 'Schematic Design'
  if (percentage <= 50) return 'Design Development'
  if (percentage <= 90) return 'Construction Documents'
  return 'Final Documents'
}