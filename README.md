This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## HD Image Pipeline

The site's photos (hero, why, gallery) come from high-res originals, never the low-res PDF embeds:

1. Drop original photos into `public/originals/` (gitignored): `hero.jpg`, `why.jpg`, `gallery-01.jpg` … `gallery-06.jpg` (`.png`/`.webp` accepted).
2. Run `python scripts/optimize_images.py` → writes HD WebP (q85, downscale-only) to `public/assets/img/`.
3. Point `app/data.ts` and components at the generated `/assets/img/<slot>.webp` paths.

Keep sources: `scripts/company-profile.pdf` (gitignored, 274MB) and `public/originals/` are not deployed.

## Video (future-proofing)

If a video is ever added, never re-encode an already-encoded file, and never downscale to a lower bitrate — the goal is true source quality:

- Encode once: `ffmpeg -i source.mov -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4` (or h265/AV1 for WebM).
- Host on Vercel Blob (CDN) or Cloudinary/Mux; render with `<video preload="none" poster="...">` so the page stays fast and playback uses the real quality file.

## Contact Form -> Google Sheets

The "GET A QUOTE" form at the bottom of the landing page submits to `app/api/contact/route.ts`, which forwards the data to a Google Sheet via a Google Apps Script web app.

Setup (one-time, in your browser):

1. **Create the sheet** — new Google Sheet with a first sheet whose header row is:
   `Fullname | Company Name | Address | Contact Number | TIN Number | Item Number | Brand / Model | Description | Quantity | Unit`
2. **Add the script** — in the sheet: Extensions -> Apps Script. Paste the contents of [`scripts/appsscript/Code.gs`](scripts/appsscript/Code.gs), set the `SHEET_ID` constant to your spreadsheet's ID (the part in the URL between `/d/` and `/edit`), and save. If you re-paste the script after an update, **re-deploy the web app** (the URL stays the same).
3. **Deploy as web app** — Deploy -> New deployment -> Type: Web app -> Execute as: *Me* -> Who has access: *Anyone* -> Deploy. Copy the **Web app URL**.
4. **Configure the app** — create `.env.local` at the repo root:
   ```bash
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   ```
5. Restart `npm run dev` (env changes require a restart) and submit the form to confirm a row appears in the sheet.

The form supports quoting multiple items in one submission; each item is written as **one row** in the sheet (contact details repeated on each row). Quantity defaults to 1 and is required per item.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
