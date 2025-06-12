<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|in:ba,da',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'goals' => 'required|string',
            'date_start' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_start',
            'time_start' => 'required|string',
            'time_end' => 'required|string',
            'registration_deadline' => 'required|date|before:date_start',
            'participant_count' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'daily_schedule' => 'required|string',
            'total_budget' => 'required|numeric|min:0',
            'additional_needs' => 'required|string',
            'additional_equipments' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_email' => 'required|email|max:255',
            'notes' => 'nullable|string',
            'documents' => 'nullable|array',
            'documents.*.name' => 'nullable|string|max:255',
            'documents.*.file' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:10240', // 10MB max
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Jenis kegiatan harus diisi.',
            'type.in' => 'Jenis kegiatan harus berupa BA atau DA.',
            'name.required' => 'Nama kegiatan harus diisi.',
            'name.max' => 'Nama kegiatan maksimal 255 karakter.',
            'description.required' => 'Deskripsi kegiatan harus diisi.',
            'goals.required' => 'Tujuan kegiatan harus diisi.',
            'date_start.required' => 'Tanggal mulai kegiatan harus diisi.',
            'date_start.date' => 'Tanggal mulai kegiatan harus berupa tanggal.',
            'date_end.required' => 'Tanggal akhir kegiatan harus diisi.',
            'date_end.date' => 'Tanggal akhir kegiatan harus berupa tanggal.',
            'date_end.after_or_equal' => 'Tanggal akhir kegiatan harus setelah tanggal mulai kegiatan.',
            'time_start.required' => 'Waktu mulai kegiatan harus diisi.',
            'time_end.required' => 'Waktu akhir kegiatan harus diisi.',
            'registration_deadline.required' => 'Batas pendaftaran harus diisi.',
            'registration_deadline.date' => 'Batas pendaftaran harus berupa tanggal.',
            'registration_deadline.before' => 'Batas pendaftaran harus sebelum tanggal mulai kegiatan.',
            'participant_count.required' => 'Jumlah peserta harus diisi.',
            'participant_count.integer' => 'Jumlah peserta harus berupa angka.',
            'participant_count.min' => 'Jumlah peserta minimal 1.',
            'location.required' => 'Lokasi kegiatan harus diisi.',
            'location.max' => 'Lokasi kegiatan maksimal 255 karakter.',
            'daily_schedule.required' => 'Jadwal kegiatan harus diisi.',
            'total_budget.required' => 'Total anggaran harus diisi.',
            'total_budget.numeric' => 'Total anggaran harus berupa angka.',
            'total_budget.min' => 'Total anggaran minimal 0.',
            'additional_needs.required' => 'Kebutuhan tambahan harus diisi.',
            'additional_equipments.required' => 'Peralatan tambahan harus diisi.',
            'contact_name.required' => 'Nama kontak harus diisi.',
            'contact_name.max' => 'Nama kontak maksimal 255 karakter.',
            'contact_phone.required' => 'Nomor telepon kontak harus diisi.',
            'contact_phone.max' => 'Nomor telepon kontak maksimal 20 karakter.',
            'contact_email.required' => 'Email kontak harus diisi.',
            'contact_email.email' => 'Email kontak harus berupa email yang valid.',
            'contact_email.max' => 'Email kontak maksimal 255 karakter.',
        ];
    }
}
