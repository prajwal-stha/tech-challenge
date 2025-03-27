const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

export async function apiFetch(path: string, options: RequestInit = {}) {
  const finalOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  }

  // Only add Content-Type for methods that send a body
  if (options.method && ['POST', 'PUT', 'PATCH'].includes(options.method.toUpperCase())) {
    finalOptions.headers = {
      'Content-Type': 'application/json',
      ...finalOptions.headers,
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, finalOptions)

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`)
  }

  return res.json()
}