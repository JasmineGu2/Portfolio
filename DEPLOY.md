# Deploy to Vercel

This project is a Next.js app and is ready for Vercel.

## One-time setup

1. **Push to GitHub** (from your machine, where you're logged into GitHub):

   ```bash
   git push origin main
   ```

2. **Connect Vercel to GitHub**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import **`JasmineGu2/Portfolio`**
   - Keep defaults: Framework **Next.js**, Build **`npm run build`**, Install **`npm install`**
   - Click **Deploy**

3. **Optional custom domain**: Vercel project → **Settings → Domains**

## After setup

Every push to `main` auto-deploys to production.

## Deploy from CLI (alternative)

```bash
npx vercel login
npm run deploy:preview   # preview URL
npm run deploy           # production
```

## Verify locally first

```bash
npm run build
npm run start
```

Open `/tesla` and `/` before deploying.
