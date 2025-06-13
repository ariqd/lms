import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout'
import { Activity, BreadcrumbItem, DocumentItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Check, LoaderCircle, NotebookPen } from 'lucide-react';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import ActivityStatusBadge from '@/components/activity-status-badge';
import { formatFileSize, getFileName } from '@/utils/file';

type ActivityForm = {
    type: 'ba' | 'da' | '';
    name: string;
    description: string;
    goals: string;
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    participant_count: string;
    location: string;
    daily_schedule: string;
    total_budget: string;
    additional_needs: string;
    additional_equipments: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
    registration_deadline: string;
    documents: DocumentItem[];
};

const ActivityManagementForm = ({ breadcrumbs, activity }: { breadcrumbs: BreadcrumbItem[], activity: Activity }) => {
    const [checkboxes, setCheckboxes] = useState({
        dataPelatihan: false,
        dataDokumen: false,
        dokumenPembayaran: false,
    });

    const allCheckboxesChecked = checkboxes.dataPelatihan && checkboxes.dataDokumen && checkboxes.dokumenPembayaran;

    const { data, setData, processing, errors, put } = useForm<ActivityForm>('activity-form', {
        type: activity?.type || '',
        name: activity?.name || '',
        description: activity?.description || '',
        goals: activity?.goals || '',
        date_start: activity?.date_start || '',
        date_end: activity?.date_end || '',
        time_start: activity?.time_start || '',
        time_end: activity?.time_end || '',
        participant_count: activity?.participant_count?.toString() || '',
        location: activity?.location || '',
        daily_schedule: activity?.daily_schedule || '',
        total_budget: activity?.total_budget?.toString() || '0',
        additional_needs: activity?.additional_needs || '',
        additional_equipments: activity?.additional_equipments || '',
        contact_name: activity?.contact_name || '',
        contact_phone: activity?.contact_phone || '',
        contact_email: activity?.contact_email || '',
        notes: activity?.notes || '',
        registration_deadline: activity?.registration_deadline || '',
        documents: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleApproval = () => {
        put(route('admin.activity-management.update', {
            id: activity.id,
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Kegiatan" />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Detail Kegiatan" description="Verifikasi formulir pengajuan pelatihan" />
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Informasi Dasar Pelatihan */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-medium">📋</span>
                            </div>
                            <h3 className="text-lg font-semibold">Informasi Dasar Pelatihan</h3>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Program Pelatihan</Label>
                                    <Select value={data.type} onValueChange={(value: 'ba' | 'da') => setData('type', value)} disabled>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih program pelatihan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ba">Baitul Arqam (BA)</SelectItem>
                                            <SelectItem value="da">Darul Arqam (DA)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.type} />
                                </div>
                                <div className="grid gap-2 col-span-3">
                                    <Label htmlFor="name">Judul Pelatihan</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan judul pelatihan"
                                        disabled
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi Program</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan tujuan, target peserta, dan manfaat program pelatihan ini..."
                                    className="min-h-[120px]"
                                    disabled
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="goals">Tujuan Pelatihan</Label>
                                <Textarea
                                    id="goals"
                                    value={data.goals}
                                    onChange={(e) => setData('goals', e.target.value)}
                                    placeholder="Tulis tujuan pelatihan"
                                    disabled
                                />
                                <InputError message={errors.goals} />
                            </div>
                        </div>
                    </div>


                    {/* Jadwal dan Logistik */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                <span className="text-green-600 text-sm font-medium">📅</span>
                            </div>
                            <h3 className="text-lg font-semibold">Jadwal dan Logistik</h3>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="date_start">Tanggal Mulai</Label>
                                    <Input
                                        id="date_start"
                                        type="date"
                                        value={data.date_start}
                                        onChange={(e) => setData('date_start', e.target.value)}
                                        disabled
                                    />
                                    <InputError message={errors.date_start} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="date_end">Tanggal Selesai</Label>
                                    <Input
                                        id="date_end"
                                        type="date"
                                        value={data.date_end}
                                        onChange={(e) => setData('date_end', e.target.value)}
                                        disabled
                                    />
                                    <InputError message={errors.date_end} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="registration_deadline">Deadline Pendaftaran</Label>
                                    <Input
                                        id="registration_deadline"
                                        type="date"
                                        value={data.registration_deadline}
                                        onChange={(e) => setData('registration_deadline', e.target.value)}
                                        disabled
                                    />
                                    <InputError message={errors.registration_deadline} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="time_start">Waktu Mulai</Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        disabled
                                    />
                                    <InputError message={errors.time_start} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="time_end">Waktu Selesai</Label>
                                    <Input
                                        id="time_end"
                                        type="time"
                                        value={data.time_end}
                                        onChange={(e) => setData('time_end', e.target.value)}
                                        disabled
                                    />
                                    <InputError message={errors.time_end} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="participant_count">Jumlah Peserta</Label>
                                    <Input
                                        id="participant_count"
                                        type="number"
                                        value={data.participant_count}
                                        onChange={(e) => setData('participant_count', e.target.value)}
                                        placeholder="20"
                                        disabled
                                    />
                                    <InputError message={errors.participant_count} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Lokasi/Venue Pelatihan</Label>
                                <Textarea
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Nama tempat, alamat lengkap"
                                    disabled
                                />
                                <InputError message={errors.location} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="daily_schedule">Jadwal Harian</Label>
                                <Textarea
                                    id="daily_schedule"
                                    value={data.daily_schedule}
                                    onChange={(e) => setData('daily_schedule', e.target.value)}
                                    placeholder="Contoh: Hari 1: 08:00-12:00 Materi A, 13:00-17:00 Materi B"
                                    className="min-h-[100px]"
                                    disabled
                                />
                                <InputError message={errors.daily_schedule} />
                            </div>
                        </div>
                    </div>

                    {/* Anggaran dan Kebutuhan */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                                <span className="text-yellow-600 text-sm font-medium">💰</span>
                            </div>
                            <h3 className="text-lg font-semibold">Anggaran dan Kebutuhan</h3>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="total_budget">Total Anggaran</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">Rp</span>
                                    <Input
                                        id="total_budget"
                                        type="text"
                                        value={data.total_budget === '0' || data.total_budget === '' ? '' : formatCurrencyInput(data.total_budget)}
                                        onChange={(e) => {
                                            const rawValue = parseCurrencyInput(e.target.value);
                                            setData('total_budget', rawValue);
                                        }}
                                        className="pl-8"
                                        placeholder="0"
                                        disabled
                                    />
                                </div>
                                <InputError message={errors.total_budget} />
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="additional_needs">Kebutuhan Tambahan</Label>
                                <Textarea
                                    id="additional_needs"
                                    value={data.additional_needs}
                                    onChange={(e) => setData('additional_needs', e.target.value)}
                                    placeholder="Akomodasi, penginapan, transportasi, dll"
                                    className="min-h-[100px]"
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="additional_equipments">Kebutuhan Peralatan</Label>
                                <Textarea
                                    id="additional_equipments"
                                    value={data.additional_equipments}
                                    onChange={(e) => setData('additional_equipments', e.target.value)}
                                    placeholder="Proyektor, sound system, flipchart, dll"
                                    className="min-h-[100px]"
                                    disabled
                                />
                                <InputError message={errors.additional_equipments} />
                            </div>
                        </div>
                    </div>

                    {/* Informasi Kontak */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                                <span className="text-purple-600 text-sm font-medium">👤</span>
                            </div>
                            <h3 className="text-lg font-semibold">Informasi Kontak</h3>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="contact_name">Nama Penanggung Jawab</Label>
                                    <Input
                                        id="contact_name"
                                        value={data.contact_name}
                                        onChange={(e) => setData('contact_name', e.target.value)}
                                        placeholder="PDM Kota Jakarta"
                                        disabled
                                    />
                                    <InputError message={errors.contact_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_phone">Nomor Telepon</Label>
                                    <Input
                                        id="contact_phone"
                                        type="tel"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="+62271234567"
                                        disabled
                                    />
                                    <InputError message={errors.contact_phone} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_email">Email</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="institution@example.com"
                                        disabled
                                    />
                                    <InputError message={errors.contact_email} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dokumen Penunjang */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                                <span className="text-red-600 text-sm font-medium">📄</span>
                            </div>
                            <h3 className="text-lg font-semibold">Dokumen Penunjang</h3>
                        </div>

                        <div className="space-y-4">
                            {
                                activity.files.map((document, index) => (
                                    <div className="border rounded-lg p-4 bg-gray-50" key={index}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className='space-y-1'>
                                                    <p className="font-medium text-gray-900">{document.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {getFileName(document.file) || '-'}
                                                        {document.file instanceof File && ` (${formatFileSize(document.file.size)})`}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button className='bg-blue-600 hover:bg-blue-700 text-white' onClick={() => {
                                                if (document.file) {
                                                    window.open(document.file as string, '_blank');
                                                }
                                            }}>
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Invoice */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                                <span className="text-indigo-600 text-sm font-medium">🧾</span>
                            </div>
                            <h3 className="text-lg font-semibold">Invoice</h3>
                        </div>

                        <div className="grid gap-2">
                            <div className="grid grid-cols-12 gap-2">
                                <Input
                                    type="text"
                                    placeholder="Masukkan nama invoice"
                                    disabled={processing}
                                    className='col-span-5'
                                />
                                <Input
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    disabled={processing}
                                    className='cursor-pointer col-span-5'
                                />
                                <Button
                                    type="button"
                                    variant="default"
                                    disabled={processing}
                                    className='bg-blue-600 hover:bg-blue-700 col-span-2'
                                >
                                    Upload Invoice
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Supports: PDF, PNG, JPG, JPEG (Max: 10MB)
                            </p>
                        </div>

                        <div className="border rounded-lg p-4 bg-gray-50 mt-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <p className="font-medium text-gray-900">Nama Invoice</p>
                                        <p className="text-sm text-gray-500">invoice.pdf • 100 KB</p>
                                    </div>
                                </div>
                                {/* <Badge variant="outline">Uploaded</Badge> */}
                                <Button type="button" variant="default" disabled={processing} className='bg-blue-600 hover:bg-blue-700 col-span-2'>
                                    Download Invoice
                                </Button>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-gray-50 mt-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className='space-y-1'>
                                        <p className="font-medium text-gray-900">Bukti Pembayaran</p>
                                        <p className="text-sm text-gray-500">bukti-pembayaran.pdf • 100 KB</p>
                                        <p className="text-xs text-gray-500 mt-4">
                                            <div className="font-medium text-gray-900">Catatan:</div>
                                            <div className="text-gray-500">Bukti pembayaran kegiatan</div>
                                        </p>
                                    </div>
                                </div>
                                {/* <Badge variant="outline">Uploaded</Badge> */}
                                <Button type="button" variant="default" disabled={processing} className='bg-blue-600 hover:bg-blue-700 col-span-2'>
                                    Download Bukti Pembayaran
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-between gap-3 pt-6 border-t">
                        <Button type="button" variant="outline" disabled>
                            Batal
                        </Button>
                        <div className="flex items-center gap-2">
                            <ActivityStatusBadge status={activity.status} />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="default">
                                        {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                        <NotebookPen className="w-4 h-4 mr-2" />
                                        Catatan Pengajuan
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Catatan Pengajuan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Kirim catatan pengajuan kegiatan kepada Lembaga Pelatihan
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Textarea
                                            placeholder="Masukkan catatan pengajuan"
                                            className="min-h-[100px] resize-none"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.notes} />
                                    </div>
                                    {/* Riwayat Catatan */}
                                    <div className="space-y-4 h-40 overflow-y-auto">
                                        <div className="text-sm font-medium">
                                            Riwayat Catatan:
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">Admin</span>
                                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                                            <p className="text-gray-500">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                            </p>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button
                                                type="button"
                                                disabled={processing || !data.notes}
                                                className="bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
                                            >
                                                {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                                <Check className="w-4 h-4 mr-2" />
                                                Kirim Catatan
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            {
                                activity.status === 'pending' && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-green-700 hover:bg-green-800 text-white">
                                                {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                                <Check className="w-4 h-4 mr-2" />
                                                Setujui Kegiatan
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Verifikasi Kelengkapan Dokumen</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Pastikan semua dokumen telah diperiksa dan lengkap sebelum menyetujui kegiatan ini.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="dataPelatihan"
                                                        checked={checkboxes.dataPelatihan}
                                                        onCheckedChange={(checked) =>
                                                            setCheckboxes(prev => ({ ...prev, dataPelatihan: !!checked }))
                                                        }
                                                    />
                                                    <Label htmlFor="dataPelatihan">Data Pelatihan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="dataDokumen"
                                                        checked={checkboxes.dataDokumen}
                                                        onCheckedChange={(checked) =>
                                                            setCheckboxes(prev => ({ ...prev, dataDokumen: !!checked }))
                                                        }
                                                    />
                                                    <Label htmlFor="dataDokumen">Data Dokumen Penunjang</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="dokumenPembayaran"
                                                        checked={checkboxes.dokumenPembayaran}
                                                        onCheckedChange={(checked) =>
                                                            setCheckboxes(prev => ({ ...prev, dokumenPembayaran: !!checked }))
                                                        }
                                                    />
                                                    <Label htmlFor="dokumenPembayaran">Dokumen Pembayaran</Label>
                                                </div>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction asChild>
                                                    <Button
                                                        type="button"
                                                        onClick={handleApproval}
                                                        disabled={processing || !allCheckboxesChecked}
                                                        className="bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
                                                    >
                                                        {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                                        <Check className="w-4 h-4 mr-2" />
                                                        Setujui Kegiatan
                                                    </Button>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div >
        </AppLayout >
    )
}

export default memo(ActivityManagementForm)
