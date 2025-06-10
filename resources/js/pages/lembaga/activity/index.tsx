import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Activity, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AlertComponent from '@/components/alert';
import { DataTable, DataTableColumnHeader } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { EyeIcon, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengajuan Kegiatan BA / DA',
        href: '/activities',
    },
];

interface PageProps {
    title: string;
    activities: Activity[];
}

export default function ActivityIndex({ title, activities }: PageProps) {
    const columns: ColumnDef<Activity>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "start_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Mulai" />
            ),
            cell: ({ row }) => {
                const date = row.getValue("start_date") as string;
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
        {
            accessorKey: "total_budget",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Budget" />
            ),
            cell: ({ row }) => <div>{row.getValue("total_budget")}</div>,
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
        {
            id: "actions",
            cell: ({ row }) => {
                return <div>
                    <Button>
                        <Link href={route('lembaga.pelatihan.show', row.original.id)}>
                            <EyeIcon className="w-4 h-4" />
                            <span className="sr-only">Lihat</span>
                        </Link>
                    </Button>
                </div>
            },
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={title} />
                    <Button asChild>
                        <Link href={route('lembaga.pelatihan.create')}>
                            <Plus className="w-4 h-4" />
                            <span>Buat Proposal Baru</span>
                        </Link>
                    </Button>
                </div>

                <AlertComponent />

                <DataTable
                    columns={columns}
                    data={activities}
                    searchKey="name"
                    searchPlaceholder="Cari pelatihan..."
                />
            </div>
        </AppLayout>
    );
}
