# Notes Frontend (Nuxt 3)

A minimal, responsive Nuxt 3 frontend for creating, editing, deleting, and listing notes.

## Features
- Create, edit, delete, and list notes
- Minimalistic light theme
- Responsive layout with top navigation bar
- Editor section for creating/updating notes
- API base is configurable via environment variable

## Environment Variables
Configure the backend API base URL at runtime:

- NUXT_PUBLIC_API_BASE: Base URL for the notes API (e.g. `https://api.example.com` or `/api`).

Examples:
```bash
# Development with local API server on port 4000
NUXT_PUBLIC_API_BASE=http://localhost:4000 npm run dev

# Production build pointing to a hosted API
NUXT_PUBLIC_API_BASE=https://notes-api.example.com npm run build
```

If not provided, the app defaults to `/api`.

## Scripts
- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – run eslint

## Structure
- `assets/css/main.css` – global theme and layout styles
- `composables/useApi.ts` – API client using runtime config
- `composables/useNotes.ts` – reactive notes store
- `components/NoteList.vue` – note list UI
- `components/NoteEditor.vue` – create/edit form
- `pages/index.vue` – main page integrating list + editor
- `nuxt.config.ts` – Nuxt configuration with runtime public config

## Expected API
This frontend expects a backend providing:
- `GET    /notes` → `[ { id, title, content, createdAt?, updatedAt? } ]`
- `POST   /notes` → `{ id, title, content, createdAt?, updatedAt? }`
- `PUT    /notes/:id` → updated note
- `DELETE /notes/:id` → 204 No Content

You can set up an API gateway or proxy to map `/api` to your backend service.
