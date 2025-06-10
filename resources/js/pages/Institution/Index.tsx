import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AlertComponent from '@/components/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lembaga',
        href: '/institutions',
    },
];

interface PageProps {
    title: string;
    institutions: User[];
}

export default function InstitutionIndex({ title, institutions }: PageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={title} />
                    {/* <RoleCreate /> */}
                </div>

                <AlertComponent />

                <div className="mt-6">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {institutions.length > 0 ? (
                                    institutions.map((institution) => (
                                        <TableRow key={institution.id}>
                                            <TableCell className="font-medium">
                                                {institution.id}
                                            </TableCell>
                                            <TableCell>
                                                {institution.name}
                                            </TableCell>
                                            <TableCell>
                                                {institution.email}
                                            </TableCell>
                                            <TableCell>
                                                {institution.created_at ? new Date(institution.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-gray-700">
                                            Lembaga tidak ditemukan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
