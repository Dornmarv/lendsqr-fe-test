export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
    id: string;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: UserStatus;
    personalInfo: PersonalInfo;
    educationAndEmployment: EducationAndEmployment;
    socials: Socials;
    guarantor: Guarantor;
    accountBalance: string;
    accountNumber: string;
    bankName: string;
    userTier: number;
}

export interface PersonalInfo {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
}

export interface EducationAndEmployment {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
}

export interface Socials {
    twitter: string;
    facebook: string;
    instagram: string;
}

export interface Guarantor {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
}

// Get users API Response Types
export interface UsersResponse {
    users: User[];
    total: number;
    page: number;
    limit: number;
}

// Filter Types
export interface UserFilter {
    organization?: string;
    username?: string;
    email?: string;
    date?: string;
    phoneNumber?: string;
    status?: UserStatus | '';
}

// Pagination Types
export interface PaginationParams {
    page: number;
    limit: number;
}

// Statistics Card Types
export interface StatCard {
    title: string;
    value: string | number;
    icon: string;
    iconBgColor: string;
}

// Users Statistics Types
export interface UsersStatistics {
    totalUsers: string;
    activeUsers: string;
    usersWithLoans: string;
    usersWithSavings: string;
}

// Sort Configuration Types
export type SortDirection = 'asc' | 'desc';

export type SortableUserField = 'username' | 'email' | 'organization' | 'phoneNumber' | 'dateJoined' | 'status';

export interface SortConfig {
    field: SortableUserField | null;
    direction: SortDirection;
}

