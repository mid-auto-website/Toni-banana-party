
# Тони Банана Парти Гестлист 🍌

Уеб приложение за събиране на предпочитания за напитки за рождения ден на Тони Банана. Интегрирано с Google Sheets за съхранение на данни.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

## Production Build

To create a static production bundle:

```bash
npm run build
```

**Output Folder:** `dist`

## Deployment on Netlify/Vercel

This is a static React Single Page Application (SPA).

1. **Connect your Git repository** to Netlify or Vercel.
2. **Configure Build Settings:**
   * **Build Command:** `npm run build`
   * **Publish Directory (Output Directory):** `dist`
3. **Deploy.**

No environment variables are required for the build, as the Google Apps Script API URL is configured in `config.ts`.
