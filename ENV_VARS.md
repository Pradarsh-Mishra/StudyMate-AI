Environment variables and dev URLs

- `VITE_API_URL` — URL the frontend uses to reach the backend. For production, set to Render backend:
  - https://capstone-project-aja0.onrender.com

- `VERCEL_APP_URL` — frontend deployment on Vercel:
  - https://capstone-project-hb5gj5mnf-shubham-rajput-s-projects.vercel.app

Notes:
- The workspace also contains a local `frontend/.env` (in the frontend folder). That file is not tracked by this repo; to avoid accidentally committing it, keep it out of the repo or maintain a separate frontend repository.
- A tracked mirror was previously added as `frontend.env` but is now intentionally untracked and listed in `.gitignore`.

Local frontend `.env` and deployment

- Create a local frontend environment file at `frontend/.env` (workspace root `frontend` folder). Example contents:

  VITE_API_URL=https://capstone-project-aja0.onrender.com

  Save that file locally — do NOT commit it to this repo (it's intentionally ignored).

- Run frontend locally:

  1. Open a terminal in the `frontend` folder.
  2. Install dependencies: `npm install`
  3. Start dev server: `npm run dev`

- Deploying frontend (Vercel):

  1. In your Vercel project, go to Settings → Environment Variables.
  2. Add `VITE_API_URL` with value `https://capstone-project-aja0.onrender.com` for the appropriate environment (Preview/Production).
  3. Trigger a deploy (push to the connected Git branch or redeploy from the Vercel dashboard).

- Deploying backend (Render):

  1. In your Render service settings, set an environment variable (if needed) and ensure the service is running at `https://capstone-project-aja0.onrender.com`.
  2. If the backend exposes other secrets (API keys), configure them in Render's dashboard rather than hardcoding.

- Notes on secrets:

  - Do not commit API keys or secrets into the repo. Use Render/Vercel environment settings or a local `.env` kept out of source control.
  - Consider moving the hardcoded API key in `backend/main.py` into environment variables (e.g., `OPENAI_API_KEY`) for safety.

OPENAI API key (backend)

- Local dev:

  - Set the `OPENAI_API_KEY` (and optional `OPENAI_BASE_URL`) in your shell before running the backend.
    - PowerShell (Windows):
      ```powershell
      $env:OPENAI_API_KEY = "sk-..."
      $env:OPENAI_BASE_URL = "https://apidev.navigatelabsai.com" # optional
      python backend/main.py
      ```
    - Bash/macOS/Linux:
      ```bash
      export OPENAI_API_KEY="sk-..."
      export OPENAI_BASE_URL="https://apidev.navigatelabsai.com" # optional
      python backend/main.py
      ```

- Render (production):

  - In your Render service, go to the Service Dashboard → Environment → Environment Variables and add:
    - `OPENAI_API_KEY` = your secret key
    - `OPENAI_BASE_URL` = (if required) the API base URL
  - Redeploy the service after adding vars.

- Security note: never commit real secrets. Use platform environment variables or a secrets manager.
