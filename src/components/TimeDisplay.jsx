import { useState } from 'react'
import { convertTime, formatNumber } from '../utils/calculations'

const UNITS = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

function TimeDisplay({ freeMonths, remainingMonths, totalHours }) {
  const [unit, setUnit] = useState('months')
  const isOverBudget = totalHours > 24

  const freeValue = convertTime(Math.max(0, freeMonths), unit)
  const totalValue = convertTime(remainingMonths, unit)

  return (
    <div className={`time-display ${isOverBudget ? 'time-display-warning' : ''}`}>
      <div className="time-hero">
        <span className="time-label">Your remaining free time</span>
        <div className="time-value-wrapper">
          <span className={`time-value ${isOverBudget ? 'time-value-zero' : ''}`} key={unit}>
            {isOverBudget ? '0' : formatNumber(freeValue)}
          </span>
          <span className="time-unit">{unit}</span>
        </div>
        {isOverBudget ? (
          <span className="time-warning">
            You've planned more than a day can hold. Adjust your activities to reflect reality.
          </span>
        ) : (
          <span className="time-sublabel">
            out of {formatNumber(totalValue)} total remaining {unit}
          </span>
        )}
      </div>

      <div className="unit-toggles">
        {UNITS.map(u => (
          <button
            key={u}
            className={`unit-pill ${u === unit ? 'active' : ''}`}
            onClick={() => setUnit(u)}
          >
            {u.charAt(0).toUpperCase() + u.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeDisplay
