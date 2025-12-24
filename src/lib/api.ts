/**
 * API Service Module
 * 
 * Fetches user data from external mock API (npoint.io) with local fallback.
 * Implements caching, filtering, pagination, and error handling.
 */

import { User, UserStatus, UsersResponse, UserFilter, PaginationParams, UsersStatistics } from '@/lib/types';
import { DATA_GENERATION, PAGINATION, STATS_MULTIPLIERS } from './constants';
import {
    organizations,
    firstNames,
    lastNames,
    educationLevels,
    employmentStatuses,
    sectors,
    residenceTypes,
    relationships
} from './mock-data';


// API CONFIGURATION

const API_CONFIG = {
    BASE_URL: 'https://api.npoint.io/24eb0dde1623416ece94',
    TIMEOUT_MS: 10000,
    CACHE_DURATION_MS: 5 * 60 * 1000, // 5 minutes
} as const;

// CACHE MANAGEMENT

interface CacheEntry {
    data: User[];
    timestamp: number;
}

let usersCache: CacheEntry | null = null;

function isCacheValid(): boolean {
    if (!usersCache) return false;
    const now = Date.now();
    return now - usersCache.timestamp < API_CONFIG.CACHE_DURATION_MS;
}

function setCache(users: User[]): void {
    usersCache = {
        data: users,
        timestamp: Date.now(),
    };
}

function getCache(): User[] | null {
    if (isCacheValid()) {
        return usersCache!.data;
    }
    return null;
}

// API FETCH WITH TIMEOUT

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// EXTERNAL API FUNCTIONS

/**
 * Fetches all users from the external API
 * Falls back to local generation if API fails
 */
async function fetchUsersFromAPI(): Promise<User[]> {
    // Check cache first
    const cachedUsers = getCache();
    if (cachedUsers) {
        return cachedUsers;
    }

    try {
        const response = await fetchWithTimeout(API_CONFIG.BASE_URL, API_CONFIG.TIMEOUT_MS);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Handle both array format and { users: [] } format
        const users: User[] = Array.isArray(data) ? data : data.users || [];

        if (users.length === 0) {
            throw new Error('API returned empty data');
        }

        // Cache the results
        setCache(users);

        return users;
    } catch (error) {
        console.warn('Failed to fetch from external API, using local fallback:', error);
        return generateUsersLocally();
    }
}

// LOCAL FALLBACK GENERATION

function randomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function randomPhone(): string {
    const prefixes = ['080', '081', '070', '090', '091'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `${prefix}${number}`;
}

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): string {
    const amount = Math.floor(Math.random() * (max - min + 1)) + min;
    return `₦${amount.toLocaleString()}.00`;
}

function generateUser(id: number): User {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const organization = randomItem(organizations);

    const statusRandom = Math.random();
    let status: UserStatus;
    if (statusRandom < 0.4) status = 'Active';
    else if (statusRandom < 0.6) status = 'Inactive';
    else if (statusRandom < 0.85) status = 'Pending';
    else status = 'Blacklisted';

    return {
        id: `user-${id}`,
        organization,
        username: `${firstName.toLowerCase()}${id}`,
        email: `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase().slice(0, 3)}@${organization.toLowerCase().slice(0, 3)}.com`,
        phoneNumber: randomPhone(),
        dateJoined: randomDate(new Date(2015, 0, 1), new Date()),
        status,
        personalInfo: {
            fullName,
            phoneNumber: randomPhone(),
            emailAddress: `${firstName.toLowerCase()}@gmail.com`,
            bvn: Math.floor(Math.random() * 99999999999).toString().padStart(11, '0'),
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            maritalStatus: randomItem(['Single', 'Married', 'Divorced', 'Widowed']),
            children: randomItem(['None', '1', '2', '3', '4', '5+']),
            typeOfResidence: randomItem(residenceTypes),
        },
        educationAndEmployment: {
            levelOfEducation: randomItem(educationLevels),
            employmentStatus: randomItem(employmentStatuses),
            sectorOfEmployment: randomItem(sectors),
            durationOfEmployment: `${Math.floor(Math.random() * 15) + 1} years`,
            officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
            monthlyIncome: `${randomAmount(50000, 400000)} - ${randomAmount(400001, 900000)}`,
            loanRepayment: randomAmount(10000, 100000),
        },
        socials: {
            twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
            facebook: fullName,
            instagram: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        },
        guarantor: {
            fullName: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
            phoneNumber: randomPhone(),
            emailAddress: `${randomItem(firstNames).toLowerCase()}.${randomItem(lastNames).toLowerCase()}@gmail.com`,
            relationship: randomItem(relationships),
        },
        accountBalance: randomAmount(50000, 500000),
        accountNumber: Math.floor(Math.random() * 10000000000).toString().padStart(DATA_GENERATION.ACCOUNT_NUMBER_LENGTH, '0'),
        bankName: randomItem(['Providus Bank', 'GTBank', 'First Bank', 'UBA', 'Access Bank', 'Zenith Bank', 'Sterling Bank', 'Fidelity Bank']),
        userTier: Math.floor(Math.random() * 3) + 1,
    };
}

