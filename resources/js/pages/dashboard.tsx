import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    const descriptionText = useMemo(() => {
        return auth.user.role?.identity === 'kader' ? 'Perkembangan pelatihan Anda' : 'Ringkasan sistem manajemen pembelajaran'
    }, [auth]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Dashboard ${auth.user.role?.name}`} />
            <div className="px-4 py-6">
                <Heading
                    title={`Selamat Datang, ${auth.user.name}!`}
                    description={descriptionText}
                />
            </div>
        </AppLayout>
    );
}
