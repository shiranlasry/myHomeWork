// Type definitions for damaged

interface User{
    id: number;
    FullName: string;
    age: number;
    interestSubject?: string[];
    email?: string;
    password: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}