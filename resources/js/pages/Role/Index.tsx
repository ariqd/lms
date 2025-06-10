import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Role, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import RoleCreate from './Create';
import Heading from '@/components/heading';
import AlertComponent from '@/components/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role',
        href: '/roles',
    },
];

interface PageProps {
    title: string;
    roles: Role[];
}

export default function RoleIndex({ title, roles }: PageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">

                <div className="flex items-center justify-between">
                    <Heading title={title} />
                    <RoleCreate />
                </div>

                <AlertComponent />

                <div className="mt-6">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Identity</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.length > 0 ? (
                                    roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="font-medium">
                                                {role.id}
                                            </TableCell>
                                            <TableCell>
                                                {role.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {role.identity}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {role.created_at ? new Date(role.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No roles found.
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
