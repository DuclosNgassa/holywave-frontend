# HolyWave Frontend - Project Guidelines & Mandates

This document provides the foundational mandates, architectural patterns, and design standards for the HolyWave frontend project. All development MUST adhere to these rules to maintain the premium, modern aesthetic and code integrity.

## Core Technologies
- **Framework:** Expo (v54) with React Native (v0.81.5)
- **Language:** TypeScript (Strict Type Safety mandated)
- **Navigation:** Expo Router (File-based routing) with **Custom Floating Navigation**
- **State Management & Data Fetching:** TanStack Query (React Query) with Axios
- **Authentication:** Clerk Expo
- **UI Library:** React Native Paper, React Native Reanimated

## Project Structure
- `app/`: Main application routes and screens.
- `components/`: Shared, reusable UI components.
- `constants/`: Global constants (**COLORS**, **TYPOGRAPHY**, **SPACING**).
- `hooks/`: Custom React hooks for shared logic.
- `utils/`: Utility functions and helper scripts.
- `assets/`: Static assets and style modules.

## Global Styling System (Foundational Mandate)
All styling MUST utilize the centralized constant system to ensure visual unity.

### Colors (`@/constants/colors.js`)
- **Usage:** ALWAYS use `COLORS` constants. **NEVER** hardcode hex values in style files.
- **Primary Text:** Use "Rich Charcoal" (`#1A1C1E`) instead of pure black (`#000000`).
- **Secondary Text:** Use Neutral Greys (`#6C757D`) for labels and metadata.
- **Backgrounds:** Use Soft Off-White (`#F8F9FA`) for main screen backgrounds to reduce glare.
- **Elevation:** Use `rgba(0,0,0,0.05)` for soft shadows to create modern depth.

### Typography (`@/constants/typography.js`)
- **Usage:** ALWAYS use `TYPOGRAPHY` constants (e.g., `...TYPOGRAPHY.h1`).
- **Hierarchy:** 
    - `h1`: 32px, ExtraBold (Titles)
    - `h2`: 24px, ExtraBold (Section Headers)
    - `body`: 16px, Regular (Content)
    - `label`: 13-14px, SemiBold (Input labels/Action text)
- **Readability Rule:** Body/Description text **MUST** have a breathable line height of at least `26px`.
- **Title Tracking:** Large titles should use `letterSpacing: -0.5` for a modern editorial feel.

## UI/UX Design Standards
The app follows a "Modern Editorial" aesthetic characterized by immersive imagery and card-based depth.

- **Primary Navigation:** Uses a **Floating Pill Tab Bar** (`components/CustomTabBar.tsx`). Do not use anchored bottom bars.
- **Detail Pages:** Features large header images with **gradient-overlaid titles** and high-radius (`40px`) content cards that overlap the header.
- **List Views:** Prefer the **Horizontal Card** pattern (`components/HorizontalPostCard.tsx`) with square images on the left and structured text stacks on the right.
- **Forms:** Must be organized into **Section Cards** (`sectionCard` style) with soft backgrounds (`#F8F9FA`) and large touch targets (`52px+` height).
- **Interactions:** Use **Floating Action Buttons (FAB)** for critical secondary actions like Logout or Quick-Delete.
- **Visual Feedback:** All lists MUST include a **bottom gradient fade-out** to suggest more content.

## Architectural Patterns
- **Hooks for Logic:** Components MUST remain lean. Move business logic, API calls, and complex state into custom hooks within `hooks/`.
- **Service Layer:** Use Axios instances in `utils/api.ts` or dedicated service files.
- **Type Safety:** Strictly avoid `any`. Always define interfaces for API responses and component props.
- **Components:** Functional components with TypeScript are the mandatory standard.

## Development Workflow
- **Surgical Updates:** Only modify the code necessary to fulfill the requirement.
- **Consistency:** Analyze surrounding files to ensure your changes are seamless and idiomatic.
- **Commits:** Use descriptive prefix messages (`feat:`, `fix:`, `refactor:`, `style:`).
- **Validation:** Always verify changes through linting (`npm run lint`) and visual inspection.
