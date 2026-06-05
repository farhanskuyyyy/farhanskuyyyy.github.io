# Design Specification: Professional Minimalist & Editorial CV Portfolio Revamp

- **Date**: 2026-06-05
- **Author**: Antigravity
- **Project**: Farhan Arfianto Portfolio Revamp
- **Source CV Data**: [ats_cv_template.md](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/ats_cv_template.md)
- **Status**: Approved

---

## 1. Executive Summary
The goal of this project is to revamp the existing developer portfolio page (`index.html`) into a highly polished, professional, and typography-focused "Minimalist & Editorial" single-page website. The content will be fully synchronized with the provided ATS CV template (`ats_cv_template.md`). Additionally, a print-optimized stylesheet will enable users to print or save the webpage directly as a clean, black-and-white, ATS-compliant PDF resume.

---

## 2. Core Constraints & Tech Stack
1. **Framework**: Pure HTML5 and Tailwind CSS.
2. **Build Process**: Tailwind CLI compiled via existing npm scripts:
   - `npm run tailwind` / `npm run minify`
3. **No External PDF Libraries**: PDF generation relies entirely on standard browser printing (`window.print()`) styled via a custom `@media print` CSS block.
4. **Responsive Design**: Flawlessly adaptive across devices (from 375px mobile screens up to 1440px+ ultra-wide desktops).
5. **SEO & Performance**: Optimized semantic markup with fast loading speeds, zero layout shifts, and high visual contrast.

---

## 3. Design System & Style Guide

### Typography
* **Headings (`h1`, `h2`, `h3`, `h4`)**: `Lora` (Google Fonts, serif) for a publication/editorial aesthetic.
* **Body & UI Elements**: `Inter` (Google Fonts, sans-serif) for high screen readability.

### Colors
| Mode | Element | Color Hex | Tailwind Utility Class |
|---|---|---|---|
| **Light** | Page Background | `#FAF9F6` (Warm Alabaster) | `bg-[#FAF9F6]` |
| **Light** | Headings | `#0F172A` (Slate 900) | `text-slate-900` |
| **Light** | Body Text | `#334155` (Slate 700) | `text-slate-700` |
| **Light** | Accent Highlight | `#0D9488` (Teal 600) | `text-teal-600` / `bg-teal-600` |
| **Light** | Border Dividers | `#E2E8F0` (Slate 200) | `border-slate-200` |
| **Dark** | Page Background | `#0F172A` (Slate 900) | `dark:bg-slate-900` |
| **Dark** | Headings | `#F8FAFC` (Slate 50) | `dark:text-slate-50` |
| **Dark** | Body Text | `#CBD5E1` (Slate 300) | `dark:text-slate-300` |
| **Dark** | Accent Highlight | `#2DD4BF` (Teal 400) | `dark:text-teal-400` / `dark:bg-teal-400` |
| **Dark** | Border Dividers | `#334155` (Slate 700) | `dark:border-slate-700` |

### Layout & Borders
* **Max Width**: Restricted to `max-w-4xl` (approx. 896px) for comfortable line lengths and structured alignment.
* **Structural Division**: Thin borders (`border-b` or `border-l`) separate sections, replacing heavy cards, backgrounds, or shadows.
* **Grid Lines**: Horizontal line dividing navigation, header, experience, and projects.

---

## 4. UI Structure & CV Content Mapping

### Header & Contact Information
* Center-aligned name in bold `Lora` font.
* Horizontal list of contacts with bullet/pipe separators: Location, Phone, Email, LinkedIn, GitHub.
* A clean outlined print button: `[↓] Print / Save as PDF` linked to `window.print()`.

### Professional Summary
* Main introduction with a slightly larger font size (`text-lg`) and standard spacing, accented by a left teal border (`border-l-2 border-teal-600`).

### Interactive Core Competencies (Skills)
* Skills grouped by domain (Languages, Frameworks, DevOps/Observability, Databases, APIs & Practices) in a clean grid.
* Interactive filters allowing users to hover or click a category pill to highlight related skills.

### Experience Timeline
* Clean vertical timeline using a left-hand border (`border-l border-slate-200 dark:border-slate-700`).
* Bullet points populated exactly with achievement metrics from Lumoshive and Anggada Duta Wisesa.

### Key Projects
* Standardized minimalist cards featuring title, description, and list of technologies mapped as clean outline tags (e.g. `Golang`, `Next.js`).

---

## 5. Print Optimization Stylesheet (`@media print`)
```css
@media print {
  /* Reset colors to clean print standards */
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 11pt !important;
    line-height: 1.4 !important;
  }
  
  /* Hide interactive web UI components */
  header,
  footer,
  #contact,
  #toTop,
  button,
  .no-print {
    display: none !important;
  }
  
  /* Remove layout container limits for printing */
  .container,
  .max-w-4xl {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  /* Prevent job experiences breaking awkwardly across pages */
  .experience-block {
    page-break-inside: avoid !important;
  }
  
  /* Render links as readable text in print */
  a[href^="http"]:after {
    content: " (" attr(href) ")" !important;
    font-size: 9pt !important;
    color: #333333 !important;
  }
}
```

---

## 6. JavaScript Functions
1. **Dark Mode Toggle**: Replace toggle-slider with an SVG-based Sun/Moon button:
   ```javascript
   const darkToggle = document.querySelector('#dark-toggle-btn');
   darkToggle.addEventListener('click', () => {
       document.documentElement.classList.toggle('dark');
       localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
       updateToggleIcon();
   });
   ```
2. **Form Submission Feedback**:
   Show a clean success message inline below the submit button and clear inputs on success.
3. **Print CV Button Handler**:
   ```javascript
   document.querySelector('#print-cv-btn').addEventListener('click', () => {
       window.print();
   });
   ```

---

## 7. Verification & Success Criteria
- [ ] Tailwind builds without errors when compiling `src/input.css` to `dist/final.css`.
- [ ] Google Fonts (Lora and Inter) load correctly.
- [ ] No emojis are used for UI controls or categories (clean SVG icons only).
- [ ] Text contrast ratio remains > 4.5:1 in both light and dark modes.
- [ ] Print layout outputs a clean, well-spaced, black-and-white 1-to-2 page resume.
