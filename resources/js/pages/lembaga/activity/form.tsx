import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout'
import { Activity, BreadcrumbItem, DocumentItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { CalendarIcon, LoaderCircle, Trash2, Plus } from 'lucide-react';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatFileSize, getFileName, isValidFileType } from '@/utils/file';

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

type PageProps = {
    title: string;
    activity?: Activity;
    breadcrumbs: BreadcrumbItem[];
    description: string;
}

const ActivityCreate = ({ title, activity, breadcrumbs, description }: PageProps) => {
    const { errors: updateErrors } = usePage().props

    const { data, setData, post, processing, errors: createErrors } = useForm({
        type: activity?.type || '',
        name: activity?.name || '',
        description: activity?.description || '',
        goals: activity?.goals || '',
        date_start: activity?.date_start || '',
        date_end: activity?.date_end || '',
        time_start: activity?.time_start || '',
        time_end: activity?.time_end || '',
        participant_count: activity?.participant_count || '',
        location: activity?.location || '',
        daily_schedule: activity?.daily_schedule || '',
        total_budget: activity?.total_budget || '0',
        additional_needs: activity?.additional_needs || '',
        additional_equipments: activity?.additional_equipments || '',
        contact_name: activity?.contact_name || '',
        contact_phone: activity?.contact_phone || '',
        contact_email: activity?.contact_email || '',
        notes: activity?.notes || '',
        registration_deadline: activity?.registration_deadline || '',
        documents: (activity as Activity & { files?: DocumentItem[] })?.files?.map(file => ({
            id: file.id?.toString() || Date.now().toString(),
            name: file.name,
            file: file.file // This will be the file path string for existing files
        })) || [
                { id: Date.now().toString(), name: '', file: null }
            ],
    } as ActivityForm);

    const addDocument = () => {
        setData('documents', [...data.documents, { id: Date.now().toString(), name: '', file: null }]);
    };

    const removeDocument = (id: string) => {
        if (data.documents.length > 1) {
            setData('documents', data.documents.filter(doc => doc.id !== id));
        }
    };

    const updateDocumentName = (id: string, name: string) => {
        setData('documents', data.documents.map(doc =>
            doc.id === id ? { ...doc, name } : doc
        ));
    };

    const updateDocumentFile = (id: string, file: File | null) => {
        setData('documents', data.documents.map(doc =>
            doc.id === id ? { ...doc, file } : doc
        ));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (activity) {
            router.post(route('lembaga.pelatihan.update', activity.id), {
                _method: 'put',
                ...data,
            });
        } else {
            post(route('lembaga.pelatihan.store'));
        }
    };

    console.log('data', data);

    const errors = activity ? updateErrors : createErrors;

    console.log('errors', errors);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title={title} description={description} />
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
                                <div className="grid gap-2 col-span-3">
                                    <Label htmlFor="name">Judul Pelatihan</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan judul pelatihan"
                                        disabled={processing}
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
                                    disabled={processing}
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
                                    <Label htmlFor="date_start">Tanggal Mulai</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!data.date_start}
                                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.date_start ? format(new Date(data.date_start + 'T00:00:00'), "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                locale={id}
                                                selected={data.date_start ? new Date(data.date_start + 'T00:00:00') : undefined}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        const year = date.getFullYear();
                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        setData('date_start', `${year}-${month}-${day}`);
                                                    }
                                                }}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <InputError message={errors.date_start} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="date_end">Tanggal Selesai</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!data.date_end}
                                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.date_end ? format(new Date(data.date_end + 'T00:00:00'), "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                locale={id}
                                                selected={data.date_end ? new Date(data.date_end + 'T00:00:00') : undefined}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        const year = date.getFullYear();
                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        setData('date_end', `${year}-${month}-${day}`);
                                                    }
                                                }}
                                                disabled={(date) => {
                                                    const today = new Date(new Date().setHours(0, 0, 0, 0));
                                                    const startDate = data.date_start ? new Date(data.date_start + 'T00:00:00') : null;
                                                    return date < today || (startDate ? date < startDate : false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <InputError message={errors.date_end} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="registration_deadline">Deadline Pendaftaran</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!data.registration_deadline}
                                                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.registration_deadline ? format(new Date(data.registration_deadline + 'T00:00:00'), "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                locale={id}
                                                selected={data.registration_deadline ? new Date(data.registration_deadline + 'T00:00:00') : undefined}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        const year = date.getFullYear();
                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        setData('registration_deadline', `${year}-${month}-${day}`);
                                                    }
                                                }}
                                                disabled={(date) => {
                                                    const today = new Date(new Date().setHours(0, 0, 0, 0));
                                                    const startDate = data.date_start ? new Date(data.date_start + 'T00:00:00') : null;
                                                    return date < today || (startDate ? date >= startDate : false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
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
                                        disabled={processing}
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
                                        disabled={processing}
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
                                        disabled={processing}
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
                                    disabled={processing}
                                    maxLength={255}
                                />
                                <div className="flex justify-between items-center">
                                    <InputError message={errors.location} />
                                    <span className="text-xs text-gray-500">
                                        {data.location.length}/255 karakter
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="daily_schedule">Jadwal Harian</Label>
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
                                        disabled={processing}
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
                                    disabled={processing}
                                />
                                <InputError message={errors.additional_needs} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="additional_equipments">Kebutuhan Peralatan</Label>
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
                                    <Label htmlFor="contact_name">Nama Penanggung Jawab</Label>
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
                                    <Label htmlFor="contact_phone">Nomor Telepon</Label>
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
                                    <Label htmlFor="contact_email">Email</Label>
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

                        <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">📋 Petunjuk Upload Dokumen:</span>
                                </p>
                                <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                                    <li>Upload dokumen pendukung seperti detail pelatihan, RAB, surat rekomendasi, dll.</li>
                                    <li>Format yang didukung: <span className="font-medium">PDF, PNG, JPG, JPEG</span></li>
                                    <li>Ukuran maksimal: <span className="font-medium">10MB per file</span></li>
                                    {activity && <li>Update dokumen yang sudah diupload dengan mengubah nama dokumen dan/atau mengupload ulang file dokumen.</li>}
                                    {activity && <li>Dokumen akan terupdate setelah tombol <span className="font-medium">Simpan Perubahan</span> ditekan.</li>}
                                </ul>
                            </div>

                            {data.documents.map((document, index) => (
                                <div key={document.id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Document Name Input */}
                                        <div>
                                            <Label htmlFor={`doc-name-${document.id}`} className="text-sm font-medium">
                                                Nama Dokumen #{index + 1}
                                            </Label>
                                            <Input
                                                id={`doc-name-${document.id}`}
                                                type="text"
                                                value={document.name}
                                                onChange={(e) => updateDocumentName(document.id, e.target.value)}
                                                placeholder="Contoh: Proposal Kegiatan"
                                                disabled={processing}
                                                className="mt-1 bg-white"
                                            />
                                            <InputError message={errors && errors[`documents.${index}.name` as keyof typeof errors]} />
                                        </div>

                                        {/* File Upload Area */}
                                        <div>
                                            <Label className="text-sm font-medium">
                                                {document.file ? 'Ganti' : 'Upload'} File Dokumen
                                            </Label>
                                            <div className="mt-1">
                                                <Input
                                                    id={`doc-file-${document.id}`}
                                                    type="file"
                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        if (file && !isValidFileType(file)) {
                                                            alert('Tipe file tidak didukung. Hanya PDF, PNG, JPG, dan JPEG yang diizinkan.');
                                                            e.target.value = '';
                                                            return;
                                                        }
                                                        if (file && file.size > 10 * 1024 * 1024) {
                                                            alert('Ukuran file terlalu besar. Maksimal 10MB.');
                                                            e.target.value = '';
                                                            return;
                                                        }
                                                        updateDocumentFile(document.id, file);
                                                    }}
                                                    disabled={processing}
                                                    className="cursor-pointer col-span-8 bg-white"
                                                />
                                                <InputError message={errors && errors[`documents.${index}.file` as keyof typeof errors]} />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Format: PDF, PNG, JPG, JPEG (Max: 10MB)
                                            </p>
                                        </div>

                                        <div>
                                            <Label className="text-sm ml-2">
                                                File Dokumen:
                                                <span className="text-green-600 ml-1">
                                                    {getFileName(document.file) || '-'}
                                                    {document.file instanceof File && ` (${formatFileSize(document.file.size)})`}
                                                </span>
                                            </Label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => removeDocument(document.id)}
                                                disabled={processing || data.documents.length === 1}
                                                className="text-red-600 border-red-200 bg-white hover:bg-red-50 w-full mt-1"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Hapus Dokumen
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addDocument}
                                disabled={processing}
                                className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Dokumen
                            </Button>
                        </div>
                    </div>

                    {/* Catatan Tambahan */}
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-gray-600 text-sm font-medium">📝</span>
                            </div>
                            <h3 className="text-lg font-semibold">Catatan Tambahan</h3>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Catatan atau Informasi Tambahan (Opsional)</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Informasi tambahan yang perlu disampaikan..."
                                className="min-h-[100px]"
                                disabled={processing}
                            />
                            <InputError message={errors.notes} />
                        </div>
                    </div>

                    {
                        activity && (
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                        <span className="text-red-600 text-sm font-medium">📄</span>
                                    </div>
                                    <h3 className="text-lg font-semibold">Invoice</h3>
                                </div>

                                {
                                    activity.invoice_file ?
                                        <>
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
                                                            <div className="text-xs text-gray-500 mt-4">
                                                                <div className="font-medium text-gray-900">Catatan:</div>
                                                                <div className="text-gray-500">Bukti pembayaran kegiatan</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <Badge variant="outline">Uploaded</Badge> */}
                                                    <Button type="button" variant="default" disabled={processing} className='bg-blue-600 hover:bg-blue-700 col-span-2'>
                                                        Download Bukti Pembayaran
                                                    </Button>
                                                </div>
                                            </div>
                                        </> :
                                        <div className="border rounded-lg p-4 bg-gray-50">
                                            <p className="text-sm text-gray-500">Admin belum mengupload Invoice</p>
                                        </div>
                                }
                            </div>
                        )
                    }

                    {/* Submit Buttons */}
                    <div className="flex justify-between gap-3 pt-6 border-t">
                        <Button asChild variant="outline" disabled={processing}>
                            <Link href={route('lembaga.pelatihan.index')}>
                                Kembali
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                            {
                                activity ?
                                    'Simpan Perubahan' :
                                    'Kirim Proposal'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}

export default ActivityCreate

