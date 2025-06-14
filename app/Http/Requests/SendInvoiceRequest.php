<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SendInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role->identity === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invoice_name' => 'required|string|max:255',
            'invoice_file' => 'required|file|mimes:pdf,png,jpg,jpeg|max:10240', // 10MB max
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'invoice_name.required' => 'Nama invoice harus diisi.',
            'invoice_name.string' => 'Nama invoice harus berupa teks.',
            'invoice_name.max' => 'Nama invoice tidak boleh lebih dari 255 karakter.',
            'invoice_file.required' => 'File invoice harus diunggah.',
            'invoice_file.file' => 'File invoice harus berupa file yang valid.',
            'invoice_file.mimes' => 'File invoice harus berformat PDF, PNG, JPG, atau JPEG.',
            'invoice_file.max' => 'Ukuran file invoice tidak boleh lebih dari 10MB.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'invoice_name' => 'nama invoice',
            'invoice_file' => 'file invoice',
        ];
    }
}
