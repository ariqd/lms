<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\ActivityFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Http\Requests\SendInvoiceRequest;

class ActivityManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/activity-management/index', [
            'title' => 'Manajemen Kegiatan BA / DA',
            'activities' => Activity::with('user')->get()
        ]);
    }

    public function show($slug)
    {
        return Inertia::render('admin/activity-management/form', [
            'title' => 'Detail Kegiatan',
            'activity' => Activity::with('user', 'files')->where('slug', $slug)->first(),
            'breadcrumbs' => [
                [
                    'title' => 'Manajemen Kegiatan BA / DA',
                    'href' => route('admin.activity-management.index'),
                ],
                [
                    'title' => 'Detail Kegiatan',
                    'href' => route('admin.activity-management.show', $slug),
                ]
            ],
        ]);
    }

    public function update($id)
    {
        $activity = Activity::find($id);
        $activity->is_approved = true;
        $activity->save();

        return redirect()->route('admin.activity-management.index')->with('success', 'Kegiatan berhasil disetujui');
    }

    public function downloadFile($slug, $fileId): StreamedResponse
    {
        $activity = Activity::where('slug', $slug)->firstOrFail();
        $file = ActivityFile::where('id', $fileId)
            ->where('activity_id', $activity->id)
            ->firstOrFail();

        // Check if file exists
        if (!Storage::disk('public')->exists($file->file)) {
            abort(404, 'File not found.');
        }

        // Get the original filename from storage path
        $originalName = basename($file->file);
        // Remove the timestamp prefix to get the original filename
        $originalName = preg_replace('/^\d+_/', '', $originalName);

        return response()->streamDownload(function () use ($file) {
            echo Storage::disk('public')->get($file->file);
        }, $originalName, [
            'Content-Type' => mime_content_type(Storage::disk('public')->path($file->file))
        ]);

        // return Storage::disk('public')->download($file->file, $originalName);
    }

    public function sendInvoice($slug, SendInvoiceRequest $request)
    {
        // Get validated data from FormRequest
        $validated = $request->validated();

        // Check if activity exists and get it
        $activity = Activity::where('slug', $slug)->firstOrFail();

        // Business logic validation - allow sending invoice for both pending and in_progress activities
        if (!in_array($activity->status, ['pending', 'in_progress'])) {
            return redirect()->back()->withErrors(['status' => 'Invoice dapat dikirim hanya untuk kegiatan dengan status pending atau in_progress.']);
        }

        try {
            // Use database transaction for atomicity
            DB::beginTransaction();

            // Store old invoice file path for cleanup (if exists)
            $oldInvoiceFile = $activity->invoice_file;

            // Handle file upload
            $file = $request->file('invoice_file');

            // Generate unique filename to prevent conflicts
            $filename = time() . '_' . Str::uuid() . '_' . $file->getClientOriginalName();

            // Store file with error handling
            $filePath = $file->storeAs('activity-invoices', $filename, 'public');

            if (!$filePath) {
                throw new \Exception('Failed to store invoice file.');
            }

            // Update activity with new invoice data
            $activity->update([
                'status' => 'in_progress',
                'invoice_name' => $validated['invoice_name'],
                'invoice_file' => $filePath,
            ]);

            // Clean up old invoice file if exists
            if ($oldInvoiceFile && Storage::disk('public')->exists($oldInvoiceFile)) {
                Storage::disk('public')->delete($oldInvoiceFile);
            }

            // Determine the action for logging
            $action = $oldInvoiceFile ? 'Invoice updated' : 'Invoice sent';

            // Log the action
            Log::info($action . ' for activity', [
                'activity_id' => $activity->id,
                'activity_slug' => $slug,
                'invoice_name' => $validated['invoice_name'],
                'file_path' => $filePath,
                'sent_by' => Auth::id(),
                'is_replacement' => (bool) $oldInvoiceFile,
            ]);

            DB::commit();

            $message = $oldInvoiceFile ? 'Invoice baru berhasil dikirim' : 'Invoice berhasil dikirim';

            return redirect()->route('admin.activity-management.show', $slug)
                ->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();

            // Log the error
            Log::error('Failed to send invoice', [
                'activity_id' => $activity->id,
                'activity_slug' => $slug,
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Gagal mengirim invoice. Silakan coba lagi.'])
                ->withInput();
        }
    }

    /**
     * Download invoice for the activity.
     */
    public function downloadInvoice($slug)
    {
        $activity = Activity::where('slug', $slug)->firstOrFail();

        if (!$activity->invoice_file || !Storage::disk('public')->exists($activity->invoice_file)) {
            return redirect()->route('admin.activity-management.show', $slug)
                ->with('error', 'File invoice tidak ditemukan');
        }

        return response()->download(
            Storage::disk('public')->path($activity->invoice_file),
            $activity->invoice_name . '.' . pathinfo($activity->invoice_file, PATHINFO_EXTENSION)
        );
    }

    /**
     * Download payment proof for the activity.
     */
    public function downloadPaymentProof($slug)
    {
        $activity = Activity::where('slug', $slug)->firstOrFail();

        if (!$activity->payment_proof_file || !Storage::disk('public')->exists($activity->payment_proof_file)) {
            return redirect()->route('admin.activity-management.show', $slug)
                ->with('error', 'File bukti pembayaran tidak ditemukan');
        }

        return response()->download(
            Storage::disk('public')->path($activity->payment_proof_file),
            $activity->payment_proof_name . '.' . pathinfo($activity->payment_proof_file, PATHINFO_EXTENSION)
        );
    }
}
