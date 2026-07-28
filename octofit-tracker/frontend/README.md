# OctoFit Frontend

This React 19 + Vite frontend uses `react-router-dom` and connects to the backend API.

## Environment Variable

Define `VITE_CODESPACE_NAME` for Codespaces API routing. Example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, components call:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not defined, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents invalid URLs like `https://undefined-8000...`.
