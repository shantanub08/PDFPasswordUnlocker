---
name: PDF Password Unlocker
description: Secure, in-browser PDF decryption utility
colors:
  primary: "#6366f1"
  primary-hover: "#4f46e5"
  neutral-bg: "#0f172a"
  neutral-surface: "#1e293b"
  text-primary: "#f8fafc"
  text-secondary: "#94a3b8"
  error: "#ef4444"
  success: "#10b981"
typography:
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "Fira Code, monospace"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: PDF Password Unlocker

## 1. Overview

**Creative North Star: "The Tactical Glass Vault"**

PDF Password Unlocker is designed as a dark, high-clarity slate workspace with translucent glass panels, crisp typography, and glowing indigo focus states. The interface emphasizes local, client-side privacy by establishing a sense of secure physical enclosure—resembling an encrypted vault console where sensitive documents are handled with utmost confidence.

The design explicitly rejects generic white SaaS dashboards, saturated warm cream tones, heavy skeuomorphism, and intrusive modal popups. Every element is tuned for immediate, single-screen clarity.

**Key Characteristics:**
- Dark slate background with subtle radial gradient depth (`#0f172a` to `#1e1b4b`).
- Glassmorphic container cards with backdrop blur (`12px`) and subtle translucent borders (`rgba(255, 255, 255, 0.1)`).
- High-contrast typography with indigo-tinted gradient display headers.
- Single-surface flow that morphs dynamically based on file upload state.

## 2. Colors

The color palette follows a **Restrained** color strategy anchored by a deep slate canvas and a single vibrant indigo accent.

### Primary
- **Electric Indigo** (`#6366f1` / `oklch(0.62 0.22 270)`): Primary interactive focus, active dragzone borders, and main action button background.
- **Deep Indigo Hover** (`#4f46e5` / `oklch(0.55 0.24 270)`): Hover state for primary buttons.

### Neutral
- **Deep Slate Canvas** (`#0f172a` / `oklch(0.18 0.04 260)`): Primary background surface.
- **Midnight Indigo Gradient Base** (`#1e1b4b` / `oklch(0.20 0.08 275)`): Background gradient glow anchor.
- **Glass Panel Fill** (`rgba(30, 41, 59, 0.7)` / `oklch(0.24 0.03 260)`): Card container surface with 70% opacity.
- **Pure Slate Ink** (`#f8fafc` / `oklch(0.98 0.005 250)`): Primary readable text.
- **Muted Slate Ink** (`#94a3b8` / `oklch(0.70 0.02 250)`): Subtitles, helper text, and inactive input labels.

### Feedback
- **Crimson Alert** (`#ef4444` / `oklch(0.63 0.22 25)`): Incorrect password and file format error alerts.
- **Emerald Success** (`#10b981` / `oklch(0.70 0.17 160)`): Successful decryption indicator.

### Named Rules
**The Single Accent Rule.** Electric Indigo (`#6366f1`) is reserved strictly for primary actions, active focus states, and key state transitions. It never covers more than 15% of the visible surface.

## 3. Typography

**Headline Font:** Outfit (700 bold)
**Body & UI Font:** Plus Jakarta Sans (400 regular / 500 medium / 600 semibold)
**Password & Mono Font:** Fira Code (500 medium)

**Character:** Modern Developer SaaS aesthetic—pairing crisp, high-impact display geometry with ergonomic UI typography and technical monospace inputs.

### Hierarchy
- **Headline** (700 bold, `2.5rem`, `1.2` line-height): Header title with an indigo linear gradient fill (`linear-gradient(135deg, #a5b4fc, #818cf8)`).
- **Body** (400 regular, `1rem`, `1.5` line-height): Primary text and descriptive guidance.
- **Label** (500 medium, `0.875rem`, `1.4` line-height): Input field labels and dropzone subtext.

### Named Rules
**The Fixed-Scale Rule.** Typography uses fixed `rem` sizing rather than fluid `clamp()` functions to preserve compact tool density across desktop and mobile screens.

## 4. Elevation

Depth is created through ambient glassmorphism and subtle tonal contrast rather than heavy drop shadows.

### Shadow Vocabulary
- **Vault Card Ambient Glow** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)`): Soft ambient shadow elevating the central workspace card from the background gradient.
- **Button Action Lift** (`box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3)`): Interactive glow underneath the primary unlock button during hover state.

### Named Rules
**The Tonal Glass Rule.** Card surfaces rely on 12px backdrop blur and 1px translucent borders (`rgba(255, 255, 255, 0.1)`) to establish hierarchy, staying flat at rest and lifting slightly on hover.

## 5. Components

### Primary Button
- **Shape:** Gently rounded corners (`8px` radius).
- **Primary:** Electric Indigo (`#6366f1`) background, white text (`#ffffff`), full width with `1rem` vertical padding.
- **Hover / Focus:** Lifts by `-2px`, background shifts to `#4f46e5`, accompanied by indigo shadow glow. Focus ring displays a `2px` indigo outline with `0.2` opacity offset.
- **Disabled:** 70% opacity, cursor set to `not-allowed`.

### Dropzone Container
- **Shape:** `16px` border-radius with `2px` dashed border (`rgba(255, 255, 255, 0.1)`).
- **Style:** Dark slate fill (`rgba(15, 23, 42, 0.3)`) with centered icon and subtext.
- **Drag-Active State:** Border color shifts to Electric Indigo (`#6366f1`), background transitions to a subtle indigo tint (`rgba(99, 102, 241, 0.05)`), icon shifts `-5px` vertically.

### Password Input Field
- **Style:** `8px` border-radius, dark translucent slate fill (`rgba(15, 23, 42, 0.8)`), `1px` subtle white border.
- **Focus:** Outline removed, border color transitions to Electric Indigo (`#6366f1`) with a `2px` indigo focus ring (`rgba(99, 102, 241, 0.2)`).

### Selected File Info Strip
- **Style:** `12px` border-radius, solid dark slate container (`rgba(15, 23, 42, 0.5)`), featuring file icon, truncated file name, and a red hover-state remove icon button.

### Feedback Banners
- **Error Banner:** Crimson background tint (`rgba(239, 68, 68, 0.1)`), crimson border, red icon.
- **Success Banner:** Emerald background tint (`rgba(16, 185, 129, 0.1)`), emerald border, green icon.

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 4.5:1 minimum text contrast ratio against dark backgrounds.
- **Do** use native inline feedback alerts for decryption errors instead of intrusive popups or modals.
- **Do** keep the file unlock flow restricted to a single screen without multi-step wizard pagination.
- **Do** provide smooth transitions (`0.2s–0.3s ease`) for interactive element state changes.

### Don't:
- **Don't** use generic white SaaS backgrounds with light blue accent buttons.
- **Don't** introduce multi-colored card borders or `border-left` side-stripe accents greater than 1px.
- **Don't** apply display fonts or fluid `clamp()` text scaling to UI input labels.
- **Don't** open popups or modal overlays for simple file operations or password prompts.
