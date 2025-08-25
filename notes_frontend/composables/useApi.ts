import { useRuntimeConfig } from '#app'

/**
 * PUBLIC_INTERFACE
 * Provides a typed API helper for Notes CRUD operations using runtime-configured base URL.
 */
export function useApi() {
  /** This is a public function. Builds and returns CRUD operations bound to the configured API base URL. */
  const config = useRuntimeConfig()
  // Use public config for client-side
  const baseURL = (config.public?.apiBase as string) || '/api'

  const $fetchJSON = async <T>(url: string, opts: RequestInit = {}): Promise<T> => {
    const resp = await fetch(`${baseURL}${url}`, {
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      ...opts,
    })
    if (!resp.ok) {
      let body: unknown
      try { body = await resp.json() } catch { /* ignore */ }
      const message = (body as any)?.message || resp.statusText
      throw new Error(`Request failed: ${resp.status} ${message}`)
    }
    return resp.status === 204 ? (undefined as unknown as T) : await resp.json()
  }

  // PUBLIC_INTERFACE
  async function listNotes(): Promise<Note[]> {
    /** Fetch all notes. */
    return $fetchJSON<Note[]>('/notes', { method: 'GET' })
  }

  // PUBLIC_INTERFACE
  async function createNote(payload: NoteCreate): Promise<Note> {
    /** Create a new note. */
    return $fetchJSON<Note>('/notes', { method: 'POST', body: JSON.stringify(payload) })
  }

  // PUBLIC_INTERFACE
  async function updateNote(id: string, payload: NoteUpdate): Promise<Note> {
    /** Update an existing note. */
    return $fetchJSON<Note>(`/notes/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) })
  }

  // PUBLIC_INTERFACE
  async function deleteNote(id: string): Promise<void> {
    /** Delete a note by id. */
    await $fetchJSON<void>(`/notes/${encodeURIComponent(id)}`, { method: 'DELETE' })
  }

  return { listNotes, createNote, updateNote, deleteNote }
}

export type Note = {
  id: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export type NoteCreate = {
  title: string
  content: string
}

export type NoteUpdate = Partial<NoteCreate>
