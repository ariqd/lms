import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengajuan Kegiatan BA / DA',
        href: '/activities',
    },
];

const ActivityCreate = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengajuan Pelatihan BA/DA Baru" />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading title="Pengajuan Pelatihan BA/DA Baru" description="Lengkapi formulir pengajuan pelatihan" />
                </div>
            </div>
        </AppLayout>
    )
}

export default ActivityCreate