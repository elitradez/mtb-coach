# MTB Coach MVP

A truthful web MVP and waitlist for an AI mountain-bike coaching product. The first skill is bunny hops.

## Current loop

Side-on clip → filming-protocol check → clearly labeled example feedback → founding-rider waitlist.

The browser preview does **not** upload or analyze video. The analysis card is intentionally marked as a fixture until a coach-validated model is connected.

## Run

```bash
npm test
npm run serve
```

Open `http://localhost:4173`.

## Waitlist

The production form uses the founder's activated FormSubmit endpoint and redirects to `thanks.html` on the published GitHub Pages URL. Fields are intentionally minimal: email, riding level, bunny-hop problem, and optional social handle. If the form provider is unavailable, the UI exposes a prefilled email fallback to `eli-launchcreative@agentmail.to` instead of losing the submission silently.

## Validation events

The MVP stores these events locally in `localStorage` under `mtb-coach-events`:

- `clip_selected`
- `analysis_preview_viewed`
- `waitlist_submitted`

These local events are QA instrumentation, not market evidence or production analytics.

## Before connecting real analysis

- Obtain 30–50 consented, consistently filmed clips.
- Have experienced MTB coaches label movement phases and the highest-priority error independently.
- Measure model/coach agreement and abstain when footage is unsuitable.
- Do not infer invisible inputs such as brake use, pedal pressure, grip pressure, or gaze direction.
- Keep advice educational and progressive; do not guarantee safe execution.
