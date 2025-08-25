import { ref, computed } from 'vue'
import { useApi, type Note, type NoteCreate, type NoteUpdate } from './useApi'

/**
 * PUBLIC_INTERFACE
 * Reactive notes store handling fetch, select, create, update, delete.
 */
export function useNotes() {
  /** This is a public function. Returns reactive state and operations for notes. */
  const { listNotes, createNote, updateNote, deleteNote } = useApi()

  const notes = ref<Note[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selected = ref<Note | null>(null)
  const isEditing = ref(false)

  // PUBLIC_INTERFACE
  async function refresh() {
    /** Reload the notes list from the server. */
    loading.value = true
    error.value = null
    try {
      notes.value = await listNotes()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load notes'
    } finally {
      loading.value = false
    }
  }

  // PUBLIC_INTERFACE
  function startCreate() {
    /** Prepare UI for creating a new note. */
    selected.value = { id: '', title: '', content: '' }
    isEditing.value = false
  }

  // PUBLIC_INTERFACE
  function startEdit(note: Note) {
    /** Prepare UI for editing an existing note. */
    selected.value = { ...note }
    isEditing.value = true
  }

  // PUBLIC_INTERFACE
  function clearSelection() {
    /** Clear the current selection. */
    selected.value = null
    isEditing.value = false
  }

  // PUBLIC_INTERFACE
  async function saveSelected() {
    /** Save current selected note (create or update). */
    if (!selected.value) return
    const payload: NoteCreate = { title: selected.value.title, content: selected.value.content }
    try {
      if (isEditing.value && selected.value.id) {
        const updated = await updateNote(selected.value.id, payload as NoteUpdate)
        const idx = notes.value.findIndex(n => n.id === updated.id)
        if (idx !== -1) notes.value[idx] = updated
      } else {
        const created = await createNote(payload)
        notes.value.unshift(created)
      }
      clearSelection()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to save note'
    }
  }

  // PUBLIC_INTERFACE
  async function remove(note: Note) {
    /** Delete a note and update local list. */
    try {
      await deleteNote(note.id)
      notes.value = notes.value.filter(n => n.id !== note.id)
      if (selected.value?.id === note.id) clearSelection()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to delete note'
    }
  }

  const count = computed(() => notes.value.length)

  return {
    notes, loading, error, selected, isEditing, count,
    refresh, startCreate, startEdit, clearSelection, saveSelected, remove,
  }
}
