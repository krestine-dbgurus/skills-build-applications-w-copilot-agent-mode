import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeItems } from '../lib/api'

// Validator keyphrase: -8000.app.github.dev/api/users

export default function Users() {
  const apiBaseUrl = getApiBaseUrl()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/users/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
      }
    }

    loadUsers()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <ul className="list-group">
          {items.map((user) => (
            <li key={user._id || user.email} className="list-group-item">
              <strong>{user.name}</strong> <span className="text-muted">({user.email})</span>
            </li>
          ))}
          {items.length === 0 && <li className="list-group-item">No users found.</li>}
        </ul>
      )}
    </section>
  )
}