let localUsersCache: User[] | null = null;

function generateUsersLocally(): User[] {
    if (localUsersCache) return localUsersCache;
    localUsersCache = Array.from({ length: DATA_GENERATION.TOTAL_USERS }, (_, i) => generateUser(i + 1));
    return localUsersCache;
}

// PUBLIC API FUNCTIONS

/**
 * Fetches users with pagination and filtering
 * Primary: External API, Fallback: Local generation
 */
export async function getUsers(
    params?: PaginationParams,
    filters?: UserFilter
): Promise<UsersResponse> {
    let users = await fetchUsersFromAPI();

    // Apply filters
    if (filters) {
        if (filters.organization) {
            users = users.filter(u =>
                u.organization.toLowerCase().includes(filters.organization!.toLowerCase())
            );
        }
        if (filters.username) {
            users = users.filter(u =>
                u.username.toLowerCase().includes(filters.username!.toLowerCase())
            );
        }
        if (filters.email) {
            users = users.filter(u =>
                u.email.toLowerCase().includes(filters.email!.toLowerCase())
            );
        }
        if (filters.phoneNumber) {
            users = users.filter(u =>
                u.phoneNumber.includes(filters.phoneNumber!)
            );
        }
        if (filters.status) {
            users = users.filter(u => u.status === filters.status);
        }
        if (filters.date) {
            const filterDate = new Date(filters.date).toDateString();
            users = users.filter(u => {
                const userDate = new Date(u.dateJoined).toDateString();
                return userDate === filterDate;
            });
        }
    }

    const total = users.length;
    const page = params?.page || PAGINATION.DEFAULT_PAGE;
    const limit = params?.limit || PAGINATION.DEFAULT_LIMIT;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        users: users.slice(startIndex, endIndex),
        total,
        page,
        limit,
    };
}

/**
 * Fetches a single user by ID
 * Checks IndexedDB/localStorage first, then API
 */
export async function getUserById(id: string): Promise<User | null> {
    const users = await fetchUsersFromAPI();
    return users.find(u => u.id === id) || null;
}

/**
 * Returns list of unique organizations from user data for filter dropdown
 */
export async function getOrganizations(): Promise<string[]> {
    const users = await fetchUsersFromAPI();
    const uniqueOrgs = [...new Set(users.map(u => u.organization))];
    return uniqueOrgs.sort();
}

/**
 * Calculates user statistics from cached/fetched data
 */
export async function getUsersStatistics(): Promise<UsersStatistics> {
    const users = await fetchUsersFromAPI();
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const usersWithLoans = Math.floor(users.length * STATS_MULTIPLIERS.USERS_WITH_LOANS_PERCENTAGE * 10);
    const usersWithSavings = Math.floor(users.length * STATS_MULTIPLIERS.USERS_WITH_SAVINGS_MULTIPLIER);

    return {
        totalUsers: users.length.toLocaleString(),
        activeUsers: activeUsers.toLocaleString(),
        usersWithLoans: usersWithLoans.toLocaleString(),
        usersWithSavings: usersWithSavings.toLocaleString(),
    };
}

/**
 * Clears the API cache (useful for testing or manual refresh)
 */
export function clearCache(): void {
    usersCache = null;
    localUsersCache = null;
}
