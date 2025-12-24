import { User } from '@/lib/types';

const DB_NAME = 'LendsqrDB';
const STORE_NAME = 'users';
const DB_VERSION = 1;

// Helper to promisify IndexedDB requests
const promisifyRequest = <T>(request: IDBRequest<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

class StorageService {
    private db: IDBDatabase | null = null;

    private async getDB(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        try {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };

            this.db = await promisifyRequest(request);
            return this.db;
        } catch (error) {
            throw new Error(`Failed to open database: ${error}`);
        }
    }

    async saveUser(user: User): Promise<void> {
        try {
            const db = await this.getDB();
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            await promisifyRequest(store.put(user));

            // Also save to localStorage as backup
            localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
        } catch (error) {
            // Fallback to localStorage only
            localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
            console.warn('IndexedDB not available, using localStorage:', error);
        }
    }

    async getUser(id: string): Promise<User | null> {
        try {
            const db = await this.getDB();
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);

            const result = await promisifyRequest(store.get(id));

            if (result) {
                return result;
            }

            // Try localStorage as fallback
            const localData = localStorage.getItem(`user_${id}`);
            return localData ? JSON.parse(localData) : null;
        } catch (error) {
            // Fallback to localStorage
            const localData = localStorage.getItem(`user_${id}`);
            return localData ? JSON.parse(localData) : null;
        }
    }

    async updateUserStatus(id: string, status: User['status']): Promise<void> {
        const user = await this.getUser(id);
        if (user) {
            user.status = status;
            await this.saveUser(user);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const db = await this.getDB();
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);

            return await promisifyRequest(store.getAll());
        } catch (error) {
            // Fallback: get all from localStorage
            const users: User[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('user_')) {
                    const data = localStorage.getItem(key);
                    if (data) users.push(JSON.parse(data));
                }
            }
            return users;
        }
    }

    async clearAll(): Promise<void> {
        try {
            // Close existing connection
            if (this.db) {
                this.db.close();
                this.db = null;
            }

            // Delete IndexedDB
            const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
            await promisifyRequest(deleteRequest);
        } catch (error) {
            console.warn('Failed to delete IndexedDB:', error);
        }

        // Clear localStorage user entries
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('user_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
}

export const storageService = new StorageService();
export default storageService;
