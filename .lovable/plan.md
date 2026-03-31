

## Login Page Redesign - Split Layout with Dashboard Image

### Overview
Redesign `/login` to a split two-panel layout. Left panel shows the uploaded dashboard charts image with Zeero Group branding. Right panel has the login form. Add a "Create account" view. Rename all "Greener" references to "Zeero Group".

### Layout

```text
┌─────────────────────────┬─────────────────────────┐
│  LEFT (hidden mobile)   │  RIGHT                  │
│  Primary green bg       │  White bg               │
│                         │                         │
│  Zeero Group logo       │  "Welcome back" / ...   │
│  Tagline text           │                         │
│                         │  Email input            │
│  [Dashboard image]      │  Password input         │
│                         │  Forgot password link   │
│  "Trusted by X orgs"   │  Sign in button         │
│                         │  "Create account" link  │
└─────────────────────────┴─────────────────────────┘
```

### Changes to `src/pages/Login.tsx`

1. **Copy uploaded image** to `src/assets/login-dashboard.png` and import it
2. **Split layout**: `min-h-screen flex` with two halves
   - Left: `hidden lg:flex` with primary green gradient, Zeero Group branding, the dashboard image, and marketing copy
   - Right: centered form area (current form logic)
3. **Rename** "Greener" to "Zeero Group" throughout
4. **Add "signup" view** to the existing view state (`"login" | "forgot" | "signup"`)
   - Signup form: Name, Email, Password, Confirm Password fields
   - "Already have an account? Sign in" link
   - Mock submit with toast
5. **Wire "Create account"** link from login view and "Sign up" button from the reference

### Files Modified
- `src/pages/Login.tsx` - full rewrite
- `src/assets/login-dashboard.png` - copied from upload

