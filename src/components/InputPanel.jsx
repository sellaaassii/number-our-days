import { CUSTOM_COLOR_POOL } from '../utils/calculations'

function InputPanel({ currentAge, expectedAge, categories, onAgeChange, onExpectedAgeChange, onCategoryChange, onAddCategory, onRemoveCategory }) {
  const totalHours = categories.reduce((sum, c) => sum + c.hoursPerDay, 0)
  const overBudget = totalHours > 24

  return (
    <div className="input-panel">
      <div className="input-section">
        <h2 className="section-title">Your Timeline</h2>
        <div className="age-inputs">
          <div className="age-field">
            <label htmlFor="current-age">Current Age</label>
            <input
              id="current-age"
              type="number"
              min="0"
              max="150"
              value={currentAge}
              onChange={e => onAgeChange(Math.max(0, Number(e.target.value)))}
            />
          </div>
          <div className="age-field">
            <label htmlFor="expected-age">Expected Lifespan</label>
            <input
              id="expected-age"
              type="number"
              min="1"
              max="150"
              value={expectedAge}
              onChange={e => onExpectedAgeChange(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>
      </div>

      <div className="input-section">
        <div className="section-header">
          <h2 className="section-title">Daily Activities</h2>
          <span className={`hours-budget ${overBudget ? 'over' : ''}`}>
            {totalHours.toFixed(1)} / 24 hrs
          </span>
        </div>

        <div className="categories-list">
          {categories.map(cat => (
            <div key={cat.id} className="category-row">
              <div className="category-info">
                <span
                  className="category-dot"
                  style={{ background: cat.color }}
                />
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </div>
              <div className="category-input-group">
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="0.5"
                  value={cat.hoursPerDay}
                  onChange={e => onCategoryChange(cat.id, Number(e.target.value))}
                  className="category-slider"
                  style={{
                    '--slider-color': cat.color,
                    '--slider-pct': `${(cat.hoursPerDay / 16) * 100}%`,
                  }}
                />
                <div className="hours-display">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={cat.hoursPerDay}
                    onChange={e => onCategoryChange(cat.id, Math.max(0, Math.min(24, Number(e.target.value))))}
                    className="hours-number-input"
                  />
                  <span className="hours-label">hrs</span>
                </div>
                {cat.isCustom && (
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveCategory(cat.id)}
                    aria-label={`Remove ${cat.name}`}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="add-category-btn" onClick={onAddCategory}>
          + Add Activity
        </button>
      </div>
    </div>
  )
}

export default InputPanel
