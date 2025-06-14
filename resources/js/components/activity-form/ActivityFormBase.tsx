import { memo } from 'react';
import { Head } from '@inertiajs/react';
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
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currency';

const ActivityFormBase = ({
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

                </form>
            </div>
        </AppLayout>
    );
};

export default memo(ActivityFormBase);
