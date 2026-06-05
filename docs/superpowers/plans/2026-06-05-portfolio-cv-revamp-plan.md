# Portfolio CV Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp the single-page HTML portfolio (`index.html`) using Tailwind CSS to showcase Farhan's CV in a high-end "Professional Minimalist & Editorial" layout with a print-optimized stylesheet.

**Architecture:** Integrate the typography (Lora + Inter), theme colors, and layout structure directly into `tailwind.config.js`, `src/input.css`, and `index.html`. Interactive components (skills filtering, theme toggle, contact form submission, and print trigger) are powered by lightweight vanilla JavaScript.

**Tech Stack:** HTML5, Tailwind CSS, JavaScript (ES6+).

---

## File Structure Map
* **Modify**: [tailwind.config.js](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/tailwind.config.js) — Color configuration & Google Fonts definition.
* **Modify**: [src/input.css](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/src/input.css) — Font imports, custom components, and `@media print` rules.
* **Modify**: [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html) — Main content integration & JavaScript features.

---

### Task 1: Setup Tailwind Fonts and Colors Configuration

**Files:**
* Modify: [tailwind.config.js](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/tailwind.config.js)
* Modify: [src/input.css](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/src/input.css)

- [ ] **Step 1: Update `tailwind.config.js` with Lora/Inter fonts and minimalist colors**
  Configure Lora and Inter as font families, and define slate and teal color variants.
  
  Replace content of `tailwind.config.js` with:
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["index.html"],
    darkMode: 'class',
    theme: {
      container: {
        center: true,
        padding: '24px',
      },
      extend: {
        fontFamily: {
          serif: ['Lora', 'serif'],
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          primary: '#0d9488', // teal-600
          accent: '#2dd4bf', // teal-400
          darkbg: '#0f172a', // slate-900
          lightbg: '#faf9f6', // warm alabaster
        },
      },
    },
    plugins: [],
  }
  ```

- [ ] **Step 2: Update `src/input.css` to import Google Fonts and clean default typography**
  Add imports for Inter (weights 400, 500, 600) and Lora (weights 400, 600, 700), and configure body styles.
  
  Replace content of `src/input.css` with:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  body {
      @apply font-sans bg-lightbg text-slate-700 dark:bg-darkbg dark:text-slate-300 transition-colors duration-200;
  }
  
  .navbar-fixed {
      @apply fixed z-[9999] bg-[#faf9f6]/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50;
  }
  
  .hamburger-active > span:nth-child(1){
      @apply rotate-45;
  }
  
  .hamburger-active > span:nth-child(2){
      @apply scale-0;
  }
  
  .hamburger-active > span:nth-child(3){
      @apply -rotate-45;
  }
  ```

- [ ] **Step 3: Run Tailwind compiler to verify config changes compile successfully**
  Run: `npx tailwindcss -i ./src/input.css -o ./dist/output.css`
  Expected: Successful compilation without warnings or errors.

- [ ] **Step 4: Commit config changes**
  Run:
  ```bash
  git add tailwind.config.js src/input.css
  git commit -m "style: configure editorial color palette and google fonts in tailwind config"
  ```

---

### Task 2: Implement UI Shell & Header Section

**Files:**
* Modify: [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html)

