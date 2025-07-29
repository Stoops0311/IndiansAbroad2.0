# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build the production application (ALWAYS run before pushing to GitHub)
- `npm run start`: Start production server
- `npm run lint`: Run Next.js linting
- `npm run upload-testimonials`: Execute bulk testimonial upload script
- `npm run parse-universities`: Parse universities CSV data
- `npm run migrate-to-backblaze`: Migrate files to Backblaze B2 storage (dev)
- `npm run migrate-to-backblaze-prod`: Migrate files to Backblaze B2 storage (production)

## Project Architecture

This is a Next.js 15.4.2 application with TypeScript, using the App Router pattern. The project is a study abroad/immigration consulting website with comprehensive content management capabilities.

### Technology Stack
- **Frontend**: Next.js 15.4.2, React 19.1.0, TypeScript 5
- **Database**: Convex (real-time backend with live queries)
- **Styling**: Tailwind CSS v4, Framer Motion for animations
- **UI Components**: Custom components with Radix UI primitives (shadcn/ui patterns)
- **3D Graphics**: Three.js with React Three Fiber
- **File Storage**: Backblaze B2 cloud storage for photos/documents
- **AI Integration**: Perplexity Sonar Reasoning API for automated content generation

### Database Schema (Convex)
The application uses four main data tables:

1. **testimonials**: Client reviews with photo/document storage, ratings, and service categorization
2. **universities**: Partner institution database with search capabilities and program details
3. **newsArticles**: AI-generated immigration/education news with markdown content and metadata
4. **scheduledArticles**: Admin-controlled article scheduling system with custom prompts and titles

### News Management System
- **Automated Content Generation**: Cron job runs hourly to process scheduled articles using AI
- **Admin Control**: Admins set custom titles, research prompts, categories, and scheduling
- **Content Parser**: Enhanced markdown parser supporting tables and inline citations with tooltips
- **Draft System**: Admin preview functionality for articles before publication
- **Real-time Stats**: Live dashboard showing article statistics and scheduling status

### Admin Interface Architecture
- **Protected Routes**: Session-based authentication for admin areas
- **Unified Management**: Combined interface for published articles and scheduled content
- **Bulk Operations**: Support for testimonial uploads and data migrations
- **File Management**: Integration with Backblaze B2 for photo/document storage

### Component Organization
- **Feature-based Components**: NewsManagement, TestimonialManagement, UniversityExplorer
- **Layout Components**: Header with responsive navigation, Footer with quicklinks, DesktopSidebar
- **UI Components**: Following shadcn/ui patterns in `/components/ui`
- **Modal System**: Service details, testimonial forms, university exploration
- **Theme System**: Dark/light mode support via React Context

### Navigation Architecture
- **Header**: Main navigation with collapsible menu and theme toggle
- **Desktop Sidebar**: Floating sidebar for quick access to key features (News, Careers, Blog, Contact)
- **Footer**: Contact information, quicklinks, and partner certifications

### Development Patterns
- **TypeScript**: Strict typing with Convex ID types and proper error handling
- **Real-time Queries**: All data fetching uses Convex live queries for instant updates
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Error Boundaries**: Graceful handling of component failures
- **Performance**: Next.js 15 optimizations with Turbopack development server

### File Storage Integration
- **Backblaze B2**: Primary storage for user photos and supporting documents
- **Migration Scripts**: Automated tools for moving files between storage systems
- **URL Management**: Direct B2 URLs for optimized file serving

### Content Management Workflow
1. **Scheduled Articles**: Admin creates scheduled articles with custom titles/prompts
2. **AI Generation**: Hourly cron processes due articles using Perplexity API
3. **Content Parsing**: Enhanced markdown parsing with table and citation support
4. **Admin Review**: Draft articles viewable via admin preview links
5. **Publication**: Manual approval process before articles go live

### Cron Job System
- **File**: `/convex/crons.js` defines scheduled tasks
- **Scheduled Articles**: Hourly processing via `internal.generateNews.processScheduledArticles`
- **Daily Digest**: Daily RSS feed processing at 6 AM UTC via `internal.generateDailyDigest.generateDailyDigest`

## Critical Development Rules

### Pre-Commit Requirements
- **ALWAYS** run `npm run build` before pushing changes to GitHub to ensure the application compiles successfully
- Test all changes in development mode first with `npm run dev`

### Component Development Patterns  
- **DesktopSidebar**: Present on all major pages (homepage, success-stories, about, destinations, contact, eligibility) for consistent navigation
- **Modal System**: Uses shadcn/ui Dialog components with proper z-index layering
- **Video Components**: YouTube thumbnails should be appropriately sized (current: w-24 h-16 for main page, w-32+ for dedicated pages)
- **Country Flags**: Maintain emoji flags in components for UX - only remove decorative emojis, not functional ones

### Database Operations
- **Real-time Updates**: All data fetching uses Convex live queries (`useQuery`) for instant updates
- **Table Structure**: Four main tables - testimonials, universities, newsArticles, scheduledArticles
- **File Storage**: Backblaze B2 URLs in `photoUrl` and `supportingDocUrls` fields, legacy `_storage` IDs being phased out

### AI Content Generation
- **News System**: Scheduled articles processed hourly via Perplexity Sonar API
- **Content Format**: Enhanced markdown with table support and inline citations
- **Admin Control**: All AI generation controlled through admin interface with custom prompts

## Website Design Patterns

- **Bento Grid Layout**: Homepage uses custom bento grid system for component organization
- **Theme Support**: Comprehensive dark/light theme implementation  
- **Responsive Breakpoints**: Mobile-first design with careful attention to tablet and desktop layouts
- **Animation System**: Framer Motion for page transitions and component animations
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support