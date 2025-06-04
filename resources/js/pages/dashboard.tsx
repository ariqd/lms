import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto max-w-7xl space-y-6 p-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Selamat Datang, {auth.user.name}!</h1>
                    <p className="mt-1 text-gray-600">Perkembangan pelatihan Anda</p>
                </div>
            </div>
        </AppLayout>
    );
}