- [ ] **Step 1: Replace HTML Header and hero layout with the new Minimalist Header**
  Open [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html) and replace lines 1 to 84 with the simplified structure. The new header includes the clean, centered title, layout grid, dark mode toggle button, and "Print PDF" action.
  
  Modify the start of `index.html` (lines 1-84):
  ```html
  <!DOCTYPE html>
  <html lang="en" class="scroll-smooth">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Farhan Arfianto - Backend Engineer Portfolio</title>
      <link href="dist/final.css" rel="stylesheet">
      <script>
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
          } else {
              document.documentElement.classList.remove('dark');
          }
      </script>
  </head>
  <body class="selection:bg-teal-500/30">
      <!-- Header Start -->
      <header class="absolute top-0 left-0 w-full flex items-center z-10 py-6 border-b border-slate-200/50 dark:border-slate-800/50 no-print">
          <div class="container max-w-4xl mx-auto flex items-center justify-between">
              <div>
                  <a href="#home" class="font-serif font-bold text-xl text-slate-900 dark:text-slate-50">Farhan.A</a>
              </div>
              <div class="flex items-center gap-6">
                  <nav id="nav-menu" class="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <a href="#about" class="hover:text-primary transition-colors">About</a>
                      <a href="#skills" class="hover:text-primary transition-colors">Skills</a>
                      <a href="#experience" class="hover:text-primary transition-colors">Experience</a>
                      <a href="#projects" class="hover:text-primary transition-colors">Projects</a>
                      <a href="#contact" class="hover:text-primary transition-colors">Contact</a>
                  </nav>
                  
                  <!-- Theme Toggle Button -->
                  <button id="dark-toggle-btn" class="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" aria-label="Toggle Dark Mode">
                      <svg id="sun-icon" class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
                      <svg id="moon-icon" class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                  </button>
                  
                  <!-- Mobile Hamburger Menu Button -->
                  <button class="block md:hidden text-slate-600 dark:text-slate-400 hover:text-primary focus:outline-none" id="hamburger" aria-label="Toggle Navigation Menu">
                      <span class="w-[24px] h-[2px] my-1 block bg-current transition duration-300 origin-top-left"></span>
                      <span class="w-[24px] h-[2px] my-1 block bg-current transition duration-300"></span>
                      <span class="w-[24px] h-[2px] my-1 block bg-current transition duration-300 origin-bottom-left"></span>
                  </button>
              </div>
          </div>
      </header>
      
      <!-- Mobile Navigation Menu -->
      <nav id="mobile-nav" class="hidden fixed top-[73px] left-0 w-full bg-lightbg dark:bg-darkbg border-b border-slate-200 dark:border-slate-800 z-50 flex-col py-6 px-8 gap-4 text-md font-medium no-print">
          <a href="#about" class="hover:text-primary transition-colors py-2">About</a>
          <a href="#skills" class="hover:text-primary transition-colors py-2">Skills</a>
          <a href="#experience" class="hover:text-primary transition-colors py-2">Experience</a>
          <a href="#projects" class="hover:text-primary transition-colors py-2">Projects</a>
          <a href="#contact" class="hover:text-primary transition-colors py-2">Contact</a>
      </nav>
      <!-- Header End -->
  
      <!-- Hero / Top Section Start -->
      <section id="home" class="pt-32 pb-16">
          <div class="container max-w-4xl mx-auto px-6 text-center md:text-left">
              <h1 class="font-serif font-bold text-4xl md:text-5xl text-slate-900 dark:text-slate-50 mb-3 tracking-tight">FARHAN ARFIANTO</h1>
              <p class="font-serif text-lg md:text-xl text-teal-600 dark:text-teal-400 font-medium mb-6">Backend Engineer</p>
              
              <!-- Quick Contact Row -->
              <div class="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-8 border-y border-slate-200/50 dark:border-slate-800/50 py-3 font-medium">
                  <span>East Jakarta, Indonesia</span>
                  <span class="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                  <a href="tel:+6289629657237" class="hover:text-primary transition-colors">+62 896-2965-7237</a>
                  <span class="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                  <a href="mailto:arfianto472@gmail.com" class="hover:text-primary transition-colors">arfianto472@gmail.com</a>
                  <span class="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                  <a href="https://linkedin.com/in/farhanarfianto" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">LinkedIn</a>
                  <span class="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                  <a href="https://github.com/farhanskuyyyy" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">GitHub</a>
              </div>
  
              <!-- PDF Trigger Button -->
              <button id="print-cv-btn" class="no-print inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:border-primary dark:hover:border-accent hover:text-primary dark:hover:text-accent transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  Print / Download PDF Resume
              </button>
          </div>
      </section>
      <!-- Hero / Top Section End -->
  ```

- [ ] **Step 2: Run minified tailwind build to check structural layout**
  Run command: `npx tailwindcss -i ./src/input.css -o ./dist/final.css --minify`
  Verify that file is generated without issue.

- [ ] **Step 3: Commit UI shell and header changes**
  Run:
  ```bash
  git add index.html
  git commit -m "feat: implement clean, minimalist header and print-trigger UI shell"
  ```

---

### Task 3: Integrate Professional Summary & Interactive Competencies

**Files:**
* Modify: [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html)

