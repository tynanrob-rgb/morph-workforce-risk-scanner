# Morph Workforce Risk Scanner

Sample local demo web app built with React and Vite. It runs fully in the browser with no backend, no database, no authentication, and no external API dependencies.

## Recommended environment

- macOS
- Node.js 18 or newer
- npm 9 or newer

Node.js 20 LTS is a good default recommendation for local testing.

## Folder structure

```text
src/
  components/
    RiskForm.jsx
    ResultsCard.jsx
  utils/
    calculations.js
  App.jsx
  main.jsx
  index.css
index.html
package.json
vite.config.js
README.md
```

## Mac local setup

1. Open Terminal.
2. Navigate to the project folder:

```bash
cd "/Users/tyno/Documents/New project"
```

3. Install dependencies:

```bash
npm install
```

4. Start the local development server:

```bash
npm run dev
```

5. Open the localhost URL shown in Terminal, usually:

```text
http://localhost:5173
```

## How to stop the server

Press `Control + C` in Terminal.

## Production build preview

Build the app:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Then open the preview URL shown in Terminal.

## Public demo deployment

### Vercel

1. Push this project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/).
3. Import the repository.
4. Vercel should detect it as a Vite app automatically.
5. Deploy and share the generated URL with your team.

This project includes [`vercel.json`](/Users/tyno/Documents/New project/vercel.json) for a simple Vite deployment.

### Netlify

1. Push this project to a GitHub repository.
2. Sign in to [Netlify](https://www.netlify.com/).
3. Create a new site from Git.
4. Use these settings if prompted:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy and share the generated URL.

This project includes [`netlify.toml`](/Users/tyno/Documents/New project/netlify.toml) with those defaults.

## Important note

I can prepare the app for public deployment, but I cannot create the live public URL directly from this environment because network access and deployment account authentication are not available here.

## What the app does

The app lets a user enter:

- Workforce size
- Industry
- Injury frequency
- Absenteeism

It then calculates:

- Estimated annual loss in GBP
- Risk score out of 100
- Risk band
- Suggested Morph intervention
- Absenteeism cost
- Injury cost

## Calculation model

Industry assumptions are stored in [`src/utils/calculations.js`](/Users/tyno/Documents/New project/src/utils/calculations.js).

Formulas:

- `absenteeismCost = workforceSize * absenteeism * dailySalary`
- `injuryCost = injuryFrequency * injuryCostByIndustry`
- `estimatedAnnualLoss = absenteeismCost + injuryCost`

Risk score:

- Absenteeism weighted at 40%
- Injury weighted at 60%

## Notes

- This is a local sample prototype for demo and testing.
- There is no backend or persistent storage.
- The “Book a Morph Demo” button is a local CTA-style button for the demo UI.
