# Deployment Guide

This guide covers how to manually deploy the **Backend to Render** and the **Frontend to Vercel**.

---

## 🚀 Part 1: Deploy Backend to Render.com

1.  **Push your code to GitHub** (Ensure your latest changes are on the `main` branch).
2.  **Log in to [Render dashboard](https://dashboard.render.com/)**.
3.  Click **New +** and select **Web Service**.
4.  Connect your GitHub account and select your repository: `Tailwind-Shikho-React-Redux`.
5.  **Configure the Service**:
    *   **Name**: `shikho-backend` (or any unique name)
    *   **Region**: Closest to your users (e.g., Singapore or Frankfurt)
    *   **Branch**: `main`
    *   **Root Directory**: `server` (Important! This tells Render the backend is in the server folder)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
        *   *(Note: This installs dependencies and compiles TypeScript)*
    *   **Start Command**: `npm start`
6.  **Environment Variables** (Scroll down to "Advanced" -> "Environment Variables"):
    Add the following keys and values from your local `.env`:
    *   `NODE_ENV`: `production`
    *   `MONGODB_URI`: `your_mongodb_atlas_connection_string`
        *   *(Do NOT use `localhost`. You need a cloud database like MongoDB Atlas)*
    *   `JWT_SECRET`: `your_secure_random_secret`
    *   `CLIENT_URL`: `https://your-frontend-project.vercel.app`
        *   *(You will update this AFTER deploying the frontend)*
7.  Click **Create Web Service**.
8.  Wait for the deployment to finish. Copy your new backend URL (e.g., `https://shikho-backend.onrender.com`).

---

## 🌐 Part 2: Deploy Frontend to Vercel

1.  **Log in to [Vercel](https://vercel.com/)**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository: `Tailwind-Shikho-React-Redux`.
4.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click the "Edit" button and select `client`.
        *   *(Important: Vercel needs to know the frontend is in the `client` folder)*
5.  **Build and Output Settings** (Should auto-detect, but verify):
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
6.  **Environment Variables**:
    *   If your frontend uses any `.env` vars (like `VITE_API_URL`), add them here.
    *   For this project, you will likely need to update your API calls in the code to point to the Render Backend URL instead of `localhost:5000`.
    *   **Recommended**: Update `client/src/store/authSlice.ts` and `designsSlice.ts` to use an environment variable for the base URL.
        *   Create `VITE_API_URL` = `https://shikho-backend.onrender.com/api`
7.  Click **Deploy**.

---

## 🔗 Part 3: Final Connection

1.  Once Vercel deploys, copy the **Frontend URL** (e.g., `https://shikho-tailwind.vercel.app`).
2.  Go back to **Render Dashboard** -> **Environment Variables**.
3.  Update (or add) `CLIENT_URL` with your new Vercel URL.
    *   *This ensures CORS (Cross-Origin Resource Sharing) allows your frontend to talk to your backend.*
4.  **Redeploy** the backend (Render usually auto-deploys on env var changes, or click "Manual Deploy" -> "Deploy latest commit").

**🎉 Done! Your full stack app is now live.**