- [ ] **Step 1: Replace About and Skills sections with revamped editorial layout**
  Replace lines 85 to 196 in `index.html` (the original About and Skills sections) with a layout mapping Farhan's exact summary and core competencies.
  
  Replace in `index.html`:
  ```html
      <!-- About / Summary Section Start -->
      <section id="about" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-6 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Professional Summary</h2>
              <div class="pl-5 border-l-2 border-teal-600 dark:border-teal-400">
                  <p class="font-serif text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                      Results-driven and highly collaborative Backend Engineer with over 5 years of professional experience designing, building, and maintaining scalable web applications, high-performance API ecosystems, and system observability suites. Specialized in Golang and PHP (Laravel, CodeIgniter), with strong expertise in containerization (Docker), API monitoring (Grafana), and seamless frontend integration using Next.js. Committed to clean code architecture, DevOps practices, and mentoring cross-functional teams to deliver secure and stable products.
                  </p>
              </div>
          </div>
      </section>
      <!-- About / Summary Section End -->
  
      <!-- Skills Section Start -->
      <section id="skills" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-8 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Core Competencies</h2>
              
              <!-- Interactive Category Toggles -->
              <div class="no-print flex flex-wrap gap-2 mb-8">
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-teal-600 bg-teal-600 text-white dark:border-teal-400 dark:bg-teal-400 dark:text-slate-900 transition-colors" data-category="all">All Skills</button>
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors" data-category="languages">Languages</button>
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors" data-category="frameworks">Frameworks & Libs</button>
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors" data-category="devops">DevOps & Infrastructure</button>
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors" data-category="databases">Databases & Cache</button>
                  <button class="skill-category-btn px-4 py-1.5 rounded-full text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors" data-category="apis">APIs & Practices</button>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <!-- Languages -->
                  <div class="skill-group-card border-b border-slate-100 dark:border-slate-800/50 pb-4" data-group="languages">
                      <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3 font-sans">Programming Languages</h3>
                      <div class="flex flex-wrap gap-2">
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Golang (Go)</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">PHP</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">JavaScript (ES6+)</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">SQL</span>
                      </div>
                  </div>
  
                  <!-- Frameworks -->
                  <div class="skill-group-card border-b border-slate-100 dark:border-slate-800/50 pb-4" data-group="frameworks">
                      <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3 font-sans">Frameworks & Libraries</h3>
                      <div class="flex flex-wrap gap-2">
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Laravel</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">CodeIgniter</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Next.js</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">React</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Node.js</span>
                      </div>
                  </div>
  
                  <!-- DevOps -->
                  <div class="skill-group-card border-b border-slate-100 dark:border-slate-800/50 pb-4" data-group="devops">
                      <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3 font-sans">DevOps, Infrastructure & Observability</h3>
                      <div class="flex flex-wrap gap-2">
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Docker</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Grafana</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Prometheus / Loki</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Git</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">CI/CD</span>
                      </div>
                  </div>
  
                  <!-- Databases -->
                  <div class="skill-group-card border-b border-slate-100 dark:border-slate-800/50 pb-4" data-group="databases">
                      <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3 font-sans">Databases, Caching & ETL</h3>
                      <div class="flex flex-wrap gap-2">
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">MySQL</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">PostgreSQL</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Redis</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Pentaho Data Integration</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">SQL Optimization</span>
                      </div>
                  </div>
  
                  <!-- APIs & Practices -->
                  <div class="skill-group-card border-b border-slate-100 dark:border-slate-800/50 pb-4" data-group="apis">
                      <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-3 font-sans">APIs & Development Practices</h3>
                      <div class="flex flex-wrap gap-2">
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">RESTful APIs</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">JWT</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Payment Gateways</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Clean Architecture</span>
                          <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded">Microservices</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <!-- Skills Section End -->
  ```

- [ ] **Step 2: Compile CSS and inspect changes locally**
  Run command: `npx tailwindcss -i ./src/input.css -o ./dist/final.css --minify`
  Ensure no compilation errors and structural styling passes successfully.

- [ ] **Step 3: Commit Summary & Core Competencies**
  Run:
  ```bash
  git add index.html
  git commit -m "feat: revamp professional summary and add interactive core competencies section"
  ```

---

### Task 4: Integrate Experience Timeline & Key Projects

**Files:**
* Modify: [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html)

