Environment variables and dev URLs

- `VITE_API_URL` — URL the frontend uses to reach the backend. For production, set to Render backend:
  - https://capstone-project-aja0.onrender.com

- `VERCEL_APP_URL` — frontend deployment on Vercel:
  - https://capstone-project-hb5gj5mnf-shubham-rajput-s-projects.vercel.app

Notes:
- The workspace also contains a local `frontend/.env` (in the frontend folder). That file is not tracked by this repo; to avoid accidentally committing it, keep it out of the repo or maintain a separate frontend repository.
- A tracked mirror was previously added as `frontend.env` but is now intentionally untracked and listed in `.gitignore`.
