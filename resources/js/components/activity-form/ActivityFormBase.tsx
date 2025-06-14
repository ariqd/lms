import { memo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { ActivityFormBaseProps } from './types/ActivityFormTypes';
import { Label } from '@/components/ui/label';
import { SelectContent, Select, SelectValue, SelectItem, SelectTrigger } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Download, Plus, Trash2, Upload, ArrowLeft, LoaderCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';
import { formatFileSize, getFileName, isValidFileType } from '@/utils/file';

const ActivityFormBase = ({
    activity,
    breadcrumbs,
    title,
    description,
    formLogic,
    config
}: ActivityFormBaseProps) => {
    const { data, setData, errors, submit } = formLogic;

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
                                    <Select
                                        value={data.type}
                                        onValueChange={(value: 'ba' | 'da') => setData('type', value)}
                                        disabled={!config.permissions.canEdit}
                                    >
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
                                        disabled={!config.permissions.canEdit}
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
                                    disabled={!config.permissions.canEdit}
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
                                    disabled={!config.permissions.canEdit}
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
                                    {config.permissions.canEdit ? (
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
                                    ) : (
                                        <Input
                                            id="date_start"
                                            type="date"
                                            value={data.date_start}
                                            disabled
                                        />
                                    )}
                                    <InputError message={errors.date_start} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="date_end">Tanggal Selesai</Label>
                                    {config.permissions.canEdit ? (
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
                                    ) : (
                                        <Input
                                            id="date_end"
                                            type="date"
                                            value={data.date_end}
                                            disabled
                                        />
                                    )}
                                    <InputError message={errors.date_end} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="registration_deadline">Deadline Pendaftaran</Label>
                                    {config.permissions.canEdit ? (
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
                                    ) : (
                                        <Input
                                            id="registration_deadline"
                                            type="date"
                                            value={data.registration_deadline}
                                            disabled
                                        />
                                    )}
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
                                        disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
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
                                    disabled={!config.permissions.canEdit}
                                    maxLength={255}
                                />
                                <div className="flex justify-between items-center">
                                    <InputError message={errors.location} />
                                    {config.permissions.canEdit && (
                                        <span className="text-xs text-gray-500">
                                            {data.location.length}/255 karakter
                                        </span>
                                    )}
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
                                    disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
                                    />
                                </div>
                                <InputError message={errors.total_budget} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="additional_needs">Kebutuhan Tambahan</Label>
                                <Textarea
                                    id="additional_needs"
                                    value={data.additional_needs}
                                    onChange={(e) => setData('additional_needs', e.target.value)}
                                    placeholder="Akomodasi, penginapan, transportasi, dll"
                                    className="min-h-[100px]"
                                    disabled={!config.permissions.canEdit}
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
                                    disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
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
                                        disabled={!config.permissions.canEdit}
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

                        {config.permissions.canEdit ? (
                            /* Lembaga View - Editable Documents */
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">📋 Petunjuk Upload Dokumen:</span>
                                    </p>
                                    <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                                        <li>Upload dokumen pendukung seperti detail pelatihan, RAB, surat rekomendasi, dll.</li>
                                        <li>Format yang didukung: <span className="font-medium">PDF, PNG, JPG, JPEG</span></li>
                                        <li>Ukuran maksimal: <span className="font-medium">10MB per file</span></li>
                                        {formLogic.data.documents.length > 0 && <li>Update dokumen yang sudah diupload dengan mengubah nama dokumen dan/atau mengupload ulang file dokumen.</li>}
                                        {formLogic.data.documents.length > 0 && <li>Dokumen akan terupdate setelah tombol <span className="font-medium">Simpan Perubahan</span> ditekan.</li>}
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
                                                    onChange={(e) => formLogic.updateDocumentName(document.id, e.target.value)}
                                                    placeholder="Contoh: Proposal Kegiatan"
                                                    disabled={formLogic.processing}
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
                                                            formLogic.updateDocumentFile(document.id, file);
                                                        }}
                                                        disabled={formLogic.processing}
                                                        className="cursor-pointer col-span-8 bg-white"
                                                    />
                                                    <InputError message={errors && errors[`documents.${index}.file` as keyof typeof errors]} />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Format: PDF, PNG, JPG, JPEG (Max: 10MB)
                                                </p>
                                            </div>

                                            <div>
                                                <Label className="text-sm text-green-600">
                                                    {getFileName(document.file) || '-'}
                                                    {document.file instanceof File && ` (${formatFileSize(document.file.size)})`}
                                                </Label>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => formLogic.removeDocument(document.id)}
                                                    disabled={formLogic.processing || data.documents.length === 1}
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
                                    onClick={formLogic.addDocument}
                                    disabled={formLogic.processing}
                                    className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Dokumen
                                </Button>
                            </div>
                        ) : (
                            /* Admin View - Read-only Documents */
                            <div className="space-y-4">
                                {activity?.files && activity.files.length > 0 ? (
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
                                                <Button
                                                    type="button"
                                                    className='bg-blue-600 hover:bg-blue-700 text-white'
                                                    onClick={() => {
                                                        if (activity?.slug && document.id) {
                                                            window.open(route('admin.activity-management.files.download', {
                                                                activity: activity.slug,
                                                                file: document.id
                                                            }), '_blank');
                                                        }
                                                    }}
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <p className="text-sm text-gray-500 text-center">Tidak ada dokumen penunjang yang diupload</p>
                                    </div>
                                )}
                            </div>
                        )}
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
                            <Label htmlFor="notes">Catatan atau Informasi Tambahan</Label>
                            {
                                config.permissions.canEdit || data.notes ? <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Informasi tambahan yang perlu disampaikan"
                                    className="min-h-[100px]"
                                    disabled={!config.permissions.canEdit}
                                /> : <p className="text-sm text-gray-500">Tidak ada catatan tambahan</p>
                            }

                            <InputError message={errors.notes} />
                        </div>
                    </div>

                    {/* Invoice Section */}
                    {config.showInvoiceSection && (
                        <div className="bg-white rounded-lg border p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                                    <span className="text-indigo-600 text-sm font-medium">🧾</span>
                                </div>
                                <h3 className="text-lg font-semibold">Invoice</h3>
                            </div>

                            {config.permissions.canViewInvoice && activity?.invoice_file ? (
                                /* Show existing invoice */
                                <div className="border rounded-lg p-4 bg-gray-50 mb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <p className="font-medium text-gray-900">{activity.invoice_name || 'Invoice'}</p>
                                                <p className="text-sm text-gray-500">{getFileName(activity.invoice_file) || 'invoice.pdf'}</p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="default"
                                            disabled={formLogic.processing}
                                            className='bg-blue-600 hover:bg-blue-700 text-white'
                                            onClick={() => {
                                                // Handle invoice download based on user role
                                                if (config.role === 'admin' && activity?.slug) {
                                                    window.open(route('admin.activity-management.invoice.download', {
                                                        activity: activity.slug
                                                    }), '_blank');
                                                } else if (config.role === 'lembaga' && activity?.slug) {
                                                    window.open(route('lembaga.pelatihan.invoice.download', {
                                                        activity: activity.slug
                                                    }), '_blank');
                                                }
                                            }}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Invoice
                                        </Button>
                                    </div>
                                </div>
                            ) : config.permissions.canViewInvoice && (
                                <div className="border rounded-lg p-4 bg-gray-50 mb-5">
                                    <div className="flex items-center justify-center">
                                        <p className="text-sm text-gray-500">
                                            {config.role === 'lembaga' ? 'Admin belum mengupload Invoice' : 'Invoice belum diupload'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {config.permissions.canSendInvoice && (
                                /* Admin can upload/update invoice */
                                <>
                                    {activity?.invoice_file && (
                                        <p className="font-medium mb-2 text-gray-600">Ganti Invoice</p>
                                    )}
                                    <div className="border rounded-lg p-4 bg-gray-50 mb-5">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="invoice_name" className="text-sm font-medium">
                                                    Nama Invoice
                                                </Label>
                                                <Input
                                                    id="invoice_name"
                                                    type="text"
                                                    value={data.invoice_name || ''}
                                                    onChange={(e) => setData('invoice_name', e.target.value)}
                                                    placeholder="Contoh: Invoice Kegiatan"
                                                    disabled={formLogic.processing}
                                                    className="mt-1 bg-white"
                                                />
                                                <InputError message={errors.invoice_name} />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium">
                                                    File Invoice
                                                </Label>
                                                <div className="mt-1">
                                                    <Input
                                                        id="invoice_file"
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
                                                            setData('invoice_file', file);
                                                        }}
                                                        disabled={formLogic.processing}
                                                        className="cursor-pointer bg-white"
                                                    />
                                                    <InputError message={errors.invoice_file} />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Format: PDF, PNG, JPG, JPEG (Max: 10MB)
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center">
                                                <Label className="text-sm font-medium mb-2">Status File:</Label>
                                                <p className="text-sm text-gray-500">
                                                    {data.invoice_file ? (
                                                        <>
                                                            {getFileName(data.invoice_file)}
                                                            {data.invoice_file instanceof File && (
                                                                <span className="block text-xs">
                                                                    {formatFileSize(data.invoice_file.size)}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : 'Invoice belum diupload'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {config.permissions.canUploadPaymentProof && activity?.invoice_file && (
                                /* Lembaga can upload payment proof */
                                <div className="grid gap-2 mt-5">
                                    <Label htmlFor="bukti_pembayaran" className='text-sm font-medium text-gray-900'>
                                        Upload Bukti Pembayaran
                                    </Label>
                                    <div className="grid grid-cols-12 gap-2">
                                        <Input
                                            type="file"
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            disabled={formLogic.processing}
                                            className='cursor-pointer col-span-4'
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
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
                                                // Set payment proof file
                                                setData('payment_proof_file', file || null);
                                            }}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Catatan (opsional)"
                                            disabled={formLogic.processing}
                                            className='col-span-5'
                                            value={data.payment_proof_notes || ''}
                                            onChange={(e) => setData('payment_proof_notes', e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="default"
                                            disabled={formLogic.processing || !data.payment_proof_file}
                                            className='bg-blue-600 hover:bg-blue-700 col-span-3'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                formLogic.handlePaymentProofUpload(e);
                                            }}
                                        >
                                            {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                            <Upload className='w-4 h-4 mr-2' />
                                            Upload Bukti Pembayaran
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Format: PDF, PNG, JPG, JPEG (Max: 10MB)
                                    </p>
                                    <InputError message={errors.payment_proof_file} />
                                    <InputError message={errors.payment_proof_notes} />
                                </div>
                            )}

                            {
                                config.permissions.canViewInvoice || config.permissions.canSendInvoice && (
                                    <p className="font-medium text-gray-600">Bukti Pembayaran</p>
                                )
                            }

                            {(config.permissions.canViewInvoice || config.permissions.canSendInvoice) && activity?.payment_proof_file ? (
                                /* Show existing payment proof */
                                <div className="border rounded-lg p-4 bg-gray-50 mt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className='space-y-1'>
                                                <p className="text-sm text-gray-500">
                                                    {getFileName(activity.payment_proof_file) || 'bukti-pembayaran.pdf'}
                                                </p>
                                                {activity.payment_proof_name && (
                                                    <div className="text-xs text-gray-500 mt-4">
                                                        <div className="font-medium text-gray-900">Catatan:</div>
                                                        <div className="text-gray-500">{activity.payment_proof_name}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="default"
                                            disabled={formLogic.processing}
                                            className='bg-blue-600 hover:bg-blue-700 text-white'
                                            onClick={() => {
                                                // Handle payment proof download based on user role
                                                if (config.role === 'admin' && activity?.slug) {
                                                    window.open(route('admin.activity-management.payment-proof.download', {
                                                        activity: activity.slug
                                                    }), '_blank');
                                                } else if (config.role === 'lembaga' && activity?.slug) {
                                                    window.open(route('lembaga.pelatihan.payment-proof.download', {
                                                        activity: activity.slug
                                                    }), '_blank');
                                                }
                                            }}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Bukti Pembayaran
                                        </Button>
                                    </div>
                                </div>
                            ) : config.permissions.canSendInvoice && !activity?.payment_proof_file && (
                                /* Show no payment proof message for admin */
                                <div className="border rounded-lg p-4 bg-gray-50 mt-5">
                                    <div className="flex items-center justify-center">
                                        <p className="text-sm text-gray-500">Lembaga Pelatihan belum mengirimkan bukti pembayaran</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="flex justify-between gap-3 pt-6 border-t">
                        <Button asChild variant="outline" disabled={formLogic.processing}>
                            <Link href={config.backUrl}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Link>
                        </Button>

                        <div className="flex items-center gap-3">
                            {/* Custom additional actions */}
                            {config.additionalActions && config.additionalActions}

                            {/* Submit button for lembaga forms */}
                            {config.permissions.canSubmit && (
                                <Button type="submit" disabled={formLogic.processing}>
                                    {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                    {config.submitButtonText}
                                </Button>
                            )}
                        </div>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
};

export default memo(ActivityFormBase);
