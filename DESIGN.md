# Addis Cable visual overhaul

The identity uses warm ivory, deep green ink, and copper. The mark combines an A with three conductor paths; typography pairs Space Grotesk, DM Sans, IBM Plex Mono, and an editorial italic serif.

## Development and validation

- `pnpm dev`: full Next.js site, retaining PostgreSQL-backed cable verification.
- `pnpm build`: full production build, with TypeScript errors enforced.
- `pnpm build:site`: static marketing deployment, built in an isolated ignored source copy. The review includes the complete QR camera scanner, printed-code entry, and pasted-link entry at /authorized. Its result links use the existing secure PostgreSQL service at www.addiscable.com, retaining authoritative scan counts. The full Next.js application keeps its integrated result route.
- `node scripts/preview-static.mjs`: compressed production preview at localhost:3001.
- `pnpm verify:site`: desktop/mobile playback, film control, three parallax depths, internal routes, enquiry draft, overflow, runtime errors, reduced-motion checks, QR decoding from a synthetic camera frame, manual routing, permission denial, and camera cleanup with WCAG A/AA scans.
- `node scripts/test-verification.mjs`: isolated parsing and database status fixtures; no real product scans.
- `pnpm brand:render`: regenerate the vector brand assets and social card.

The enquiry form opens a prefilled email draft; it does not claim to send a message. An operational enquiry API can replace that flow when a mail service is configured.

The Site identity and static export configuration are in .openai/hosting.json. Deploy using the native Sites workflow, retaining its project_id.

## Media provenance and remaining requirement

The bespoke copper still is generated with the built-in imagegen tool and saved at `public/brand/copper-hero-source.png`; optimized assets are `public/brand/copper-hero.webp` and `public/brand/hero-poster.webp`. The current `public/media/copper-loop.mp4` is an 8-second, 1920×1080 silent H.264 loop with cyclic camera motion rendered from that still. Its endpoint motion is continuous, and its poster is extracted from the actual film.

**This is an image-based animation, not the requested highest-quality Higgsfield video generation.** Higgsfield rejected GPT Image 2.5 and FLUX.2 Pro with “Requires basic plan or higher.” The workspace is on Free with 9.88 credits. Veo 3.1 Ultra, best-quality variant, estimated 120 credits for 8 seconds. The model brief is preserved in .openai/video-brief.json so the final film can be generated and substituted once the account supports it. No generation credits were spent on rejected requests.

Factory photography is a frame extracted from the supplied facility.mp4. The product visuals are bespoke SVG conductor illustrations rather than claims of exact engineering specifications. Logo, favicon, touch icon, and 1200×630 OG image are deterministic brand artwork.

## Hero still prompt (built-in imagegen)

Generate one bespoke cinematic widescreen 16:9 studio photograph for the hero of Addis Cable, premium Ethiopian electrical cable manufacturer. A massive sculptural black electrical cable with a thick charcoal textured rubber sleeve enters from lower right and curves into upper right, its cut end exposing many fine tightly packed parallel copper conductor strands under dramatic raking studio light. The object occupies the right 60 percent only; the left 45 percent is empty near-black #101512 negative space for website typography. Realistically constructed cable, tactile deep black rubber, restrained warm copper highlights and subtle cool rim light, macro editorial product cinematography, shallow depth of field and crisp exposed copper. No text, labels, logos, people, sparks, particles, or illustration.

## Motion and performance

Three hero depths (0.19, 0.10, 0.045) use translate3d, a single passive listener, and a frame loop that stops at rest. Mobile motion is scaled to 55%. Reduced-motion and data-saving preferences prevent automatic playback; reduced motion also disables parallax. Offscreen and hidden-tab video is paused.

Production preview checks passed on desktop and mobile. Lighthouse under simulated mobile throttling with HTTP compression: performance 94, accessibility 100, best practices 100, SEO 100; FCP 0.8 seconds, LCP 3.1 seconds, total blocking time 10ms, CLS 0. These are local production measurements, not a guarantee of every visitor’s connection.

Verification is linked from desktop/mobile navigation, the footer, and the site map. Camera access begins only on explicit Start camera; stopping, hiding the page, or navigating releases the stream. Database unavailability is distinguished from an unrecognized label. Result pages are excluded from indexing.

Private review: https://addis-cable.johannesbekele537.chatgpt.site. A cold live Lighthouse run measured performance 85, accessibility 100, best practices 81, SEO 100, and CLS 0. The best-practices warning and largest long task originate in the hosting provider’s injected Cloudflare challenge script; its deprecated storage API is outside the application source. Initial private-host response time was approximately 845ms.
