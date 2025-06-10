import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AlertComponent from '@/components/alert';
import { DataTable, DataTableColumnHeader } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import InstitutionCreate from './create';

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
    const columns: ColumnDef<User>[] = [
        {
            id: "no",
            header: "No",
            cell: ({ row }) => {
                return <div className="font-medium">{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="ID" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
            ),
            cell: ({ row }) => {
                const date = row.getValue("created_at") as string;
                return (
                    <div>
                        {date ? new Date(date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : '-'}
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={title} />
                    <InstitutionCreate />
                </div>

                <AlertComponent />

                <DataTable
                    columns={columns}
                    data={institutions}
                    searchKey="name"
                    searchPlaceholder="Cari lembaga..."
                />
            </div>
        </AppLayout>
    );
}