- [ ] **Step 1: Replace Portfolio and Blog placeholders with the real Experience & Projects sections**
  Replace lines 197 to 247 in `index.html` (the old Portfolio/Skills/Blog placeholders) with the professional timeline mapping Lumoshive and Anggada Duta Wisesa, followed by the featured projects grid.
  
  Replace in `index.html`:
  ```html
      <!-- Experience Section Start -->
      <section id="experience" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-10 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Professional Experience</h2>
              
              <div class="relative border-l border-slate-200 dark:border-slate-800 pl-6 ml-3 space-y-12">
                  <!-- Experience 1 -->
                  <div class="experience-block relative">
                      <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-400 border-4 border-lightbg dark:border-darkbg"></div>
                      <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-4">
                          <div>
                              <h3 class="font-serif font-bold text-xl text-slate-900 dark:text-slate-50">Software Developer (Full-time)</h3>
                              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Lumoshive | Jakarta, Indonesia</p>
                          </div>
                          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 self-start md:self-auto">April 2021 – Present</span>
                      </div>
                      <ul class="list-disc list-outside pl-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>Engineered new features, resolved bugs, and implemented system improvements to enhance overall application stability and user experience across multiple production platforms.</li>
                          <li>Maintained and optimized multiple web projects, ensuring seamless performance, high reliability, and minimal downtime.</li>
                          <li>Collaborated with and mentored team members, actively resolving technical blockers and conducting code reviews to maintain code quality.</li>
                          <li>Architected a high-performance backend in <strong class="text-slate-900 dark:text-slate-100 font-semibold">Golang</strong> to ingest and process real-time external sports APIs (clubs, leagues, and player profiles), power gameweek-based dream team selection mechanics, and run match score prediction systems.</li>
                          <li>Designed and developed secure, scalable RESTful APIs dedicated to supporting mobile application development and smooth frontend integration.</li>
                          <li>Created and managed customizable Content Management Systems (CMS) for streamlined portal administration and content publishing.</li>
                          <li>Integrated diverse e-wallet and telecommunication (pulsa) payment gateways via API, ensuring safe and reliable transactions.</li>
                          <li>Developed and launched a dedicated consumer <strong class="text-slate-900 dark:text-slate-100 font-semibold">game top-up portal</strong>, integrating multi-channel e-wallet and mobile billing payment gateways with automated delivery.</li>
                          <li>Engineered <strong class="text-slate-900 dark:text-slate-100 font-semibold">Airgift</strong>, a robust transactional middleware connecting multiple top-up suppliers to various portal merchants; utilized <strong class="text-slate-900 dark:text-slate-100 font-semibold">Laravel, Redis, PostgreSQL, Docker, Grafana, and Prometheus</strong> to orchestrate high-throughput multi-party transaction flows and real-time merchant routing.</li>
                          <li>Maintained, optimized, and upgraded core modules of an enterprise-grade <strong class="text-slate-900 dark:text-slate-100 font-semibold">Human Resource Information System (HRIS)</strong> website using <strong class="text-slate-900 dark:text-slate-100 font-semibold">Laravel</strong>, including attendance monitoring, leave management, and employee directory systems.</li>
                          <li>Containerized Laravel applications using Docker to standardize development environments and accelerate deployment pipelines.</li>
                          <li>Implemented Grafana dashboards to monitor incoming and outgoing API requests, significantly enhancing system observability, tracking latency, and reducing debugging times for production issues.</li>
                      </ul>
                  </div>
  
                  <!-- Experience 2 -->
                  <div class="experience-block relative">
                      <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-lightbg dark:border-darkbg"></div>
                      <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-4">
                          <div>
                              <h3 class="font-serif font-bold text-xl text-slate-900 dark:text-slate-50">PHP Developer (Internship)</h3>
                              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">ANGGADA DUTA WISESA, PT | Jakarta, Indonesia</p>
                          </div>
                          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 self-start md:self-auto">May 2020 – March 2021</span>
                      </div>
                      <ul class="list-disc list-outside pl-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>Designed and executed complex SQL queries to analyze data warehouse repositories using <strong class="text-slate-900 dark:text-slate-100 font-semibold">Pentaho Data Integration</strong>, generating actionable business insights.</li>
                          <li>Developed new features, resolved bugs, and maintained corporate <strong class="text-slate-900 dark:text-slate-100 font-semibold">E-Procurement</strong> client applications built with <strong class="text-slate-900 dark:text-slate-100 font-semibold">PHP (CodeIgniter)</strong> and frontend JavaScript, ensuring optimal performance and secure transaction modules.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>
      <!-- Experience Section End -->
  
      <!-- Projects Section Start -->
      <section id="projects" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-8 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Key Projects</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Project 1 -->
                  <div class="group border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-400/50 rounded-md p-6 transition-all duration-300">
                      <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50 mb-2 group-hover:text-primary transition-colors">Football Strategy & Fantasy Platform</h3>
                      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Developed a low-latency Golang backend ingesting real-time external sports APIs for clubs, players, and leagues. Engineered a dynamic, gameweek-based dream team selection system and an interactive upcoming match score prediction engine.</p>
                      <div class="flex flex-wrap gap-1.5 mt-auto">
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Golang</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Next.js</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Redis</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">REST APIs</span>
                      </div>
                  </div>
  
                  <!-- Project 2 -->
                  <div class="group border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-400/50 rounded-md p-6 transition-all duration-300">
                      <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50 mb-2 group-hover:text-primary transition-colors">Airgift: Transactional Middleware</h3>
                      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Architected and developed a specialized middleware orchestrating transaction routing between multiple game/voucher suppliers and frontend portal merchants. Utilized Redis for queuing and Grafana/Prometheus for latency monitoring.</p>
                      <div class="flex flex-wrap gap-1.5 mt-auto">
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Laravel</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Redis</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">PostgreSQL</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Docker</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Grafana</span>
                      </div>
                  </div>
  
                  <!-- Project 3 -->
                  <div class="group border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-400/50 rounded-md p-6 transition-all duration-300">
                      <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50 mb-2 group-hover:text-primary transition-colors">Consumer Game Top-Up Portal</h3>
                      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Developed a high-conversion game top-up web portal, integrating diverse payment methods (e-wallets, mobile credit/pulsa billing) to deliver immediate automated game voucher purchases and direct-to-account top-ups.</p>
                      <div class="flex flex-wrap gap-1.5 mt-auto">
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Laravel</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">MySQL</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">APIs</span>
                      </div>
                  </div>
  
                  <!-- Project 4 -->
                  <div class="group border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-400/50 rounded-md p-6 transition-all duration-300">
                      <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50 mb-2 group-hover:text-primary transition-colors">Enterprise HRIS Website</h3>
                      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Engineered and managed critical core modules of an enterprise HRIS web application. Successfully developed automated leave request approval pipelines, biometric/manual attendance tracking, and employee directories.</p>
                      <div class="flex flex-wrap gap-1.5 mt-auto">
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">Laravel</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">MySQL</span>
                          <span class="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded">JavaScript</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <!-- Projects Section End -->
  
      <!-- Education Section Start -->
      <section id="education" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-8 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Education</h2>
              
              <div class="space-y-8">
                  <!-- Education 1 -->
                  <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                      <div>
                          <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50">Universitas Indraprasta PGRI (UNINDRA)</h3>
                          <p class="text-sm text-slate-600 dark:text-slate-400">Bachelor of Science in Information Technology | GPA: 3.61 / 4.00</p>
                      </div>
                      <span class="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 self-start md:self-auto">2021 – 2025</span>
                  </div>
                  
                  <!-- Education 2 -->
                  <div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                      <div>
                          <h3 class="font-serif font-bold text-lg text-slate-900 dark:text-slate-50">SMKN 26 Jakarta</h3>
                          <p class="text-sm text-slate-600 dark:text-slate-400">Vocational High School Diploma in Network and System Administration</p>
                      </div>
                      <span class="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 self-start md:self-auto">2017 – 2021</span>
                  </div>
              </div>
          </div>
      </section>
      <!-- Education Section End -->
  ```

