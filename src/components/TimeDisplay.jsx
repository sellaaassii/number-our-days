import { useState } from 'react'
import { convertTime, formatNumber } from '../utils/calculations'

const UNITS = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

function TimeDisplay({ freeMonths, remainingMonths }) {
  const [unit, setUnit] = useState('months')

  const freeValue = convertTime(freeMonths, unit)
  const totalValue = convertTime(remainingMonths, unit)

  return (
    <div className="time-display">
      <div className="time-hero">
        <span className="time-label">Your remaining free time</span>
        <div className="time-value-wrapper">
          <span className="time-value" key={unit}>
            {formatNumber(freeValue)}
          </span>
          <span className="time-unit">{unit}</span>
        </div>
        <span className="time-sublabel">
          out of {formatNumber(totalValue)} total remaining {unit}
        </span>
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
