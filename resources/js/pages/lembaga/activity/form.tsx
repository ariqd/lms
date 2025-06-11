import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout'
import { Activity, BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengajuan Kegiatan BA / DA',
        href: '/activities',
    },
];

type ActivityForm = {
    type: 'ba' | 'da' | '';
    name: string;
    description: string;
    goals: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
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
    documents: string;
};

const ActivityCreate = ({ title, activity }: { title: string, activity?: Activity }) => {
    const [documents, setDocuments] = useState<File[]>([]);

    const { data, setData, post, processing, errors } = useForm<ActivityForm>({
        type: '',
        name: '',
        description: '',
        goals: '',
        start_date: '',
        end_date: '',
        participant_count: '',
        location: '',
        daily_schedule: '',
        total_budget: '0',
        additional_needs: '',
        additional_equipments: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        notes: '',
        registration_deadline: '',
        start_time: '',
        end_time: '',
        documents: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('lembaga.pelatihan.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title={title} description="Lengkapi formulir pengajuan pelatihan" />
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
                            <div className="grid gap-2">
                                <Label htmlFor="type">Program Pelatihan *</Label>
                                <Select value={data.type} onValueChange={(value: 'ba' | 'da') => setData('type', value)}>
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

                            <div className="grid gap-2">
                                <Label htmlFor="name">Judul Pelatihan *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan judul pelatihan"
                                    disabled={processing}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi Program *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan tujuan, target peserta, dan manfaat program pelatihan ini..."
                                    className="min-h-[120px]"
                                    disabled={processing}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="goals">Tujuan Pelatihan *</Label>
                                <Textarea
                                    id="goals"
                                    value={data.goals}
                                    onChange={(e) => setData('goals', e.target.value)}
                                    placeholder="Tulis tujuan pelatihan"
                                    disabled={processing}
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
                                    <Label htmlFor="start_date">Tanggal Mulai *</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.start_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="end_date">Tanggal Selesai *</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.end_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="participant_count">Deadline Pendaftaran *</Label>
                                    <Input
                                        id="registration_deadline"
                                        type="date"
                                        value={data.registration_deadline}
                                        onChange={(e) => setData('registration_deadline', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.registration_deadline} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start_time">Waktu Mulai *</Label>
                                    <Input
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.start_time} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="end_time">Waktu Selesai *</Label>
                                    <Input
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.end_time} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="participant_count">Jumlah Peserta *</Label>
                                    <Input
                                        id="participant_count"
                                        type="number"
                                        value={data.participant_count}
                                        onChange={(e) => setData('participant_count', e.target.value)}
                                        placeholder="20"
                                        disabled={processing}
                                    />
                                    <InputError message={errors.participant_count} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Lokasi/Venue Pelatihan *</Label>
                                <Textarea
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Nama tempat, alamat lengkap"
                                    disabled={processing}
                                />
                                <InputError message={errors.location} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="daily_schedule">Jadwal Harian *</Label>
                                <Textarea
                                    id="daily_schedule"
                                    value={data.daily_schedule}
                                    onChange={(e) => setData('daily_schedule', e.target.value)}
                                    placeholder="Contoh: Hari 1: 08:00-12:00 Materi A, 13:00-17:00 Materi B"
                                    className="min-h-[100px]"
                                    disabled={processing}
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
                                <Label htmlFor="total_budget">Total Anggaran *</Label>
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
                                        disabled={processing}
                                    />
                                </div>
                                <InputError message={errors.total_budget} />
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="additional_needs">Kebutuhan Tambahan *</Label>
                                <Textarea
                                    id="additional_needs"
                                    value={data.additional_needs}
                                    onChange={(e) => setData('additional_needs', e.target.value)}
                                    placeholder="Akomodasi, penginapan, transportasi, dll"
                                    className="min-h-[100px]"
                                    disabled={processing}
                                />
                                <InputError message={errors.additional_needs} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="additional_equipments">Kebutuhan Peralatan *</Label>
                                <Textarea
                                    id="additional_equipments"
                                    value={data.additional_equipments}
                                    onChange={(e) => setData('additional_equipments', e.target.value)}
                                    placeholder="Proyektor, sound system, flipchart, dll"
                                    className="min-h-[100px]"
                                    disabled={processing}
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
                                    <Label htmlFor="contact_name">Nama Penanggung Jawab *</Label>
                                    <Input
                                        id="contact_name"
                                        value={data.contact_name}
                                        onChange={(e) => setData('contact_name', e.target.value)}
                                        placeholder="PDM Kota Jakarta"
                                        disabled={processing}
                                    />
                                    <InputError message={errors.contact_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_phone">Nomor Telepon *</Label>
                                    <Input
                                        id="contact_phone"
                                        type="tel"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="+62271234567"
                                        disabled={processing}
                                    />
                                    <InputError message={errors.contact_phone} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_email">Email *</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="institution@example.com"
                                        disabled={processing}
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

                        {/* Multiple File Upload with Add button */}
                        <div className="grid gap-2">
                            <div className="grid grid-cols-12 gap-2">
                                <Input type="text" id="documents" value={data.documents} onChange={(e) => setData('documents', e.target.value)} placeholder="Masukkan nama dokumen" disabled={processing} className='col-span-5' />
                                <Input type="file" id="documents" multiple disabled={processing} className='cursor-pointer col-span-5' />
                                <Button type="button" variant="default" disabled={processing} className='bg-blue-600 hover:bg-blue-700 col-span-2' onClick={() => setDocuments([...documents, new File([], 'new-document.pdf')])}>
                                    Tambah Dokumen
                                </Button>
                            </div>
                            <InputError message={errors.documents} />
                        </div>
                        {documents.map((document, index) => (
                            <div className="grid gap-2 mt-5">
                                <div className="grid grid-cols-12 gap-2">
                                    <Input type="text" id="documents" value={data.documents} onChange={(e) => setData('documents', e.target.value)} placeholder="Masukkan nama dokumen" disabled={processing} className='col-span-5' />
                                    <Input type="file" id="documents" multiple disabled={processing} className='cursor-pointer col-span-5' />
                                    <Button type="button" variant="default" disabled={processing} className='bg-red-600 hover:bg-red-700 col-span-2' onClick={() => setDocuments(documents.filter((_, i) => i !== index))}>
                                        Hapus Dokumen
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* If see detail, show invoice section */}
                    {
                        activity && (
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                                        <span className="text-red-600 text-sm font-medium">📄</span>
                                    </div>
                                    <h3 className="text-lg font-semibold">Invoice</h3>
                                </div>

                                <div className="border rounded-lg p-4 bg-gray-50">
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

                                <div className="grid gap-2 mt-5">
                                    <label htmlFor="bukti_pembayaran" className='text-sm font-medium text-gray-900'>Upload Bukti Pembayaran</label>
                                    <div className="grid grid-cols-12 gap-2">
                                        <Input
                                            type="file"
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            disabled={processing}
                                            className='cursor-pointer col-span-5'
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Catatan (opsional)"
                                            disabled={processing}
                                            className='col-span-5'
                                        />
                                        <Button
                                            type="button"
                                            variant="default"
                                            disabled={processing}
                                            className='bg-blue-600 hover:bg-blue-700 col-span-2'
                                        >
                                            Upload Bukti Pembayaran
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Supports: PDF, PNG, JPG, JPEG (Max: 10MB)
                                    </p>
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
                        )
                    }

                    {/* Submit Buttons */}
                    <div className="flex justify-between gap-3 pt-6 border-t">
                        <Button type="button" variant="outline" disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                            Kirim Proposal
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}

export default ActivityCreate
