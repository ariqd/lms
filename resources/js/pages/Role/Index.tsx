import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { Role, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import RoleCreate from './Create';
import Heading from '@/components/heading';

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
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) {
            setShowSuccessAlert(true);
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">

                <div className="flex items-center justify-between">
                    <Heading title={title} />
                    <RoleCreate />
                </div>

                {showSuccessAlert && flash?.success && (
                    <div className="mt-4 bg-green-700 rounded-md">
                        <Alert>
                            <CheckCircle className="h-4 w-4 text-white" />
                            <AlertDescription className="text-white">
                                {flash.success}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

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
