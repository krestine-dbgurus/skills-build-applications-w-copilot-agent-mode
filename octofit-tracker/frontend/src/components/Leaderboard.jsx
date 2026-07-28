import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeItems } from '../lib/api'

export default function Leaderboard() {
  const apiBaseUrl = getApiBaseUrl()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <ul className="list-group">
          {items.map((board) => (
            <li key={board._id || board.period} className="list-group-item">
              <strong>{board.period}</strong> - {Array.isArray(board.entries) ? board.entries.length : 0} entries
            </li>
          ))}
          {items.length === 0 && <li className="list-group-item">No leaderboard data found.</li>}
        </ul>
      )}
    </section>
  )
}
