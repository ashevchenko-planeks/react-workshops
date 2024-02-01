export interface User {
    role: 'admin' | 'viewer';
    name: string;
    email: string;
    avatar: string;
}
