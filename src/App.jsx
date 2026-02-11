import { useState, useMemo, useCallback } from 'react'
import InputPanel from './components/InputPanel'
import LifeGrid from './components/LifeGrid'
import TimeDisplay from './components/TimeDisplay'
import { DEFAULT_CATEGORIES, CUSTOM_COLOR_POOL, calculateLife } from './utils/calculations'
import './App.css'

function App() {
  const [currentAge, setCurrentAge] = useState(25)
  const [expectedAge, setExpectedAge] = useState(90)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [customCount, setCustomCount] = useState(0)

  const lifeData = useMemo(
    () => calculateLife(currentAge, expectedAge, categories),
    [currentAge, expectedAge, categories]
  )

  const handleCategoryChange = useCallback((id, hoursPerDay) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, hoursPerDay } : c))
    )
  }, [])

  const handleAddCategory = useCallback((name) => {
    const color = CUSTOM_COLOR_POOL[customCount % CUSTOM_COLOR_POOL.length]
    setCategories(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name,
        icon: '\u{2B50}',
        color,
        hoursPerDay: 1,
        isCustom: true,
      },
    ])
    setCustomCount(c => c + 1)
  }, [customCount])

  const handleRemoveCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }, [])

  return (
    <div className="app">
      <header className="hero">
        <h1 className="hero-title">
          Your Life<span className="hero-accent">,</span> Visualized
        </h1>
        <p className="hero-subtitle">
          &#x23F3; Understand where your time goes and how much remains ahead of you &#x23F3;
        </p>
        <blockquote className="hero-verses">
          <p className="hero-verse">
            <span className="verse-ref">Psalm 90:12</span>
            "So teach us to number our days, that we may apply our hearts unto wisdom."
          </p>
          <p className="hero-verse">
            <span className="verse-ref">James 4:13-15</span>
            "You do not even know what will happen tomorrow. What is your life? You are a mist that appears for a little while and then vanishes."
          </p>
          <p className="hero-verse">
            <span className="verse-ref">Ephesians 5:15-17</span>
            "Be very careful, then, how you live — not as unwise but as wise, making the most of every opportunity."
          </p>
        </blockquote>
      </header>

      <main className="main-layout">
        <aside className="sidebar">
          <InputPanel
            currentAge={currentAge}
            expectedAge={expectedAge}
            categories={categories}
            onAgeChange={setCurrentAge}
            onExpectedAgeChange={setExpectedAge}
            onCategoryChange={handleCategoryChange}
            onAddCategory={handleAddCategory}
            onRemoveCategory={handleRemoveCategory}
          />
        </aside>

        <section className="visualization">
          <TimeDisplay
            freeMonths={lifeData.freeMonths}
            remainingMonths={lifeData.remainingMonths}
          />
          <LifeGrid lifeData={lifeData} />
        </section>
      </main>
    </div>
  )
}

export default App
