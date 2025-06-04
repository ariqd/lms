import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BarChart2, BookOpen, Building2, Calendar, FileText, Layers, LayoutGrid, LineChart, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { useMemo } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Program & Kelas',
        href: '/classes',
        icon: Layers,
    },
    {
        title: 'Pengguna',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Organisasi',
        href: '/organizations',
        icon: Building2,
    },
    {
        title: 'Materi & Tugas',
        href: '/materials',
        icon: BookOpen,
    },
    {
        title: 'Monitoring',
        href: '/monitoring',
        icon: BarChart2,
    },
    {
        title: 'Sertifikat',
        href: '/certificates',
        icon: Award,
    },
    {
        title: 'Laporan',
        href: '/reports',
        icon: FileText,
    },
];

const kaderNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Jadwal & Kehadiran',
        href: '/schedule',
        icon: Calendar,
    },
    {
        title: 'Materi & Kelas',
        href: '/materials',
        icon: BookOpen,
    },
    {
        title: 'Progress Belajar',
        href: '/progress',
        icon: LineChart,
    },
    {
        title: 'Sertifikat',
        href: '/my-certificates',
        icon: Award,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const isKader = useMemo(() => auth.user.role?.identity === 'kader', [auth]);

    const navigationItems = useMemo(() => isKader ? kaderNavItems : mainNavItems, [isKader]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navigationItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
