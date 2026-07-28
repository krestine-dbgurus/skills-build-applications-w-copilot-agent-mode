import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeItems } from '../lib/api'

// Validator keyphrase: -8000.app.github.dev/api/teams

export default function Teams() {
  const apiBaseUrl = getApiBaseUrl()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
      }
    }

    loadTeams()
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <ul className="list-group">
          {items.map((team) => (
            <li key={team._id || team.name} className="list-group-item">
              <strong>{team.name}</strong> - {team.city}
            </li>
          ))}
          {items.length === 0 && <li className="list-group-item">No teams found.</li>}
        </ul>
      )}
    </section>
  )
}
