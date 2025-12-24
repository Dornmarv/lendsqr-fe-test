# Lendsqr Frontend Engineering Assessment

A modern, responsive admin dashboard for managing users, built with **Next.js 16**, **TypeScript**, and **SCSS**. This project demonstrates best practices in React development, component architecture, and frontend engineering.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-1.97-pink?logo=sass)
![Jest](https://img.shields.io/badge/Jest-30.x-green?logo=jest)

## 🌐 Live Demo

**[View Live Application](https://marvellous-posu-lendsqr-fe-test.vercel.app)**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Design Decisions](#-design-decisions)
- [Accessibility](#-accessibility)
- [Architecture](#-architecture)

## ✨ Features

### Core Functionality

- **User Authentication** - Login page with form validation
- **User Management** - View, filter, and paginate 500 mock users
- **User Details** - Comprehensive user profile with multiple data sections

### UI/UX

- **Responsive Design** - Mobile-responsive
- **Skeleton Loaders** - Animated loading states for better perceived performance
- **Collapsible Sidebar** - Mobile hamburger menu with overlay
- **Filter System** - Multi-field filtering with dropdown UI
- **Pagination** - Configurable page sizes (10, 20, 50, 100)

### Technical Highlights

- **IndexedDB Storage** - Client-side persistence for user data
- **Reusable Components** - Button, Icon, Skeleton with variant support
- **Custom Hooks** - `useClickOutside` for dropdown management
- **Type Safety** - Full TypeScript coverage with explicit return types
- **Error Boundaries** - Graceful error handling with fallback UI
- **Accessibility** - ARIA labels, roles, and keyboard navigation support
- **Unit Testing** - 112 tests with positive and negative scenarios

## 🛠 Tech Stack

| Category      | Technology                           |
| ------------- | ------------------------------------ |
| Framework     | Next.js 16 (App Router)              |
| Language      | TypeScript 5.x                       |
| Styling       | SCSS Modules                         |
| Data Fetching | TanStack React Query 5.x             |
| Testing       | Jest + React Testing Library         |
| Storage       | IndexedDB with localStorage fallback |
| Deployment    | Vercel                               |

## 🔗 Mock API

User data is fetched from an external mock API hosted on npoint.io:

- **Endpoint**: `https://api.npoint.io/24eb0dde1623416ece94`
- **Records**: 500 users with full profile data
- **Fallback**: Local generation if API is unavailable

### React Query Integration

The app uses TanStack Query for efficient data fetching:

```typescript
// Custom hooks in src/hooks/useQueries.ts
useUsers(); // Paginated users with filters
useUser(id); // Single user by ID
useUsersStatistics(); // Dashboard statistics
useOrganizations(); // Organization dropdown data
```

**Benefits**:

- Automatic caching (5-minute stale time)
- Loading/error states built-in
- Automatic refetching on window focus (disabled)
- Request deduplication

## 📁 Project Structure

```
src/
├── __tests__/                # Unit tests
│   ├── components/           # Component tests
│   ├── hooks/                # Hook tests
│   └── lib/                  # Utility tests
├── app/                      # Next.js App Router pages
│   ├── dashboard/
│   │   ├── users/
│   │   │   ├── page.tsx      # Users list page
│   │   │   └── [id]/         # User details page
│   │   └── error.tsx         # Dashboard error boundary
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── global-error.tsx      # Global error boundary
│   └── not-found.tsx         # 404 page
├── components/
│   ├── layout/               # Layout components
│   │   ├── dashboard-layout/ # Main dashboard wrapper
│   │   ├── header/           # Top navigation bar
│   │   └── sidebar/          # Collapsible navigation
│   ├── ui/                   # Reusable UI components
│   │   ├── button/           # Button with variants
│   │   ├── error-boundary/   # Error boundary component
│   │   ├── icon/             # Next.js Image wrapper
│   │   └── skeleton/         # Loading placeholders
│   └── users/                # Users feature components
│       ├── pagination/       # Page controls
│       ├── statistics-cards/ # Dashboard stats
│       ├── user-details/     # User detail page components
│       │   ├── general-details-tab/  # Tab content
│       │   ├── info-section/         # Reusable info grid
│       │   ├── user-details-skeleton/# Loading state
│       │   └── user-summary-card/    # Profile header
│       ├── users-filter/     # Filter dropdown
│       └── users-table/      # Data table
│           ├── table-header/ # Sortable column headers
│           └── table-row/    # User row with actions
├── hooks/                    # Custom React hooks
│   ├── index.ts              # Barrel export
│   ├── useClickOutside.ts    # Click outside detection
│   └── useQueries.ts         # React Query hooks
├── lib/                      # Utilities and services
│   ├── api.ts                # API fetch + fallback
│   ├── assets.ts             # Centralized asset paths
│   ├── constants.ts          # Magic numbers & config
│   ├── mock-data.ts          # Static mock data
│   ├── query-keys.ts         # React Query key factory
│   ├── storage.ts            # IndexedDB service
│   └── types/                # TypeScript definitions
├── providers/                # Context providers
│   └── query-provider.tsx    # React Query provider
└── styles/                   # Global styles
    ├── _variables.scss       # Design tokens
    ├── _mixins.scss          # SCSS mixins
    └── globals.scss          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dornmarv/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Create production build  |
| `npm run start`         | Start production server  |
| `npm run lint`          | Run ESLint               |
| `npm run test`          | Run unit tests           |
| `npm run test:watch`    | Run tests in watch mode  |
| `npm run test:coverage` | Run tests with coverage  |

## 🧪 Testing

The project includes comprehensive unit tests following the assessment requirement for **positive and negative scenario testing**.

### Test Coverage

| Test Suite           | Tests | Coverage                               |
| -------------------- | ----- | -------------------------------------- |
| useClickOutside hook | 7     | Hook behavior, cleanup                 |
| API utilities        | 23    | Pagination, filtering, data generation |
| Button component     | 15    | Variants, events, states               |
| Skeleton component   | 16    | Variants, dimensions, presets          |
| Constants            | 28    | Values, types, validation              |
| StatisticsCards      | 9     | Loading, data display                  |
| Pagination           | 14    | Navigation, limits                     |

### Running Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## ♿ Accessibility

The application implements WCAG accessibility best practices:

### ARIA Labels & Roles

- `role="banner"` on header
- `role="navigation"` on sidebar with `aria-label`
- `role="main"` on main content
- `role="search"` on search form
- `role="status"` on status badges
- `aria-expanded` and `aria-haspopup` on dropdowns

### Form Accessibility

- Labels associated with inputs via `htmlFor`/`id`
- `aria-invalid` and `aria-describedby` for form errors
- `role="alert"` on error messages
- `autocomplete` attributes on login form

### Utility Classes

- `.visually-hidden` for screen-reader-only content

## 🎨 Design Decisions

### Component Architecture

**Atomic Design Principles**: Components organized by complexity:

- `ui/` - Primitive components (Button, Icon, Skeleton)
- `layout/` - Structural components (Header, Sidebar)
- `users/` - Feature-specific components (UsersTable, Pagination)

### Error Handling Strategy

**Multi-layer Error Boundaries**:

- `ErrorBoundary` component for reusable error catching
- `global-error.tsx` for root-level errors
- `dashboard/error.tsx` for dashboard route errors
- `not-found.tsx` for 404 pages

### State Management

**Local State First**: React's built-in `useState`/`useEffect` for simplicity.

### Data Persistence

**IndexedDB with Fallback**: Primary IndexedDB storage with localStorage fallback.

## 🏗 Architecture

### Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   API Layer │ ──▶ │   Page       │ ──▶ │  Components │
│  (api.ts)   │     │  (page.tsx)  │     │   (UI)      │
└─────────────┘     └──────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Mock Data  │     │    State     │     │   Styles    │
│(mock-data)  │     │  (useState)  │     │   (SCSS)    │
└─────────────┘     └──────────────┘     └─────────────┘
```

### Key Patterns

1. **Container/Presenter** - Pages handle data; components handle rendering
2. **Barrel Exports** - `index.ts` files for cleaner imports
3. **Constants Extraction** - Magic numbers in `constants.ts`
4. **Custom Hooks** - Reusable logic in hook files
5. **Explicit Types** - All functions have TypeScript return types

## 📱 Responsive Breakpoints

| Breakpoint | Width          | Target           |
| ---------- | -------------- | ---------------- |
| Mobile     | < 768px        | Phones           |
| Tablet     | 768px - 1023px | Tablets          |
| Desktop    | ≥ 1024px       | Laptops/Desktops |

## 📄 License

This project is created for the Lendsqr Frontend Engineering Assessment.

---

Built with ❤️ by Marvellous Posu
