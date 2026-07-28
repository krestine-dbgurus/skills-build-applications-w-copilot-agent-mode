function normalizeCodespaceName(value) {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return ''
  return trimmed
}

function detectCodespaceNameFromHost() {
  if (typeof window === 'undefined') return ''
  const match = window.location.hostname.match(/^(.*)-5173\.app\.github\.dev$/)
  return match?.[1] ?? ''
}

export function getApiBaseUrl() {
  const envCodespace = normalizeCodespaceName(import.meta.env.VITE_CODESPACE_NAME)
  const hostCodespace = detectCodespaceNameFromHost()
  const codespaceName = envCodespace || hostCodespace

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}
