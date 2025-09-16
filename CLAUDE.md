# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for Opens' customer service diagnostic tool ("Raio-X de Atendimento"). The application is deployed at the `/raio-x` basePath and uses TypeScript, Tailwind CSS, and Framer Motion for animations.

## Development Commands

```bash
# Start development server on port 3000
npm run dev

# Build for production (creates standalone output)
npm run build

# Run production server
npm run start

# Run ESLint
npm run lint
```

## Architecture & Key Patterns

### App Router Structure
- Uses Next.js 15 App Router with Server and Client Components
- Main layout: `app/layout.tsx` (Server Component) delegates GTM initialization to `app/client-layout.tsx` (Client Component)
- Metadata is centralized in `app/metadata.tsx`
- Landing page component: `components/ui/component.tsx` (Client Component with animations and tracking)

### Form Handling & Data Layer
- Form component separated at `components/form/Formulario.tsx` for better organization
- Extensive dataLayer tracking implemented throughout the application for GTM integration
- Track events include: page views, CTA clicks, form interactions, scroll depth, and section views

### Deployment Configuration
- **basePath**: `/raio-x` - All routes are prefixed with this path
- **output**: `standalone` - Optimized for containerized deployments
- Uses Dockerfile for production deployment with multi-stage build
- Security headers configured in `next.config.mjs`

### Component Library
- UI components in `components/ui/` using Radix UI primitives
- Utility functions: `lib/utils.ts` and `util/cn.ts` for className merging
- Canvas confetti effect available (see `INSTRUCOES-CONFETE.md` for implementation details)

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Target: ES2017

## Important Notes

- Images are unoptimized (`images.unoptimized: true`) in production
- GTM integration requires proper environment configuration
- Form submissions redirect to `/raio-x/confirmacao` page with confetti animation
- All components using browser APIs must be marked with `"use client"`