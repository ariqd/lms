import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Activity, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AlertComponent from '@/components/alert';
import { DataTable, DataTableColumnHeader } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { EyeIcon, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

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
            meta: { displayName: "Nama" },
        },
        {
            accessorFn: (row) => {
                const date = row.start_date;
                return date ? new Date(date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : '-';
            },
            id: "start_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Mulai" />
            ),
            cell: ({ row }) => <div>{row.getValue("start_date")}</div>,
            meta: { displayName: "Tanggal Mulai" },
        },
        {
            accessorKey: "total_budget",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Budget" />
            ),
            cell: ({ row }) => <div>{formatCurrency(row.getValue("total_budget") as string)}</div>,
            meta: { displayName: "Total Budget" },
        },
        {
            accessorFn: (row) => {
                const date = row.created_at;
                return date ? new Date(date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : '-';
            },
            id: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
            ),
            cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
            meta: { displayName: "Tanggal Dibuat" },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return <div>
                    <Button asChild>
                        <Link href={route('kader.pelatihan.show', row.original.id)}>
                            <EyeIcon className="w-4 h-4" />
                            <span>Detail</span>
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
                    enableGlobalFilter={true}
                    searchPlaceholder="Cari nama kegiatan atau informasi lainnya..."
                />
            </div>
        </AppLayout>
    );
}
