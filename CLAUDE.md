# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build the production application
- `npm run lint`: Run Next.js linting
- `npm run upload-testimonials`: Execute bulk testimonial upload script
- `npm run parse-universities`: Parse universities CSV data

## Project Architecture

This is a Next.js 15.4.2 application with TypeScript, using the App Router pattern. The project is a study abroad/immigration consulting website with the following key components:

### Technology Stack
- **Frontend**: Next.js 15.4.2, React 19.1.0, TypeScript 5
- **Database**: Convex (real-time backend)
- **Styling**: Tailwind CSS v4, Framer Motion
- **UI Components**: Custom components with Radix UI primitives
- **3D Graphics**: Three.js with React Three Fiber

### Directory Structure
- `/app` - Next.js App Router pages and layouts
  - Core pages: about, admin, contact, destinations, eligibility, services, success-stories, terms
- `/components` - React components organized by feature
  - UI components in `/components/ui` following shadcn/ui patterns
- `/convex` - Backend functions and database schema
  - Schema defines testimonials and universities tables
  - Includes mutations and queries for data management
- `/contexts` - React context providers (ThemeContext)
- `/lib` - Utility functions and data files
- `/scripts` - Data migration and upload utilities

### Key Features
1. **Bento Grid Layout**: Main page uses a custom bento grid system for component organization
2. **Admin Panel**: Protected admin interface at `/admin` for content management
3. **Database Schema**: 
   - Testimonials with file storage support for photos/documents
   - Universities with search capabilities and filtering
4. **Real-time Data**: Convex integration for live updates
5. **Responsive Design**: Mobile-first approach with breakpoint-specific layouts

### Development Patterns
- Components use TypeScript with proper type definitions
- Convex functions handle all database operations
- CSS uses Tailwind utility classes with custom bento grid implementation
- File uploads handled through Convex storage system

## Website Design

- This website uses a bento layout pattern for the homepage
- Components are designed to fit into grid cells with responsive sizing
- Dark/light theme support through ThemeContext