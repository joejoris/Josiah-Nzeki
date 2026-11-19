# Josiah Nzeki Mutisya — IT Portfolio

A professional multi-page portfolio website for **Josiah Nzeki Mutisya**, Diploma in Information Technology graduate from **KCA University**.

Built with plain **HTML, CSS, and JavaScript**. No build step or dependencies required.

## Files

- `index.html` — Home (links to the all-in-one page)
- `portfolio.html` — Portfolio Hub: a simple index page linking to each separate portfolio page (no duplicated content)
- `about.html` — About, education, skills, reference and interests
- `projects.html` — Internship and personal projects with filters
- `project-sage-inventory.html` — Case study: inventory control with Sage
- `project-network-installation.html` — Case study: network installation and configuration
- `project-it-support.html` — Case study: technical support and systems operation
- `experience.html` — Experience timeline
- `certifications.html` — Qualifications and training
- `contact.html` — Contact details, WhatsApp, vCard and enquiry form
- `cv.html` — CV viewer page with the official PDF embedded
- `404.html` — Custom not-found page
- `css/style.css` — Shared design system, dark theme and accessibility styles
- `js/main.js` — Navigation, filters, contact form, analytics hooks, theme controls, animations, scroll UI
- `sw.js` — Service worker for offline access
- `manifest.webmanifest` — PWA app manifest
- `assets/Josiah_Nzeki_Mutisya_CV.pdf` — Official CV supplied by Josiah
- `assets/Josiah_Nzeki_Mutisya_Portfolio.pdf` — Downloadable one-page portfolio summary
- `assets/Josiah_Nzeki_Mutisya.vcf` — Downloadable contact card (vCard)
- `assets/profile.jpg` — Optimized profile photo supplied by Josiah
- `assets/og-image.jpg` — Social sharing preview image
- `assets/icon-192.png`, `assets/icon-512.png`, `assets/apple-touch-icon.png` — App icons
- `assets/case-*.svg` — Illustrative diagrams for the case studies
- `assets/` — Favicon and decorative network background
- `robots.txt`, `sitemap.xml` — Search engine discovery files

## Content sourced from the CV

The site uses details from `CV JOSIAH NZEKI MUTISYA.pdf`:

- Full name: Josiah Nzeki Mutisya
- Email: josiahnzeki456@gmail.com
- Phone: 0740471975
- Nationality: Kenyan
- Diploma in Information Technology, KCA University, 2021–2026
- KCSE, The Komarock School, 2016–2019, mean grade C-
- KCPE, Sibiah Star School, 2009–2015, 360 marks
- IT Intern, Tri Clover Industries Ltd, Nairobi, June–August 2025
- Sage Inventory, network installation, technical support, IT operations
- Driving License – Class B
- Hobbies: hiking, reading, gaming
- Reference: Dr. Simon N. Mwendia, Dean, School of Technology, KCA University

## Features

- Responsive, animated corporate design with reduced-motion support
- Three internship case studies with illustrative workflow diagrams
- Direct contact form via Formsubmit.co, with an email fallback
- WhatsApp quick-contact button using `254740471975`
- Downloadable CV PDF, one-page portfolio summary and vCard; Print / Save PDF button on the CV page
- Responsive layout for phones, tablets and desktop, with touch-friendly controls and a mobile menu that includes CV and Portfolio Hub links
- Optional Plausible/GA4 analytics with custom event tracking
- Dark mode, text-size and high-contrast controls saved on the device
- Installable PWA with offline access to pages and documents
- SEO metadata, Open Graph tags, structured data, `robots.txt`, `sitemap.xml` and custom 404 page

## Live site

- **Repository:** https://github.com/joejoris/Josiah-Nzeki
- **GitHub Pages URL:** https://joejoris.github.io/Josiah-Nzeki/
- Canonical, Open Graph, sitemap, robots.txt, vCard and one-page PDF URLs already point to this address.

Enable **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / root** in the repository if Pages is not active yet.

## Before publishing

1. **Activate the contact form.** The form posts to Formsubmit.co, which forwards messages to `josiahnzeki456@gmail.com`. On the first real submission, Formsubmit sends a confirmation email — click it once to activate the address.
2. **Enable analytics (optional).** Open `js/main.js` and fill in `plausibleDomain` (e.g. `joejoris.github.io/Josiah-Nzeki`) and/or `gaMeasurementId` (e.g. `G-XXXXXXXXXX`). Both are empty by default, so nothing loads until configured.
3. **Replace the CV PDF.** Send the updated PDF and replace `assets/Josiah_Nzeki_Mutisya_CV.pdf` so the embedded document matches the new email.
4. **Bump the offline cache** by changing `CACHE_NAME` in `sw.js` whenever site files change.
5. **Optional custom domain.** If you connect a custom domain, replace `https://joejoris.github.io/Josiah-Nzeki` across the HTML files, `sitemap.xml`, `robots.txt` and the one-page PDF, then bump `CACHE_NAME`.

Upload all files, including `404.html`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and `sw.js`. Service workers require HTTPS (or localhost).

## Notes

- Dark mode follows the device preference until the visitor chooses a theme in the `Aa` control.
- The contact form sends directly from the browser and falls back to an email draft if the form service is unavailable.
- If you change the email address, update `SITE_CONFIG.contactEmail` and `SITE_CONFIG.contactEndpoint` in `js/main.js`, plus the PDF/vCard and the inline JSON-LD in `index.html`.
- The site is responsive, keyboard accessible, respects reduced-motion preferences, and offers adjustable text size and contrast.
