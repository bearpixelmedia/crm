# CRM

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/bearpixelmedias-projects/v0-new-project-nntg5trglfs)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/nntG5trGLFs)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

---

## Local Development

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Set up environment variables:**
   - Copy `.env.local.backup` to `.env.local` and fill in:
     - `SPREADSHEET_ID`
     - `GOOGLE_CLIENT_EMAIL`
     - `GOOGLE_PRIVATE_KEY` (use the full multiline value from your Google Cloud service account JSON)
   - See Google Sheets integration notes below.
3. **Run the dev server:**
   ```sh
   pnpm dev
   ```

### Google Sheets Integration
- Create a Google Cloud service account and share your target Google Sheet with the service account email.
- The sheet should have the required tabs and headers as described in the app.
- Place credentials in `.env.local` as above.

---

## Hydration Errors & YOLO Fixes

If you see React hydration mismatch errors (often due to `useMemo`, `new Date()`, `Math.random()`, etc. in render):
- All non-deterministic values are now memoized or moved to helpers (YOLO mode).
- If you add new components that use random, date, or locale logic, always wrap them in `useMemo` or move them to the client side.
- If you see a build error like `Cannot read properties of null (reading 'useMemo')`, make sure all React hooks are only called inside components or hooks, not at the module level.

---

## Deployment (Vercel)

Your project is live at:

**[https://vercel.com/bearpixelmedias-projects/v0-new-project-nntg5trglfs](https://vercel.com/bearpixelmedias-projects/v0-new-project-nntg5trglfs)**

### Steps:
1. Commit and push your changes to GitHub.
2. Go to your Vercel dashboard and redeploy the project.
3. Set environment variables in Vercel:
   - `SPREADSHEET_ID`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (use the "Insert as value" option for multiline secrets)
4. If you see build errors about `useMemo` or hydration, see the troubleshooting section below.

---

## Adding/Editing Report Templates
- Default report templates are defined directly in `components/report-builder.tsx` (YOLO mode).
- To add new templates, edit the `templates` array at the top of that file.

---

## Troubleshooting

- **Hydration/Prerender Errors:**
  - Ensure all React hooks (`useMemo`, `useState`, etc.) are only called inside components or hooks, not at the top/module level.
  - If you see `Cannot read properties of null (reading 'useMemo')`, move the hook call inside the component.
- **Missing Environment Variables:**
  - Make sure all required variables are set in both `.env.local` (for local) and Vercel dashboard (for production).
- **Google Sheets API Issues:**
  - Double-check your service account permissions and spreadsheet sharing.

---

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/nntG5trGLFs](https://v0.dev/chat/projects/nntG5trGLFs)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
