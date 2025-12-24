/**
 * Unit tests for API utility functions
 * Tests both positive and negative scenarios
 */

import {
    getUsers,
    getUserById,
    getOrganizations,
    getUsersStatistics,
    clearCache,
} from '@/lib/api';
import { User } from '@/lib/types';

// Mock fetch for API tests
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Utility Functions', () => {
    beforeEach(() => {
        // Clear cache before each test
        clearCache();
        mockFetch.mockClear();
    });

    // getUsers
    describe('getUsers', () => {
        beforeEach(() => {
            // Mock successful API response
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    users: Array.from({ length: 500 }, (_, i) => ({
                        id: `user-${i + 1}`,
                        organization: 'TestOrg',
                        username: `user${i + 1}`,
                        email: `user${i + 1}@test.com`,
                        phoneNumber: '08012345678',
                        dateJoined: 'Jan 1, 2024',
                        status: i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Inactive' : i % 4 === 2 ? 'Pending' : 'Blacklisted',
                        personalInfo: {
                            fullName: `User ${i + 1}`,
                            phoneNumber: '08012345678',
                            emailAddress: `user${i + 1}@gmail.com`,
                            bvn: '12345678901',
                            gender: 'Male',
                            maritalStatus: 'Single',
                            children: 'None',
                            typeOfResidence: "Parent's Apartment",
                        },
                        educationAndEmployment: {
                            levelOfEducation: 'B.Sc',
                            employmentStatus: 'Employed',
                            sectorOfEmployment: 'FinTech',
                            durationOfEmployment: '2 years',
                            officeEmail: `user${i + 1}@company.com`,
                            monthlyIncome: '₦200,000.00 - ₦400,000.00',
                            loanRepayment: '₦40,000.00',
                        },
                        socials: {
                            twitter: '@user',
                            facebook: 'User',
                            instagram: '@user',
                        },
                        guarantor: {
                            fullName: 'Guarantor',
                            phoneNumber: '08012345678',
                            emailAddress: 'guarantor@gmail.com',
                            relationship: 'Friend',
                        },
                        accountBalance: '₦200,000.00',
                        accountNumber: '1234567890',
                        bankName: 'Test Bank',
                        userTier: 2,
                    })),
                    total: 500,
                    page: 1,
                    limit: 10,
                }),
            });
        });

        describe('Positive Scenarios', () => {
            it('should return paginated users with default params', async () => {
                const result = await getUsers();

                expect(result).toHaveProperty('users');
                expect(result).toHaveProperty('total');
                expect(result).toHaveProperty('page');
                expect(result).toHaveProperty('limit');
                expect(result.page).toBe(1);
                expect(result.limit).toBe(10);
            });

            it('should respect pagination parameters', async () => {
                const result = await getUsers({ page: 2, limit: 20 });

                expect(result.page).toBe(2);
                expect(result.limit).toBe(20);
                expect(result.users.length).toBeLessThanOrEqual(20);
            });

            it('should filter by organization', async () => {
                const allUsers = await getUsers();
                const org = allUsers.users[0]?.organization;

                if (org) {
                    const filtered = await getUsers({}, { organization: org });
                    filtered.users.forEach((user: User) => {
                        expect(user.organization.toLowerCase()).toContain(org.toLowerCase());
                    });
                }
            });

            it('should filter by status', async () => {
                const result = await getUsers({}, { status: 'Active' });

                result.users.forEach((user: User) => {
                    expect(user.status).toBe('Active');
                });
            });

            it('should filter by email (partial match)', async () => {
                const result = await getUsers({}, { email: '@' });

                result.users.forEach((user: User) => {
                    expect(user.email).toContain('@');
                });
            });
        });

        describe('Negative Scenarios', () => {
            it('should return empty users array when no matches found', async () => {
                const result = await getUsers({}, {
                    email: 'nonexistent-email-that-will-never-match@xyz.abc'
                });

                expect(result.users).toHaveLength(0);
                expect(result.total).toBe(0);
            });

            it('should handle page beyond total pages gracefully', async () => {
                const result = await getUsers({ page: 9999, limit: 10 });

                expect(result.users).toHaveLength(0);
                expect(result.page).toBe(9999);
            });

            it('should handle empty filter object', async () => {
                const result = await getUsers({}, {});

                expect(result.users.length).toBeGreaterThan(0);
            });
        });
    });

    // getUserById
    describe('getUserById', () => {
        beforeEach(() => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    users: [
                        {
                            id: 'user-1',
                            organization: 'TestOrg',
                            username: 'testuser',
                            email: 'test@test.com',
                            phoneNumber: '08012345678',
                            dateJoined: 'Jan 1, 2024',
                            status: 'Active',
                            personalInfo: {
                                fullName: 'Test User',
                                phoneNumber: '08012345678',
                                emailAddress: 'test@gmail.com',
                                bvn: '12345678901',
                                gender: 'Male',
                                maritalStatus: 'Single',
                                children: 'None',
                                typeOfResidence: "Parent's Apartment",
                            },
                            educationAndEmployment: {
                                levelOfEducation: 'B.Sc',
                                employmentStatus: 'Employed',
                                sectorOfEmployment: 'FinTech',
                                durationOfEmployment: '2 years',
                                officeEmail: 'test@company.com',
                                monthlyIncome: '₦200,000.00 - ₦400,000.00',
                                loanRepayment: '₦40,000.00',
                            },
                            socials: {
                                twitter: '@user',
                                facebook: 'User',
                                instagram: '@user',
                            },
                            guarantor: {
                                fullName: 'Guarantor',
                                phoneNumber: '08012345678',
                                emailAddress: 'guarantor@gmail.com',
                                relationship: 'Friend',
                            },
                            accountBalance: '₦200,000.00',
                            accountNumber: '1234567890',
                            bankName: 'Test Bank',
                            userTier: 2,
                        },
                    ],
                }),
            });
        });

        describe('Positive Scenarios', () => {
            it('should return a user when valid ID is provided', async () => {
                const user = await getUserById('user-1');

                expect(user).not.toBeNull();
                expect(user?.id).toBe('user-1');
            });

            it('should return complete user object with all properties', async () => {
                const user = await getUserById('user-1');

                expect(user).toHaveProperty('id');
                expect(user).toHaveProperty('personalInfo');
                expect(user).toHaveProperty('educationAndEmployment');
                expect(user).toHaveProperty('socials');
                expect(user).toHaveProperty('guarantor');
            });
        });

        describe('Negative Scenarios', () => {
            it('should return null for non-existent ID', async () => {
                const user = await getUserById('non-existent-id-12345');

                expect(user).toBeNull();
            });

            it('should return null for empty string ID', async () => {
                const user = await getUserById('');

                expect(user).toBeNull();
            });

            it('should handle special characters in ID', async () => {
                const user = await getUserById('<script>alert("xss")</script>');

                expect(user).toBeNull();
            });
        });
    });

    // getOrganizations
    describe('getOrganizations', () => {
        beforeEach(() => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    users: Array.from({ length: 50 }, (_, i) => ({
                        id: `user-${i + 1}`,
                        organization: ['Lendsqr', 'Irorun', 'MoneyWise', 'CreditPro'][i % 4],
                        status: 'Active',
                    })),
                }),
            });
        });

        describe('Positive Scenarios', () => {
            it('should return an array of organizations', async () => {
                const orgs = await getOrganizations();

                expect(Array.isArray(orgs)).toBe(true);
                expect(orgs.length).toBeGreaterThan(0);
            });

            it('should return strings only', async () => {
                const orgs = await getOrganizations();

                orgs.forEach((org: string) => {
                    expect(typeof org).toBe('string');
                });
            });

            it('should return sorted organizations', async () => {
                const orgs = await getOrganizations();
                const sorted = [...orgs].sort();
                expect(orgs).toEqual(sorted);
            });
        });

        describe('Negative Scenarios', () => {
            it('should not return empty array', async () => {
                const orgs = await getOrganizations();
                expect(orgs.length).not.toBe(0);
            });

            it('should not contain empty strings', async () => {
                const orgs = await getOrganizations();
                orgs.forEach((org: string) => {
                    expect(org.trim().length).toBeGreaterThan(0);
                });
            });
        });
    });

    // getUsersStatistics
    describe('getUsersStatistics', () => {
        beforeEach(() => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    users: Array.from({ length: 100 }, (_, i) => ({
                        id: `user-${i + 1}`,
                        status: i % 4 === 0 ? 'Active' : 'Inactive',
                    })),
                }),
            });
        });

        describe('Positive Scenarios', () => {
            it('should return statistics object with required properties', async () => {
                const stats = await getUsersStatistics();

                expect(stats).toHaveProperty('totalUsers');
                expect(stats).toHaveProperty('activeUsers');
                expect(stats).toHaveProperty('usersWithLoans');
                expect(stats).toHaveProperty('usersWithSavings');
            });

            it('should return formatted string values', async () => {
                const stats = await getUsersStatistics();

                expect(typeof stats.totalUsers).toBe('string');
                expect(typeof stats.activeUsers).toBe('string');
            });

            it('should return non-zero values', async () => {
                const stats = await getUsersStatistics();

                expect(parseInt(stats.totalUsers.replace(/,/g, ''))).toBeGreaterThan(0);
            });
        });

        describe('Negative Scenarios', () => {
            it('should not return undefined properties', async () => {
                const stats = await getUsersStatistics();

                expect(stats.totalUsers).not.toBeUndefined();
                expect(stats.activeUsers).not.toBeUndefined();
                expect(stats.usersWithLoans).not.toBeUndefined();
                expect(stats.usersWithSavings).not.toBeUndefined();
            });

            it('should not return negative values in string format', async () => {
                const stats = await getUsersStatistics();

                expect(stats.totalUsers).not.toMatch(/^-/);
                expect(stats.activeUsers).not.toMatch(/^-/);
            });
        });
    });
});
