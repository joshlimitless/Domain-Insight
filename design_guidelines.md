# cord.to Design Guidelines

## Design Approach
**Reference-Based Approach**: Draw inspiration from modern SaaS analytics platforms (Linear, Vercel, Stripe Dashboard) combined with the user's explicit dark mode aesthetic with pastel gradients. This is a utility-focused analytics product that needs to establish trust and demonstrate sophistication.

## Core Aesthetic Requirements (User-Specified)
- **Dark Mode Foundation**: Deep, rich dark backgrounds (not pure black)
- **Pastel Accents**: Soft, muted pastel colors for highlights and CTAs
- **Elegant Gradients**: Subtle gradient overlays and transitions
- **Sophisticated Shadows**: Layered shadows for depth and elevation
- **Tasteful Outlines**: Refined borders and glows for component definition

## Typography System
- **Headings**: Inter or DM Sans - Bold weights (700-800) for impact
  - Hero: 3.5rem (desktop), 2.5rem (mobile)
  - Section Titles: 2.5rem (desktop), 2rem (mobile)
  - Card Headers: 1.5rem
- **Body Text**: Inter or Work Sans - Regular (400) and Medium (500)
  - Primary: 1rem with 1.6 line-height
  - Secondary: 0.875rem for metadata
- **Accent Text**: Use gradient text effects on key phrases

## Layout & Spacing
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
- Section padding: py-24 (desktop), py-16 (mobile)
- Container: max-w-7xl with px-6
- Component spacing: gap-8 between major elements, gap-4 within cards

## Landing Page Structure

### 1. Hero Section (80vh)
- **Layout**: Centered content with gradient background overlay
- **Content**: Bold headline emphasizing "Take Control of Your Domain Data", subheadline explaining the marketplace visibility problem
- **Visuals**: Animated dashboard preview or abstract domain network visualization as background
- **CTA**: Prominent "Take Control" button with gradient background and blur effect

### 2. Problem Section
- **Title**: "Lost in the Marketplace Black Hole?"
- **Layout**: 2-column split (text + illustration)
- **Content**: Elaborate on DNS configuration challenges with Afternic, GoDaddy, Spaceship, Dynadot, Sedo, ParkingCrew
- **Visual**: Diagram showing locked-down marketplace vs. cord.to transparency

### 3. Benefits Grid
- **Layout**: 3-column grid (2-col tablet, 1-col mobile)
- **Cards**: Each benefit in a card with subtle shadow, gradient border
  - Lander Uptime Monitoring (with status indicators)
  - Loading Speed Metrics (with performance charts)
  - Geographic Analytics (country/city heatmap preview)
  - Session Duration Tracking (timeline visualization)
  - Traffic Source Discovery (referral flow diagram)
  - Third-Party Integrations (Google Analytics, Phantom, Seline logos)

### 4. Dashboard Preview
- **Full-width section** showing mock analytics interface
- **Elements**: Traffic graphs, geographic map, performance metrics
- **Style**: Glass-morphism effect on dashboard elements

### 5. Integration Showcase
- **Layout**: Centered content with logo grid below
- **Content**: Highlight Google Analytics, Phantom & Seline compatibility
- **Visual**: Integration partner logos with subtle glow effects

### 6. Registration Form Section
- **Layout**: Centered form (max-w-md) on gradient background
- **Form Fields**:
  - Name (text input)
  - Email (email input)
  - Phone Number (tel input)
- **Styling**: Dark inputs with pastel borders, focus states with glow
- **CTA**: "Take Control" button - large, gradient background, prominent shadow
- **Supporting Text**: "No credit card required" or "Start free today"

### 7. Footer
- Minimal dark footer with pastels for links
- Quick links, social proof ("Trusted by 500+ domain investors"), contact

## Component Library

### Cards
- Background: rgba(255,255,255,0.05) on dark
- Border: 1px pastel gradient or solid pastel with low opacity
- Shadow: Multi-layer (inner subtle glow + outer shadow)
- Hover: Subtle lift with enhanced glow

### Buttons
- **Primary CTA**: Gradient background (pastel pink to purple/blue), white text, strong shadow, blur backdrop if on images
- **Secondary**: Outline style with pastel border, transparent background
- **States**: No custom hover/active (Button component handles this)

### Form Inputs
- Dark background (slightly lighter than page)
- Pastel borders (soft blue/purple)
- Focus: Enhanced pastel glow effect
- Placeholder: Muted pastel text

### Gradients
- **Hero Background**: Deep purple to deep blue with overlay
- **Section Accents**: Subtle radial gradients in corners
- **Text Highlights**: Linear pastel gradients on key phrases
- **Card Borders**: Subtle gradient outlines

### Shadows & Depth
- **Elevated Cards**: 0 4px 20px rgba(0,0,0,0.4), 0 0 40px rgba(pastel,0.1)
- **Subtle Elements**: 0 2px 8px rgba(0,0,0,0.2)
- **Glows**: Pastel-colored box-shadows for emphasis

## Images
- **Hero**: Dashboard preview mockup or abstract network visualization showing domain connections
- **Problem Section**: Illustration comparing locked marketplace (chains/locks) vs. cord.to freedom (open data flows)
- **Benefits Cards**: Small icons or data visualization previews for each benefit
- **Dashboard Preview**: Full-featured analytics interface mockup showing graphs, maps, metrics

## Animation Strategy
Minimal, purposeful animations:
- Fade-in on scroll for sections
- Subtle hover lifts on cards
- Smooth transitions on form focus states
- Dashboard metrics counter animations