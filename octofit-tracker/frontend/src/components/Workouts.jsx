import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export default function Workouts() {
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
