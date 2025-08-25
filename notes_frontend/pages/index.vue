<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-inner container">
        <div class="brand">
          <div class="brand-badge" />
          <div>
            <div class="brand-title">Notes</div>
            <div class="muted" style="font-size:12px">Minimal & Focused</div>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-ghost" @click="refresh" :disabled="loading" title="Refresh">
            🔄 Refresh
          </button>
          <button class="btn btn-primary" @click="onNew" title="Create new note">
            ➕ New Note
          </button>
        </div>
      </div>
    </header>

    <main class="content container">
      <div class="grid">
        <NoteList
          :notes="notes"
          :loading="loading"
          :error="error"
          :count="count"
          @edit="onEdit"
          @delete="onDelete"
        />

        <NoteEditor
          :selected="selected"
          :isEditing="isEditing"
          @save="onSave"
          @cancel="clearSelection"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'
import NoteList from '~/components/NoteList.vue'
import NoteEditor from '~/components/NoteEditor.vue'

const {
  notes, loading, error, selected, isEditing, count,
  refresh, startCreate, startEdit, clearSelection, saveSelected, remove,
} = useNotes()

onMounted(() => {
  refresh()
})

function onNew() {
  startCreate()
}

function onEdit(note: any) {
  startEdit(note)
}

async function onSave(payload: { title: string; content: string }) {
  if (selected.value) {
    selected.value.title = payload.title
    selected.value.content = payload.content
  }
  await saveSelected()
}

async function onDelete(note: any) {
  if (confirm('Delete this note?')) {
    await remove(note)
  }
}
</script>
