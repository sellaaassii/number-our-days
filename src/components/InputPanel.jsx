import { useState, useRef, useEffect } from 'react'

function InputPanel({ currentAge, expectedAge, categories, onAgeChange, onExpectedAgeChange, onCategoryChange, onAddCategory, onRemoveCategory }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const addInputRef = useRef(null)
  const totalHours = categories.reduce((sum, c) => sum + c.hoursPerDay, 0)
  const overBudget = totalHours > 24

  useEffect(() => {
    if (isAdding && addInputRef.current) {
      addInputRef.current.focus()
    }
  }, [isAdding])

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (newName.trim()) {
      onAddCategory(newName.trim())
      setNewName('')
      setIsAdding(false)
    }
  }

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

        {isAdding ? (
          <form className="add-category-form" onSubmit={handleAddSubmit}>
            <input
              ref={addInputRef}
              type="text"
              placeholder="e.g. Gaming, Reading, Exercise..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="add-category-input"
              onKeyDown={e => e.key === 'Escape' && setIsAdding(false)}
            />
            <button type="submit" className="add-confirm-btn" disabled={!newName.trim()}>
              Add
            </button>
            <button type="button" className="add-cancel-btn" onClick={() => { setIsAdding(false); setNewName('') }}>
              &times;
            </button>
          </form>
        ) : (
          <button className="add-category-btn" onClick={() => setIsAdding(true)}>
            + Add Activity
          </button>
        )}
      </div>
    </div>
  )
}

export default InputPanel
