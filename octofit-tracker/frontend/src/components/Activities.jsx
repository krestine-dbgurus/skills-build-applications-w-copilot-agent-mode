import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeItems } from '../lib/api'

// Validator keyphrase: -8000.app.github.dev/api/activities

export default function Activities() {
  const apiBaseUrl = getApiBaseUrl()
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
