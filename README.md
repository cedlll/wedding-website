# Cedric & Karen — Wedding Website

A statically-generated wedding website built with Astro 4, React islands, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # → static output in dist/
npm run preview  # → preview built site
```

## Project Structure

```
src/
├── lib/wedding-config.ts    ← All editable content lives here
├── components/
│   ├── icons/               ← Botanical SVG illustrations (Astro)
│   ├── scrapbook/           ← WashiTape, Paperclip, Stamp (Astro)
│   ├── islands/             ← Interactive React components
│   └── sections/            ← Page sections (Astro)
├── layouts/Layout.astro
├── pages/index.astro
└── styles/global.css
public/
├── images/prenup/           ← Pre-nup photos (01.jpg – 12.jpg)
└── images/qr/               ← Payment QR code images
```

## How to Customize

### 1. Edit `src/lib/wedding-config.ts`

This single file controls nearly all content on the site. Search for `// TODO` markers and replace them with your actual information:

- **Couple names** — `couple.partner1`, `couple.partner2`
- **Date and times** — `date.*`
- **Venue details** — `venue.*` (name, address, rooms, Google Maps URL)
- **Dress code** — `dresscode.*` (description, palette, avoid list)
- **Event schedule** — `eventFlow[]` (times, titles, descriptions)
- **RSVP Google Form** — `rsvp.*` (see Google Forms section below)
- **Gift accounts** — `gifts[]` (account names, numbers, QR paths)
- **FAQs** — `faqs[]` (questions and answers)
- **Contact people** — `contacts[]` (names, roles, phone, email)
- **Love story** — `story[]` (dates, titles, descriptions, image paths)
- **Gallery** — `gallery.photos[]` (src paths, alt text)

### 2. Add Gallery Photos

Place your photos in `public/images/prenup/`:

- Name them `01.jpg`, `02.jpg`, ... matching the count generated in `config.gallery.photos` (currently 104 — adjust the `Array.from({ length: ... })` call in `wedding-config.ts` to match how many photos you have)
- Recommended size: **1200×900px minimum** (landscape)
- Format: JPEG or WebP

The hero carousel uses `public/images/hero/hero-01.jpg`–`hero-10.jpg` (`config.images` / `HeroAnimation.tsx`), and the love-story timeline uses the URLs in `config.story[].image` — replace the placeholder Unsplash URLs there with your own photos (local paths like `/images/prenup/01.jpg` work too).

### 3. Replace QR Code Images

Place your payment QR codes in `public/images/qr/`:

- `placeholder-gcash.png` → replace with your GCash QR
- `placeholder-maya.png` → replace with your Maya QR
- `placeholder-bpi.png` → replace with your BPI QR

Update the file names in `config.gifts[].qrImagePath` if you use different names.

### 4. Wire Up Google Forms (RSVP)

The RSVP form submits directly to a Google Form using the hidden POST technique. No backend needed.

#### Step-by-step:

1. **Create a Google Form** with these fields:
   - Full Name (Short answer)
   - Attending? (Multiple choice: "Yes, joyfully" / "Regretfully unable")
   - Number of guests (Short answer or dropdown 1–6)
   - Meal Preference (Multiple choice: Chicken / Fish / Vegetarian)
   - Song Request (Short answer)
   - Message (Paragraph)

2. **Get the pre-fill link:**
   - In Google Forms, click the three-dot menu → "Get pre-filled link"
   - Fill in dummy data for each field
   - Click "Get link" and copy it

3. **Extract entry IDs:**
   The pre-fill URL looks like:
   ```
   https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url
     &entry.123456=John
     &entry.789012=Yes
     &entry.345678=2
     ...
   ```
   Each `entry.XXXXXX` is the field ID.

4. **Update `wedding-config.ts`:**
   ```ts
   rsvp: {
     // Change /viewform to /formResponse
     googleFormUrl: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
     googleFormFields: {
       name: "entry.123456",
       attending: "entry.789012",
       guestCount: "entry.345678",
       mealPreference: "entry.901234",
       songRequest: "entry.567890",
       message: "entry.234567",
     },
   }
   ```

5. **Test:**
   - Submit the form on your dev site
   - Check Google Forms responses (linked Google Sheet) to verify data arrives

> **Note:** Google Forms returns an opaque (CORS-blocked) response. The site treats any response as a success. This is expected behavior — Google always receives the data.

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repository
3. Vercel auto-detects Astro — no configuration needed
4. Deploy

### Netlify

1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com), import the repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

Both platforms support automatic deploys on push to `main`.

## Tech Stack

- **Astro 4** — Static site generator
- **React 18** — Interactive islands only (RSVP form, gallery lightbox, animations)
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations (entrance, parallax, accordion, lightbox)
- **@fontsource** — Self-hosted fonts (Cormorant Garamond, Lora, Great Vibes, JetBrains Mono)

## Performance

- Static HTML output — no server runtime
- React islands hydrate only when visible (`client:visible`)
- Fonts are self-hosted via @fontsource (no CDN fetches)
- Images use native lazy loading
- Targets Lighthouse 95+ across all categories
