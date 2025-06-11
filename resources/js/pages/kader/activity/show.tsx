import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    MapPin,
    Users,
    Phone,
    Mail,
    User,
    FileText,
    Download,
    Users2,
    Plus
} from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengajuan Kegiatan BA / DA',
        href: '/activities',
    },
    {
        title: 'Detail Kegiatan',
        href: '#',
    },
];

type Activity = {
    id: number;
    type: 'ba' | 'da';
    name: string;
    description: string;
    goals: string;
    start_date: string;
    end_date: string;
    participant_count: number;
    location: string;
    daily_schedule: string;
    total_budget: number;
    additional_needs: string;
    additional_equipments: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    created_at: string;
    documents?: Array<{
        id: number;
        name: string;
        type: string;
        size: string;
        url: string;
    }>;
    invoice?: {
        number: string;
        amount: number;
        status: 'pending' | 'paid' | 'overdue';
        due_date: string;
    };
};

type Props = {
    activity: Activity;
};

const ActivityShow = ({ activity }: Props) => {

    const getTypeText = (type: string) => {
        return type === 'ba' ? 'Baitul Arqam (BA)' : 'Darul Arqam (DA)';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Kegiatan - ${activity.name}`} />
            <div className="px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <Heading
                        title="Detail Kegiatan"
                        description="Informasi lengkap kegiatan pelatihan"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informasi Dasar Pelatihan */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Informasi Dasar Pelatihan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nama Kegiatan</label>
                                        <p className="mt-1 text-lg font-semibold">{activity.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Program Pelatihan</label>
                                        <p className="mt-1 text-sm font-medium">{getTypeText(activity.type)}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Deskripsi Program</label>
                                    <p className="mt-1 text-sm leading-relaxed">{activity.description}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tujuan Pelatihan</label>
                                    <p className="mt-1 text-sm leading-relaxed">{activity.goals}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Jadwal dan Logistik */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    </div>
                                    Jadwal dan Logistik
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Tanggal Mulai</label>
                                            <p className="text-sm font-medium">{new Date(activity.start_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Tanggal Selesai</label>
                                            <p className="text-sm font-medium">{new Date(activity.end_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Users className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Waktu Mulai</label>
                                            <p className="text-sm font-medium">07.00 WIB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Users className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Waktu Selesai</label>
                                            <p className="text-sm font-medium">16.00 WIB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <MapPin className="w-4 h-4" />
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Lokasi/Venue Pelatihan</label>
                                        <p className="text-sm font-medium">{activity.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Jadwal Harian</label>
                                        <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{activity.daily_schedule}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dokumen Pendukung */}
                        {activity.documents && activity.documents.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-purple-600" />
                                        </div>
                                        Dokumen Pendukung
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {activity.documents.map((doc) => (
                                            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{doc.name}</p>
                                                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Informasi Kontak */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <User className="w-4 h-4 text-purple-600" />
                                    </div>
                                    Informasi Kontak
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Penanggung Jawab</label>
                                    <p className="mt-1 text-sm font-medium">{activity.contact_name}</p>
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">{activity.contact_phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">{activity.contact_email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Invoice Information */}
                        {activity.invoice && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-green-600" />
                                        </div>
                                        Invoice
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nomor Invoice</label>
                                        <p className="mt-1 text-sm font-mono">{activity.invoice.number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Total Pembayaran</label>
                                        <p className="mt-1 text-lg font-bold text-green-600">
                                            {formatCurrency(activity.invoice.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <p className="mt-1">
                                            <Badge className={
                                                activity.invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                    activity.invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }>
                                                {activity.invoice.status === 'paid' ? 'Lunas' :
                                                    activity.invoice.status === 'overdue' ? 'Terlambat' :
                                                        'Belum Dibayar'}
                                            </Badge>
                                        </p>
                                    </div>
                                    <Button className="w-full" size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Invoice
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Activity Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Timeline Kegiatan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center gap-3 p-5 bg-gray-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Deadline Pendaftaran</label>
                                            <p className="text-sm font-medium">10 Juni 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-5 bg-gray-50 rounded-lg">
                                        <Users2 className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Limit Peserta</label>
                                            <p className="text-sm font-medium">{activity.participant_count} orang</p>
                                        </div>
                                    </div>
                                    <Button className="w-full py-6 text-white bg-blue-600 hover:bg-blue-700">
                                        <Plus className="mr-2" size={24} />
                                        Daftar Pelatihan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default ActivityShow
