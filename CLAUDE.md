# CLAUDE.md

Live Board — a realtime message board on webface.cloud, and the reference for building apps on the platform. Static frontend, no build step: `index.html` + the PocketBase JS SDK. **Deploying = `git push`** (a webhook tells the platform to pull and ship; live at https://board.webface.cloud seconds later).

## How this app works

- Backend is a managed PocketBase instance at the same origin: `new PocketBase('/')`.
- Collections: `messages` (content, author→users relation, author_name, created). List/view are public; create requires auth and `author = @request.auth.id` — API rules are enforced server-side, never trust the client.
- Realtime: `pb.collection('messages').subscribe('*', handler)` — SSE, works through the platform proxy, no setup.
- Auth: `authWithPassword` and `authWithOAuth2({provider:'google'})` (Google needs the client ID pasted in the app admin once — see the platform docs at https://webface.cloud/docs/deploy).
- Data admin lives at `/_/` (superuser only). Schema changes happen there, not in code.

## Rules for changes

- Keep it dependency-free and buildless: one HTML file, the vendored `pocketbase.umd.js`, inline CSS/JS. If a change seems to need a bundler, reconsider the change.
- Always escape user content before inserting into the DOM (`esc()` helper) — messages are untrusted input.
- Test locally by opening index.html? No — the SDK needs the same-origin API; test against the live app or run `pocketbase serve` locally with a `messages` collection.
- Push to master deploys to production immediately. There is no staging; keep commits shippable.

## Platform conventions (apply to ANY webface.cloud app)

- Frontend at `/`, API at `/api/…`, admin at `/_/` — one origin, no CORS.
- New backend features = new collections + API rules in the admin, then talk to them with the SDK. Don't build a server.
- File uploads: a `file` field on a collection + multipart create. Auth: auth collections. Realtime: subscribe. It's all built in — check the PocketBase JS SDK docs before writing infrastructure.
