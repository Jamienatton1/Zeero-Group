

## Plan: Add "Start Free Trial — No Credit Card Required" Messaging

### What changes

1. **Hero Section** — Add a subtle text line beneath the CTA buttons: "No credit card required. Start for free today." This is the highest-visibility placement.

2. **Pricing Section** — Add a banner/callout above the pricing cards reinforcing "Start your free trial — no credit card required" with a CTA button.

3. **Pre-Footer CTA Section** — Add a dedicated full-width call-to-action band before the footer with bold messaging: "Get Started for Free — No Credit Card Required" and a prominent "Start Free Trial" button linking to `/onboarding`.

### Technical details

All changes are in `src/pages/LandingPage.tsx`:

- **Line ~82** (after CTA buttons): Insert a `<p>` with "No credit card required" text styled with `text-sm text-muted-foreground` and a checkmark icon.
- **Pricing section**: Add a centered callout div above the pricing grid with the free trial message and a green CTA button.
- **Line ~448** (before footer): Insert a new `<section>` with a green gradient background, headline "Get Started for Free", subtitle "No credit card required", and a "Start Free Trial" button.