- [ ] **Step 2: Run minified tailwind build to check style bindings**
  Run command: `npx tailwindcss -i ./src/input.css -o ./dist/final.css --minify`
  Ensure no warnings or syntax issues.

- [ ] **Step 3: Commit Experience, Projects, and Education**
  Run:
  ```bash
  git add index.html
  git commit -m "feat: implement professional experience timeline, key projects cards, and education details"
  ```

---

### Task 5: Refine Contact Form, Footer, and @media print Stylesheet

**Files:**
* Modify: [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html)
* Modify: [src/input.css](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/src/input.css)

- [ ] **Step 1: Replace contact, footer, and scripts block with the new layout and logic**
  Replace lines 248 to the end of [index.html](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/index.html) with the simplified, elegant layout, and the corrected JavaScript script blocks.
  
  Replace in `index.html`:
  ```html
      <!-- Contact Section Start -->
      <section id="contact" class="py-12 border-t border-slate-200/50 dark:border-slate-800/50 no-print">
          <div class="container max-w-4xl mx-auto px-6">
              <h2 class="font-serif font-bold text-2xl text-slate-900 dark:text-slate-50 mb-4 tracking-tight uppercase text-xs tracking-widest text-slate-400 dark:text-slate-500 font-sans">Contact</h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-md">Feel free to reach out using the form below. I'll get back to you as soon as possible.</p>
              
              <form name="portfolio-contact-form" class="max-w-xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div class="flex flex-col">
                          <label for="name" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Name</label>
                          <input type="text" id="name" name="nama" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 py-2.5 px-1 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none transition-colors" required/>
                      </div>
                      <div class="flex flex-col">
                          <label for="email" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email</label>
                          <input type="email" id="email" name="email" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 py-2.5 px-1 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none transition-colors" required/>
                      </div>
                  </div>
                  <div class="flex flex-col mb-8">
                      <label for="pesan" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Message</label>
                      <textarea id="pesan" name="pesan" rows="4" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 py-2.5 px-1 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none transition-colors resize-none" required></textarea>
                  </div>
                  
                  <div class="flex items-center gap-4">
                      <button type="submit" id="btn-kirim" class="px-6 py-2.5 bg-teal-600 dark:bg-teal-400 text-white dark:text-slate-900 font-semibold text-sm rounded hover:bg-teal-700 dark:hover:bg-teal-300 transition-colors">Send Message</button>
                      <button type="button" id="btn-loading" class="px-6 py-2.5 bg-slate-400 dark:bg-slate-600 text-white font-semibold text-sm rounded cursor-not-allowed hidden animate-pulse" disabled>Sending...</button>
                      
                      <!-- Inline feedback containers -->
                      <span id="form-success" class="hidden text-sm font-semibold text-teal-600 dark:text-teal-400">✓ Message sent successfully!</span>
                      <span id="form-error" class="hidden text-sm font-semibold text-red-500">✗ Failed to send message. Please try again.</span>
                  </div>
              </form>
          </div>
      </section>
      <!-- Contact Section End -->
  
      <!-- Footer Start -->
      <footer class="py-12 border-t border-slate-200/50 dark:border-slate-800/50 no-print">
          <div class="container max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <p>© 2026 Farhan Arfianto. All rights reserved.</p>
              <div class="flex gap-4">
                  <a href="https://linkedin.com/in/farhanarfianto" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="https://github.com/farhanskuyyyy" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">GitHub</a>
              </div>
          </div>
      </footer>
      <!-- Footer End -->
  
      <!-- Scroll to Top Button Start -->
      <a href="#home" id="toTop" class="fixed bottom-6 right-6 p-3 z-50 rounded-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-400 dark:hover:bg-teal-300 text-white dark:text-slate-900 shadow-md transition-all duration-300 hidden hover:scale-105 no-print" aria-label="Scroll to top">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </a>
      <!-- Scroll to Top Button End -->
  
      <script>
          // Sticky header & Back to top button visibility on scroll
          window.onscroll = function() {
              const header = document.querySelector('header');
              const toTop = document.querySelector('#toTop');
              if (window.scrollY > 100) {
                  header.classList.add('navbar-fixed');
                  toTop.classList.remove('hidden');
                  toTop.classList.add('flex');
              } else {
                  header.classList.remove('navbar-fixed');
                  toTop.classList.add('hidden');
                  toTop.classList.remove('flex');
              }
          }
  
          // Mobile Hamburger Button Toggle
          const hamburger = document.getElementById('hamburger');
          const mobileNav = document.getElementById('mobile-nav');
          hamburger.addEventListener('click', function() {
              hamburger.classList.toggle('hamburger-active');
              mobileNav.classList.toggle('hidden');
              mobileNav.classList.toggle('flex');
          });
  
          // Close mobile nav on click outside
          window.addEventListener('click', function(e) {
              if (e.target !== hamburger && !hamburger.contains(e.target) && e.target !== mobileNav && !mobileNav.contains(e.target)) {
                  hamburger.classList.remove('hamburger-active');
                  mobileNav.classList.add('hidden');
                  mobileNav.classList.remove('flex');
              }
          });
  
          // Close mobile nav when clicking links
          mobileNav.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', () => {
                  hamburger.classList.remove('hamburger-active');
                  mobileNav.classList.add('hidden');
                  mobileNav.classList.remove('flex');
              });
          });
  
          // Dark Mode Toggle Logic
          const darkToggle = document.getElementById('dark-toggle-btn');
          const html = document.documentElement;
          darkToggle.addEventListener('click', function() {
              html.classList.toggle('dark');
              localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
          });
  
          // Print Action Trigger
          document.getElementById('print-cv-btn').addEventListener('click', function() {
              window.print();
          });
  
          // Interactive Competencies (Skills) Filtering
          const categoryButtons = document.querySelectorAll('.skill-category-btn');
          const skillCards = document.querySelectorAll('.skill-group-card');
          
          categoryButtons.forEach(btn => {
              btn.addEventListener('click', () => {
                  // Reset button states
                  categoryButtons.forEach(b => {
                      b.classList.remove('bg-teal-600', 'text-white', 'dark:bg-teal-400', 'dark:text-slate-900');
                      b.classList.add('text-slate-600', 'dark:text-slate-400', 'border-slate-300', 'dark:border-slate-700');
                  });
                  
                  // Set active button state
                  btn.classList.add('bg-teal-600', 'text-white', 'dark:bg-teal-400', 'dark:text-slate-900');
                  btn.classList.remove('text-slate-600', 'dark:text-slate-400', 'border-slate-300', 'dark:border-slate-700');
                  
                  const targetCat = btn.getAttribute('data-category');
                  
                  skillCards.forEach(card => {
                      if (targetCat === 'all' || card.getAttribute('data-group') === targetCat) {
                          card.classList.remove('opacity-20');
                      } else {
                          card.classList.add('opacity-20');
                      }
                  });
              });
          });
  
          // Contact Form Submission handler
          const scriptURL = "https://script.google.com/macros/s/AKfycbwh4yHZ3QyEFUEnzIUVUW0cYRUi1bniNa6V4TuHibNl591mZMs-x8Mo9_sqRES1RbawKQ/exec";
          const form = document.forms["portfolio-contact-form"];
          const btnKirim = document.getElementById("btn-kirim");
          const btnLoading = document.getElementById("btn-loading");
          const successAlert = document.getElementById("form-success");
          const errorAlert = document.getElementById("form-error");
  
          form.addEventListener("submit", (e) => {
              e.preventDefault();
  
              btnLoading.classList.remove("hidden");
              btnKirim.classList.add("hidden");
              successAlert.classList.add("hidden");
              errorAlert.classList.add("hidden");
              
              fetch(scriptURL, { method: "POST", body: new FormData(form) })
              .then((response) => {
                  btnLoading.classList.add("hidden");
                  btnKirim.classList.remove("hidden");
                  successAlert.classList.remove("hidden");
                  form.reset();
              })
              .catch((error) => {
                  console.error("Error!", error.message);
                  btnLoading.classList.add("hidden");
                  btnKirim.classList.remove("hidden");
                  errorAlert.classList.remove("hidden");
              });
          });
      </script>
  </body>
  </html>
  ```

