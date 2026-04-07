# PetGearHub — AI Agents & Automation Playbook

> A complete reference of all AI agents used to build this project, plus the agents needed to take it to production quality with full SEO, content, and marketing automation.

---

## Agents Used So Far

### 1. UI/UX Pro Max (`ui-ux-pro-max`)
**Purpose:** Design system generation and UI quality control
**What it did:**
- Generated the complete MASTER.md design system by cross-referencing 161 color palettes, 57 font pairings, and 50+ styles against the pet affiliate e-commerce product type
- Recommended Swiss Modernism 2.0 + Organic Biophilic hybrid style
- Defined the 3-layer token architecture (primitive → semantic → component)
- Created page-specific overrides for homepage, product detail, blog, and deals pages
- Provided accessibility checklist, anti-patterns, and dark mode specs

**When to use again:** Any time you add a new page, component, or change visual design. Run the design system search to validate choices against the skill's CSV databases.

### 2. Explore Agent (`subagent_type: Explore`)
**Purpose:** Fast codebase exploration and bug investigation
**What it did:**
- Traced the full product filtering flow to find the slug mismatch between frontend carousel (`dogs`) and database (`dog-supplies`)
- Investigated the RSC client manifest error in ProductFiltersWrapper
- Mapped the complete project structure (pages, components, APIs, models)
- Found petType value mismatches across frontend filters and seed data

**When to use:** Investigating bugs, understanding code flows, finding files, or mapping large sections of the codebase before making changes.

### 3. General Purpose Agent (`subagent_type: general-purpose`)
**Purpose:** Complex multi-step tasks
**What it did:**
- Wrote the comprehensive 1914-line seed file with ~120 products, 8 articles, analytics data, newsletter subscribers, and contact submissions
- Applied the design system tokens across tailwind config, globals.css, and 30+ component files

**When to use:** Large code generation tasks, multi-file refactors, or any task requiring extensive research + writing.

---

## Agents Needed for Production Readiness

### SEO & Content

#### 4. SEO Auditor (`searchfit-seo:seo-auditor`)
**Purpose:** Run a comprehensive SEO audit on the entire site
**Use for:**
- Check all pages for title tags, meta descriptions, heading hierarchy
- Validate Open Graph and Twitter Card meta tags
- Check canonical URLs and duplicate content issues
- Audit Core Web Vitals and page speed
- Review internal linking structure
- Check robots.txt and sitemap.xml completeness

**Command:** `/seo-audit`

#### 5. Technical SEO (`searchfit-seo:technical-seo`)
**Purpose:** Deep technical SEO audit
**Use for:**
- Crawlability and indexability checks
- Structured data (JSON-LD) validation across product and article pages
- Mobile-friendliness verification
- HTTPS and security headers audit
- Page speed and Core Web Vitals optimization
- Redirect chains and broken link detection

**Command:** `/technical-seo`

#### 6. Schema Markup (`searchfit-seo:schema-markup`)
**Purpose:** Generate JSON-LD structured data for every page type
**Use for:**
- `Product` schema for all product pages (price, rating, availability)
- `Article`/`BlogPosting` schema for blog posts
- `BreadcrumbList` schema for navigation
- `Organization` schema for the site
- `FAQPage` schema for FAQ sections
- `HowTo` schema for buyer's guides
- `ItemList` schema for category pages

**Command:** `/generate-schema`

#### 7. Content Strategist (`searchfit-seo:content-strategist`)
**Purpose:** Create a full content plan for organic growth
**Use for:**
- Identify content gaps in the pet supplies niche
- Plan blog post topics mapped to buyer intent keywords
- Create content calendar with publishing cadence
- Map content to funnel stages (awareness → consideration → purchase)
- Identify pillar pages and topic clusters

**Command:** `/content-strategy`

#### 8. Content Brief (`searchfit-seo:content-brief`)
**Purpose:** Generate detailed briefs for individual articles
**Use for:**
- Keyword-targeted article outlines
- Competitor content analysis for each topic
- Suggested headings, word count, and internal links
- FAQs to include for featured snippet opportunities

**Command:** `/content-brief`

#### 9. Content Creator (`searchfit-seo:create-content`)
**Purpose:** Generate SEO-optimized articles from briefs
**Use for:**
- Writing full buyer's guides (e.g., "Best Dog Beds 2026")
- Creating comparison articles (e.g., "Royal Canin vs Hill's Science Diet")
- Writing blog posts for organic traffic
- Ensuring proper keyword density and semantic coverage

**Command:** `/create-content`

#### 10. Keyword Clustering (`searchfit-seo:keyword-clustering`)
**Purpose:** Organize keywords into topical groups
**Use for:**
- Grouping pet product keywords by intent and topic
- Mapping keyword clusters to specific pages
- Identifying cannibalisation risks
- Planning internal linking between related pages

**Command:** `/keyword-cluster`

#### 11. Internal Linking (`searchfit-seo:internal-linking`)
**Purpose:** Optimize internal link structure
**Use for:**
- Finding orphan pages with no internal links
- Suggesting contextual links between related articles and products
- Building topical authority through strategic linking
- Fixing broken internal links

**Command:** `/internal-linking`

#### 12. On-Page SEO (`searchfit-seo:on-page-seo`)
**Purpose:** Optimize individual pages for target keywords
**Use for:**
- Title tag and meta description optimization
- Heading structure improvements
- Image alt text optimization
- Content gap analysis per page

