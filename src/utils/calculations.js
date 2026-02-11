export const DEFAULT_CATEGORIES = [
  { id: 'sleep', name: 'Sleeping', icon: '\u{1F319}', color: '#818cf8', hoursPerDay: 8 },
  { id: 'work', name: 'Work & Career', icon: '\u{1F4BC}', color: '#fbbf24', hoursPerDay: 8 },
  { id: 'eating', name: 'Eating & Cooking', icon: '\u{1F37D}\u{FE0F}', color: '#34d399', hoursPerDay: 1.5 },
  { id: 'commute', name: 'Commuting', icon: '\u{1F697}', color: '#f87171', hoursPerDay: 1 },
  { id: 'hygiene', name: 'Hygiene & Self-care', icon: '\u{1F6BF}', color: '#22d3ee', hoursPerDay: 1 },
  { id: 'social-media', name: 'Social Media', icon: '\u{1F4F1}', color: '#f472b6', hoursPerDay: 2 },
  { id: 'chores', name: 'Chores & Errands', icon: '\u{1F9F9}', color: '#a78bfa', hoursPerDay: 1 },
]

export const CUSTOM_COLOR_POOL = [
  '#fb923c', '#facc15', '#2dd4bf', '#60a5fa',
  '#c084fc', '#fb7185', '#86efac', '#fda4af',
]

export const FREE_TIME_COLOR = '#c8a45a'
export const LIVED_COLOR = '#2a2a2e'

const DAYS_PER_MONTH = 30.44

export function calculateLife(currentAge, expectedAge, categories) {
  const totalMonths = Math.round(expectedAge * 12)
  const livedMonths = Math.round(currentAge * 12)
  const remainingMonths = Math.max(0, totalMonths - livedMonths)

  const categoryBreakdown = categories.map(cat => {
    const fraction = cat.hoursPerDay / 24
    const months = Math.round(fraction * remainingMonths)
    return { ...cat, months }
  })

  const usedMonths = categoryBreakdown.reduce((sum, cat) => sum + cat.months, 0)
  const freeMonths = Math.max(0, remainingMonths - usedMonths)

  return {
    totalMonths,
    livedMonths,
    remainingMonths,
    categoryBreakdown,
    usedMonths,
    freeMonths,
  }
}

export function convertTime(months, unit) {
  switch (unit) {
    case 'years':   return months / 12
    case 'months':  return months
    case 'weeks':   return months * DAYS_PER_MONTH / 7
    case 'days':    return months * DAYS_PER_MONTH
    case 'hours':   return months * DAYS_PER_MONTH * 24
    case 'minutes': return months * DAYS_PER_MONTH * 24 * 60
    case 'seconds': return months * DAYS_PER_MONTH * 24 * 60 * 60
    default:        return months
  }
}

export function formatNumber(num) {
  if (num >= 1_000_000) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  if (num >= 100) {
    return Math.round(num).toLocaleString('en-US')
  }
  if (num >= 10) {
    return num.toFixed(1)
  }
  return num.toFixed(2)
}
