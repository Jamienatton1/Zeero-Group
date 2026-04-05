

## Plan: Add Contact Section to Landing Page

### What changes

1. **Add "Contact Us" link in the navigation bar** — Insert a nav link pointing to `#contact` alongside the existing Features, Pricing, etc.

2. **Add a Contact section before the Pre-Footer CTA** — A simple section with:
   - Heading: "Get in Touch"
   - Subtitle: "Have questions? We'd love to hear from you."
   - A contact form with Name, Email, and Message fields plus a "Send Message" button
   - Alternatively, display a contact email address (e.g. info@zeeroevents.com) alongside the form

3. **Add "Contact" to the footer** — Add a contact email link or anchor to `#contact` in the footer's columns.

### Technical details

All changes in `src/pages/LandingPage.tsx`:

- **Nav bar (~line 31)**: Add `<a href="#contact">Contact</a>` link.
- **New section (~line 423, before Pre-Footer CTA)**: Add a `<section id="contact">` with a centered card containing a simple form (Name, Email, Message fields using existing `Input` and `Textarea` components, plus a submit `Button`). Since there's no backend, the form will use a `mailto:` link or show a toast confirmation on submit.
- **Footer (~line 461)**: Add a "Contact" column with an email link and the `#contact` anchor.
- **Import**: Add `Textarea` from `@/components/ui/textarea` and `useToast` for submit feedback.

