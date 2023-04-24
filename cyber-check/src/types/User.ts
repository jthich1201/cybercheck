export interface User {
    userId: string;
    name: string;
    email: string;
    platform: string;
    platformId: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserList {
    user_id: string;
    name: string;
    email: string;
    platform: string;
    platform_id: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

