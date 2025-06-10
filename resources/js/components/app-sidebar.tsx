import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BarChart2, BookOpen, Building2, Calendar, Camera, CreditCard, File, FileText, Layers, LayoutGrid, LineChart, Monitor, User, Users } from 'lucide-react';
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

const userNavItems: NavItem[] = [
    {
        title: 'Manajemen Kader',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Manajemen Lembaga',
        href: '/institutions',
        icon: Building2,
    },
    {
        title: 'Manajemen Role',
        href: '/roles',
        icon: Building2,
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

const lembagaNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Profil Lembaga',
        href: '/profile',
        icon: User,
    },
    {
        title: 'Pengajuan BA / DA',
        href: '/profile',
        icon: File,
    },
    {
        title: 'Manajemen Peserta',
        href: '/profile',
        icon: Users,
    },
    {
        title: 'Administrasi Pembayaran',
        href: '/profile',
        icon: CreditCard,
    },
    {
        title: 'Monitoring Progress',
        href: '/profile',
        icon: Monitor,
    },
    {
        title: 'Dokumentasi Kegiatan',
        href: '/profile',
        icon: Camera,
    },
    {
        title: 'Sertifikat & Laporan',
        href: '/profile',
        icon: Award,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const isAdmin = useMemo(() => auth.user.role?.identity === 'admin' || auth.user.role?.identity === 'superadmin', [auth]);
    const isKader = useMemo(() => auth.user.role?.identity === 'kader', [auth]);
    const isLembaga = useMemo(() => auth.user.role?.identity === 'lembaga', [auth]);

    const navigationItems = useMemo(() => {
        if (isKader) return kaderNavItems;
        if (isLembaga) return lembagaNavItems;
        return mainNavItems;
    }, [isKader, isLembaga]);

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

            <SidebarContent className='mt-4'>
                <NavMain items={navigationItems} />
                {isAdmin && <NavMain items={userNavItems} label="Pengguna" />}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
