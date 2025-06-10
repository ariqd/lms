import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lembaga',
        href: '/institutions',
    },
];

interface PageProps {
    title: string;
}

export default function UsersIndex({ title }: PageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <Heading title={title} />
            </div>
        </AppLayout>
    );
}
