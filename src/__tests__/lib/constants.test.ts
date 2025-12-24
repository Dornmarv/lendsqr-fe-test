/**
 * Unit tests for Constants
 * Tests both positive and negative scenarios
 */

import {
    PAGINATION,
    DATA_GENERATION,
    DELAYS,
    ICON_SIZES,
    DEFAULT_STATS,
    STATS_MULTIPLIERS,
    STORAGE_KEYS,
    INDEXED_DB,
    ROUTES,
    TABLE_COLUMNS,
    TIER_RATING,
} from '@/lib/constants';

describe('Constants', () => {
    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        describe('PAGINATION', () => {
            it('should have valid default page', () => {
                expect(PAGINATION.DEFAULT_PAGE).toBe(1);
            });

            it('should have valid default limit', () => {
                expect(PAGINATION.DEFAULT_LIMIT).toBe(10);
            });

            it('should have page size options', () => {
                expect(PAGINATION.PAGE_SIZE_OPTIONS).toEqual([10, 20, 50, 100]);
            });

            it('should include DEFAULT_LIMIT in PAGE_SIZE_OPTIONS', () => {
                expect(PAGINATION.PAGE_SIZE_OPTIONS).toContain(PAGINATION.DEFAULT_LIMIT);
            });
        });

        describe('DATA_GENERATION', () => {
            it('should have positive TOTAL_USERS', () => {
                expect(DATA_GENERATION.TOTAL_USERS).toBeGreaterThan(0);
            });

            it('should have valid API delay', () => {
                expect(DATA_GENERATION.SIMULATED_API_DELAY_MS).toBeGreaterThanOrEqual(0);
            });
        });

        describe('DELAYS', () => {
            it('should have positive login simulation delay', () => {
                expect(DELAYS.LOGIN_SIMULATION_MS).toBeGreaterThan(0);
            });

            it('should have positive API simulation delay', () => {
                expect(DELAYS.API_SIMULATION_MS).toBeGreaterThanOrEqual(0);
            });
        });

        describe('ICON_SIZES', () => {
            it('should have all size variants', () => {
                expect(ICON_SIZES).toHaveProperty('XS');
                expect(ICON_SIZES).toHaveProperty('SM');
                expect(ICON_SIZES).toHaveProperty('MD');
                expect(ICON_SIZES).toHaveProperty('LG');
                expect(ICON_SIZES).toHaveProperty('XL');
                expect(ICON_SIZES).toHaveProperty('LOGO');
            });

            it('should have width and height for each size', () => {
                Object.values(ICON_SIZES).forEach(size => {
                    expect(size).toHaveProperty('width');
                    expect(size).toHaveProperty('height');
                    expect(size.width).toBeGreaterThan(0);
                    expect(size.height).toBeGreaterThan(0);
                });
            });
        });

        describe('DEFAULT_STATS', () => {
            it('should have all required stat properties', () => {
                expect(DEFAULT_STATS).toHaveProperty('TOTAL_USERS');
                expect(DEFAULT_STATS).toHaveProperty('ACTIVE_USERS');
                expect(DEFAULT_STATS).toHaveProperty('USERS_WITH_LOANS');
                expect(DEFAULT_STATS).toHaveProperty('USERS_WITH_SAVINGS');
            });

            it('should have positive values', () => {
                expect(DEFAULT_STATS.TOTAL_USERS).toBeGreaterThan(0);
                expect(DEFAULT_STATS.ACTIVE_USERS).toBeGreaterThan(0);
            });
        });

        describe('ROUTES', () => {
            it('should have login route', () => {
                expect(ROUTES.LOGIN).toBe('/login');
            });

            it('should have dashboard route', () => {
                expect(ROUTES.DASHBOARD).toBe('/dashboard');
            });

            it('should have users route', () => {
                expect(ROUTES.USERS).toBe('/dashboard/users');
            });

            it('should generate correct user details route', () => {
                expect(ROUTES.USER_DETAILS('123')).toBe('/dashboard/users/123');
            });
        });

        describe('TABLE_COLUMNS', () => {
            it('should have users table column span', () => {
                expect(TABLE_COLUMNS.USERS_TABLE_COL_SPAN).toBe(7);
            });
        });

        describe('TIER_RATING', () => {
            it('should have valid min and max', () => {
                expect(TIER_RATING.MIN).toBeLessThan(TIER_RATING.MAX);
            });
        });
    });

    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        describe('PAGINATION', () => {
            it('should NOT have negative default page', () => {
                expect(PAGINATION.DEFAULT_PAGE).not.toBeLessThan(1);
            });

            it('should NOT have negative default limit', () => {
                expect(PAGINATION.DEFAULT_LIMIT).not.toBeLessThan(1);
            });

            it('should NOT have empty page size options', () => {
                expect(PAGINATION.PAGE_SIZE_OPTIONS.length).not.toBe(0);
            });
        });

        describe('STORAGE_KEYS', () => {
            it('should NOT have empty string keys', () => {
                expect(STORAGE_KEYS.USERS.length).toBeGreaterThan(0);
                expect(STORAGE_KEYS.CURRENT_USER.length).toBeGreaterThan(0);
            });
        });

        describe('INDEXED_DB', () => {
            it('should NOT have empty database name', () => {
                expect(INDEXED_DB.NAME.length).toBeGreaterThan(0);
            });

            it('should NOT have zero or negative version', () => {
                expect(INDEXED_DB.VERSION).toBeGreaterThan(0);
            });
        });

        describe('ROUTES', () => {
            it('should NOT have routes without leading slash', () => {
                expect(ROUTES.LOGIN).toMatch(/^\//);
                expect(ROUTES.DASHBOARD).toMatch(/^\//);
                expect(ROUTES.USERS).toMatch(/^\//);
            });

            it('should NOT have routes with trailing slash', () => {
                expect(ROUTES.LOGIN).not.toMatch(/\/$/);
                expect(ROUTES.DASHBOARD).not.toMatch(/\/$/);
            });
        });

        describe('STATS_MULTIPLIERS', () => {
            it('should NOT have negative percentages', () => {
                expect(STATS_MULTIPLIERS.ACTIVE_USERS_PERCENTAGE).toBeGreaterThanOrEqual(0);
                expect(STATS_MULTIPLIERS.USERS_WITH_LOANS_PERCENTAGE).toBeGreaterThanOrEqual(0);
            });

            it('should NOT have percentage greater than 1 for actual percentages', () => {
                expect(STATS_MULTIPLIERS.ACTIVE_USERS_PERCENTAGE).toBeLessThanOrEqual(1);
                expect(STATS_MULTIPLIERS.USERS_WITH_LOANS_PERCENTAGE).toBeLessThanOrEqual(1);
            });
        });
    });
});
