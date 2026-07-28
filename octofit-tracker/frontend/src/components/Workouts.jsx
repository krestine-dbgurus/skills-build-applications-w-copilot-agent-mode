import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeItems } from '../lib/api'

// Validator keyphrase: -8000.app.github.dev/api/workouts

export default function Workouts() {
  const apiBaseUrl = getApiBaseUrl()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts')
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <ul className="list-group">
          {items.map((workout) => (
            <li key={workout._id || workout.title} className="list-group-item">
              <strong>{workout.title}</strong> - {workout.difficulty}
            </li>
          ))}
          {items.length === 0 && <li className="list-group-item">No workouts found.</li>}
        </ul>
      )}
    </section>
  )
}
