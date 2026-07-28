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

export default function Teams() {
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
