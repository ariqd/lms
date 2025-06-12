import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Activity, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AlertComponent from '@/components/alert';
import { DataTable, DataTableColumnHeader } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EyeIcon, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { transformStatus } from '@/utils/transformers';
import ActivityStatusBadge from '@/components/activity-status-badge';

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
                <DataTableColumnHeader column={column} title="Judul Pelatihan" />
            ),
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
            meta: { displayName: "Judul Pelatihan" },
        },
        {
            accessorFn: (row) => {
                return row.type === 'ba' ? 'Baitul Arqam' : 'Darul Arqam';
            },
            id: "type",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Program" />
            ),
            cell: ({ row }) => <Badge variant={row.original.type === 'ba' ? 'default' : 'secondary'}>{row.getValue("type")}</Badge>,
            meta: { displayName: "Program" },
        },
        {
            accessorFn: (row) => {
                const date = row.date_start;
                return date ? new Date(date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : '-';
            },
            id: "date_start",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Mulai" />
            ),
            cell: ({ row }) => <div>{row.getValue("date_start")}</div>,
            meta: { displayName: "Tanggal Mulai" },
        },
        {
            accessorKey: "total_budget",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Anggaran" />
            ),
            cell: ({ row }) => <div>{formatCurrency(row.getValue("total_budget") as string)}</div>,
            meta: { displayName: "Total Anggaran" },
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
            accessorFn: (row) => {
                return transformStatus(row.status);
            },
            id: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => <ActivityStatusBadge status={row.getValue("status")} />,
            meta: { displayName: "Status" },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return <div>
                    <Button asChild>
                        <Link href={route('lembaga.pelatihan.show', row.original.id)}>
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
                    searchPlaceholder="Cari judul pelatihan atau informasi lainnya..."
                />
            </div>
        </AppLayout>
    );
}
