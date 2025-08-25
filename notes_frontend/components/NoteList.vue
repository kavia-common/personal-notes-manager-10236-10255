<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Your Notes</h3>
      <span class="badge" title="Total notes">{{ count }} total</span>
    </div>
    <div class="card-body">
      <div v-if="loading" class="muted">Loading notes…</div>
      <div v-else-if="error" class="muted">Error: {{ error }}</div>
      <div v-else>
        <div v-if="notes.length === 0" class="empty">
          No notes yet. Click “New Note” to create your first note.
        </div>
        <div v-else class="note-list">
          <article v-for="note in notes" :key="note.id" class="note-item">
            <div>
              <h4 class="note-title">{{ note.title || 'Untitled' }}</h4>
              <div class="note-meta">
                <span v-if="note.updatedAt">Updated {{ formatDate(note.updatedAt) }}</span>
                <span v-else-if="note.createdAt">Created {{ formatDate(note.createdAt) }}</span>
              </div>
            </div>
            <div class="note-actions">
              <button class="btn btn-ghost" @click="$emit('edit', note)" aria-label="Edit note">
                ✏️ Edit
              </button>
              <button class="btn btn-secondary" @click="$emit('delete', note)" aria-label="Delete note">
                🗑️ Delete
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useApi'

defineProps<{
  notes: Note[]
  loading: boolean
  error: string | null
  count: number
}>()

defineEmits<{
  (e: 'edit', note: Note): void
  (e: 'delete', note: Note): void
}>()

function formatDate(d: string) {
  try {
    const date = new Date(d)
    return date.toLocaleString()
  } catch {
    return d
  }
}
</script>
