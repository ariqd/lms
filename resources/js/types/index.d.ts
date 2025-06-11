import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash?: {
        success?: string;
        danger?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role_id: number; // Assuming role_id is still present
    role: Role | null; // Role can be an object or null if not set/loaded
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    identity: string;
    created_at?: string;
    updated_at?: string;
}

export interface Activity {
    id?: number;
    type: 'ba' | 'da' | '';
    name: string;
    description: string;
    goals: string;
    start_date: string;
    end_date: string;
    participant_count: number;
    location: string;
    total_budget: number;
    daily_schedule: string;
    additional_needs: string;
    additional_equipments: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
    is_approved: boolean;
    user_id: number;
    user: User;
    created_at?: string;
    updated_at?: string;
}
