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

export default function Activities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/activities/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities')
      }
    }

    loadActivities()
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <ul className="list-group">
          {items.map((activity) => (
            <li key={activity._id || `${activity.type}-${activity.performedAt}`} className="list-group-item">
              <strong>{activity.type}</strong> for {activity.durationMinutes} minutes
            </li>
          ))}
          {items.length === 0 && <li className="list-group-item">No activities found.</li>}
        </ul>
      )}
    </section>
  )
}
