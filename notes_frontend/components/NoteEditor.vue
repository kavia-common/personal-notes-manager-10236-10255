<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        {{ isEditing ? 'Edit Note' : 'New Note' }}
      </h3>
      <div class="muted" v-if="isEditing">Editing existing</div>
      <div class="muted" v-else>Creating new</div>
    </div>
    <div class="card-body">
      <div v-if="!selected" class="empty">
        Select a note to edit or create a new one.
      </div>
      <form v-else @submit.prevent="onSave">
        <div class="field">
          <label for="title" class="label">Title</label>
          <input id="title" class="input" type="text" v-model="local.title" placeholder="Enter title" />
        </div>
        <div class="field">
          <label for="content" class="label">Content</label>
          <textarea id="content" class="textarea" v-model="local.content" placeholder="Write your note here..."></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Save Changes' : 'Create Note' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import type { Note } from '~/composables/useApi'

const props = defineProps<{
  selected: Note | null
  isEditing: boolean
}>()

const emit = defineEmits<{
  (e: 'save', value: { title: string; content: string }): void
  (e: 'cancel'): void
}>()

const local = reactive({
  title: '',
  content: '',
})

watch(() => props.selected, (val) => {
  local.title = val?.title ?? ''
  local.content = val?.content ?? ''
}, { immediate: true })

function onSave() {
  emit('save', { title: local.title, content: local.content })
}
</script>
