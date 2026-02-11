import { useMemo } from 'react'
import { FREE_TIME_COLOR, LIVED_COLOR } from '../utils/calculations'

function LifeGrid({ lifeData }) {
  const { totalMonths, livedMonths, categoryBreakdown, freeMonths } = lifeData

  const dots = useMemo(() => {
    const result = []

    // Months already lived
    for (let i = 0; i < livedMonths && i < totalMonths; i++) {
      result.push({ color: LIVED_COLOR, label: 'Lived', index: i })
    }

    // Distribute category months across remaining time
    let offset = livedMonths
    for (const cat of categoryBreakdown) {
      for (let i = 0; i < cat.months && offset < totalMonths; i++) {
        result.push({ color: cat.color, label: cat.name, index: offset })
        offset++
      }
    }

    // Free months
    for (let i = 0; i < freeMonths && offset < totalMonths; i++) {
      result.push({ color: FREE_TIME_COLOR, label: 'Free time', index: offset, isFree: true })
      offset++
    }

    return result
  }, [totalMonths, livedMonths, categoryBreakdown, freeMonths])

  return (
    <div className="life-grid-container">
      <h2 className="section-title">Your Life in Months</h2>
      <p className="grid-subtitle">
        Each dot is one month. <span style={{ color: LIVED_COLOR, textShadow: '0 0 2px #555' }}>Gray</span> = lived.{' '}
        <span style={{ color: FREE_TIME_COLOR }}>Green</span> = your free time.
      </p>
      <div className="life-grid" role="img" aria-label="Life visualization grid">
        {dots.map((dot, i) => (
          <div
            key={i}
            className={`dot ${dot.isFree ? 'dot-free' : ''} ${dot.label === 'Lived' ? 'dot-lived' : ''}`}
            style={{
              '--dot-color': dot.color,
              animationDelay: `${i * 0.3}ms`,
            }}
            title={`Month ${dot.index + 1}: ${dot.label}`}
          />
        ))}
      </div>
      <div className="grid-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: LIVED_COLOR }} />
          <span>Lived ({livedMonths})</span>
        </div>
        {categoryBreakdown.map(cat => (
          cat.months > 0 && (
            <div key={cat.id} className="legend-item">
              <span className="legend-dot" style={{ background: cat.color }} />
              <span>{cat.name} ({cat.months})</span>
            </div>
          )
        ))}
        <div className="legend-item">
          <span className="legend-dot dot-free-legend" style={{ background: FREE_TIME_COLOR }} />
          <span>Free time ({freeMonths})</span>
        </div>
      </div>
    </div>
  )
}

export default LifeGrid
