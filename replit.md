# cord.to - Domain Analytics Platform

## Overview

cord.to is a domain analytics platform designed for domain name investors who use marketplace landers (Afternic, GoDaddy, Spaceship, Dynadot) or parking services (Sedo, ParkingCrew). The platform solves the "DNS lock-in" problem where investors lose visibility into their domain traffic when using these services. cord.to provides comprehensive analytics including uptime monitoring, loading speed metrics, geographic analytics, session tracking, and traffic source discovery, while also enabling third-party integrations like Google Analytics, Phantom, and Seline.

The application is currently in beta and features a landing page for user registration and marketing the core value proposition.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**UI Component System**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling

**Design System**:
- Dark mode-first aesthetic with pastel gradients and sophisticated shadows
- Typography using DM Sans, Inter, and custom font families
- Component library follows the "new-york" style variant from shadcn/ui
- Consistent spacing units and elevation system for visual hierarchy
- Design guidelines emphasize reference-based approach drawing from modern SaaS platforms (Linear, Vercel, Stripe)

**State Management**: 
- TanStack Query (React Query) for server state management
- React hooks for local component state
- Custom toast notification system via shadcn/ui toast components

**Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript

**Build System**: esbuild for server bundling, Vite for client bundling

**API Design**: RESTful endpoints with JSON request/response format
- `/api/register` - POST endpoint for user registration
- `/api/registrations` - GET endpoint for retrieving registrations (admin/internal)

**Error Handling**: Centralized error handling with Zod validation errors converted to user-friendly messages via zod-validation-error

**Request Logging**: Custom middleware that logs HTTP method, path, status code, and duration for all API requests

**Development Setup**: Hot module reloading via Vite in development mode with custom error overlay

### Data Storage

**Database**: PostgreSQL via Drizzle ORM

**Schema Design**:
- `users` table: Basic user authentication with username/password
- `registrations` table: Beta signup registrations with name, email, phone, and timestamp

**ORM Configuration**: 
- Drizzle ORM with node-postgres driver
- Type-safe schema definitions with Zod validation schemas
- Migration management via drizzle-kit

**Fallback Storage**: In-memory storage implementation (MemStorage) for development/testing without database dependency

**Design Decision**: The application uses Drizzle ORM which provides a flexible, type-safe abstraction layer. While currently configured for PostgreSQL, the ORM pattern allows for database flexibility. The in-memory storage implementation serves as both a development tool and demonstrates the storage interface pattern.

### External Dependencies

**Database**: PostgreSQL (configured via DATABASE_URL environment variable)

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling
- lucide-react for iconography
- react-icons (specifically SiGoogle for brand icons)

**Third-Party Analytics Integration Support** (planned features based on design docs):
- Google Analytics 4
- Phantom (visitor fingerprinting and behavior analysis)
- Seline (privacy-focused analytics)

**Development Tools**:
- TypeScript for type safety across client and server
- Vite for fast development builds and HMR
- esbuild for optimized production server builds
- Replit-specific plugins for development environment integration

**Session Management**: Infrastructure for express-session with connect-pg-simple (dependencies present but not yet implemented in routes)

**Form Validation**: Zod for schema validation with drizzle-zod for database schema integration

**Date Handling**: date-fns for date manipulation and formatting

**Design Rationale**: The architecture separates concerns cleanly between presentation (React components), business logic (API routes), and data access (storage layer with Drizzle ORM). The use of shadcn/ui provides a balance between customization and rapid development, while TanStack Query handles the complexity of server state synchronization. The in-memory storage fallback enables development without external dependencies while maintaining the same interface as the production database implementation.