- [ ] **Step 2: Append custom `@media print` rules to the end of `src/input.css`**
  Open [src/input.css](file:///Users/farhanarfianto/Projects/belajar/farhanskuyyyy.github.io/src/input.css) and append:
  ```css
  
  @media print {
      body {
          background: #ffffff !important;
          color: #000000 !important;
          font-family: 'Lora', serif !important;
          font-size: 10pt !important;
          line-height: 1.35 !important;
      }
      
      h1, h2, h3 {
          color: #000000 !important;
      }
      
      .container,
      .max-w-4xl {
          max-width: 100% !important;
          width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
      }
      
      .no-print,
      header,
      footer,
      #contact,
      #toTop {
          display: none !important;
      }
      
      section {
          padding-top: 1.5rem !important;
          padding-bottom: 1.5rem !important;
          border-color: #e2e8f0 !important;
      }
      
      .experience-block {
          page-break-inside: avoid !important;
      }
      
      a[href^="http"]:after {
          content: " (" attr(href) ")" !important;
          font-size: 8pt !important;
          color: #475569 !important;
      }
  }
  ```

- [ ] **Step 3: Run full compiler and production minify script**
  Run: `npm run minify`
  Expected: Successful compilation, producing `dist/final.css` correctly minified.

- [ ] **Step 4: Commit contact and print CSS changes**
  Run:
  ```bash
  git add index.html src/input.css
  git commit -m "feat: style contact form, complete custom interactive js, and add print stylesheet"
  ```