**Command:** `/on-page-seo`

#### 13. Broken Links (`searchfit-seo:broken-links`)
**Purpose:** Find and fix broken links
**Use for:**
- Scanning all internal and external links
- Finding 404 pages
- Identifying redirect chains
- Fixing affiliate links that have changed

**Command:** `/broken-links`

#### 14. Competitor Analyzer (`searchfit-seo:competitor-analyzer`)
**Purpose:** Analyze competitor SEO strategies
**Use for:**
- Benchmarking against competing pet affiliate sites
- Finding keywords competitors rank for that we don't
- Analyzing competitor content strategies
- Identifying backlink opportunities

**Command:** Use the `competitor-analyzer` agent

#### 15. AI Visibility (`searchfit-seo:ai-visibility`)
**Purpose:** Optimize for AI-generated responses (ChatGPT, Claude, etc.)
**Use for:**
- Ensuring the site appears in AI-generated recommendations
- Structuring content for AI comprehension
- Adding proper entity markup for AI knowledge graphs

**Command:** `/ai-visibility`

### Programmatic SEO

#### 16. Programmatic SEO (`programmatic-seo` skill — already installed)
**Purpose:** Generate SEO pages at scale from templates + data
**Use for:**
- Auto-generating category landing pages (e.g., "Best Dog Food UK", "Best Cat Toys UK")
- Creating location-specific pages if needed
- Building comparison matrix pages
- Generating "Best X for Y" pages from product data

**Location:** `.claude/skills/programmatic-seo/SKILL.md`

### Performance & Quality

#### 17. Performance Optimizer (`vercel:performance-optimizer` agent)
**Purpose:** Optimize Core Web Vitals and loading performance
**Use for:**
- LCP optimization (hero images, fonts, critical CSS)
- CLS prevention (image dimensions, layout stability)
- INP improvement (interaction responsiveness)
- Bundle size analysis and code splitting
- Image optimization (WebP/AVIF, lazy loading, srcset)

#### 18. Lighthouse Audit (`chrome-devtools-mcp:chrome-devtools`)
**Purpose:** Run Lighthouse audits via Chrome DevTools
**Use for:**
- Performance scoring and bottleneck identification
- Accessibility audit (contrast, ARIA, keyboard nav)
- Best practices compliance
- SEO audit via Lighthouse

**Command:** `/chrome-devtools`

#### 19. Accessibility Debugger (`chrome-devtools-mcp:a11y-debugging`)
**Purpose:** Deep accessibility testing
**Use for:**
- WCAG 2.1 AA compliance verification
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast validation across all components

### Deployment & Infrastructure

#### 20. Vercel Deployment (`vercel:deploy`)
**Purpose:** Deploy and manage Vercel deployments
**Use for:**
- Production deployments
- Preview deployments for PR review
- Rollback if issues are found
- Environment variable management

**Command:** `/deploy`

#### 21. Vercel Status (`vercel:status`)
**Purpose:** Monitor deployment health
**Use for:**
- Checking recent deployment status
- Viewing build logs
- Monitoring function performance

**Command:** `/status`

---

## Recommended Agent Workflow for Launch

### Phase 1: SEO Foundation
```
1. /technical-seo          → Fix crawlability, indexability, speed issues
2. /seo-audit              → Full audit, fix all critical issues
3. /generate-schema        → Add JSON-LD to every page type
4. /on-page-seo            → Optimize titles, metas, headings
5. /broken-links           → Fix all broken links
```

### Phase 2: Content Strategy
```
1. /content-strategy       → Create full content plan
2. /keyword-cluster        → Map keywords to pages
3. /content-brief          → Generate briefs for top 10 articles
4. /create-content         → Write the articles
5. /internal-linking       → Connect everything together
```

### Phase 3: Competitive Edge
```
1. competitor-analyzer     → Benchmark against competitors
2. /ai-visibility          → Optimize for AI search
3. programmatic-seo        → Generate scale pages
```

### Phase 4: Performance & Deploy
```
1. performance-optimizer   → Core Web Vitals optimization
2. a11y-debugging          → Accessibility compliance
3. /deploy                 → Ship to production
4. /status                 → Verify everything is live
```

---

## Quick Reference

| Agent | Trigger | Category |
|-------|---------|----------|
| `ui-ux-pro-max` | New page/component design | Design |
| `Explore` | Bug investigation, code tracing | Development |
| `general-purpose` | Large code generation tasks | Development |
| `/seo-audit` | Full SEO health check | SEO |
| `/technical-seo` | Technical SEO deep dive | SEO |
| `/generate-schema` | JSON-LD structured data | SEO |
| `/content-strategy` | Content planning | Content |
| `/content-brief` | Article planning | Content |
| `/create-content` | Article writing | Content |
| `/keyword-cluster` | Keyword organization | SEO |
| `/internal-linking` | Link structure optimization | SEO |
| `/on-page-seo` | Per-page optimization | SEO |
| `/broken-links` | Link health check | SEO |
| `competitor-analyzer` | Competitive analysis | SEO |
| `/ai-visibility` | AI search optimization | SEO |
| `programmatic-seo` | Scale page generation | SEO |
| `performance-optimizer` | Core Web Vitals | Performance |
| `/chrome-devtools` | Lighthouse audit | Performance |
| `a11y-debugging` | Accessibility testing | Accessibility |
| `/deploy` | Production deployment | Infrastructure |
| `/status` | Deployment monitoring | Infrastructure |
