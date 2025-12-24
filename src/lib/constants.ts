/**
 * Application-wide constants
 * Centralizes magic numbers and configuration values
 */

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,
} as const;

// Data Generation
export const DATA_GENERATION = {
    TOTAL_USERS: 500,
    SIMULATED_API_DELAY_MS: 100,
    MAX_EMPLOYMENT_YEARS: 10,
    ACCOUNT_NUMBER_LENGTH: 10,
    PHONE_NUMBER_LENGTH: 8,
} as const;

// UI Delays
export const DELAYS = {
    LOGIN_SIMULATION_MS: 1000,
    API_SIMULATION_MS: 100,
} as const;

// Icon Sizes
export const ICON_SIZES = {
    XS: { width: 16, height: 10 },
    SM: { width: 16, height: 16 },
    MD: { width: 20, height: 20 },
    LG: { width: 40, height: 40 },
    XL: { width: 100, height: 100 },
    LOGO: { width: 145, height: 30 },
} as const;

// Statistics (default placeholder values)
export const DEFAULT_STATS = {
    TOTAL_USERS: 2453,
    ACTIVE_USERS: 2453,
    USERS_WITH_LOANS: 12453,
    USERS_WITH_SAVINGS: 102453,
} as const;

// Statistics calculation multipliers
export const STATS_MULTIPLIERS = {
    ACTIVE_USERS_PERCENTAGE: 0.65,
    USERS_WITH_LOANS_PERCENTAGE: 0.35,
    USERS_WITH_SAVINGS_MULTIPLIER: 20.5,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
    USERS: 'users',
    CURRENT_USER: 'currentUser',
} as const;

// IndexedDB Configuration
export const INDEXED_DB = {
    NAME: 'lendsqr-db',
    VERSION: 1,
    STORE_NAME: 'users',
} as const;

// Routes
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    USERS: '/dashboard/users',
    USER_DETAILS: (id: string) => `/dashboard/users/${id}`,
} as const;

// Table Column Span
export const TABLE_COLUMNS = {
    USERS_TABLE_COL_SPAN: 7,
} as const;

// Tier Ratings
export const TIER_RATING = {
    MIN: 1,
    MAX: 5,
} as const;
