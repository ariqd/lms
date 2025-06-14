<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityFile;
use App\Http\Requests\StoreActivityRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('lembaga/activity/index', [
            'title' => 'Pengajuan Kegiatan BA / DA',
            'activities' => Activity::where('user_id', Auth::user()->id)->with('files')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('lembaga/activity/form', [
            'title' => 'Buat Pengajuan Kegiatan',
            'breadcrumbs' => [
                [
                    'title' => 'Pengajuan Kegiatan BA / DA',
                    'href' => route('lembaga.pelatihan.index'),
                ],
                [
                    'title' => 'Buat Pengajuan Kegiatan',
                    'href' => route('lembaga.pelatihan.create')
                ]
            ],
            'description' => 'Lengkapi formulir pengajuan pelatihan'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request)
    {
        $validated = $request->safe()->only([
            'type',
            'name',
            'description',
            'goals',
            'date_start',
            'date_end',
            'time_start',
            'time_end',
            'registration_deadline',
            'participant_count',
            'location',
            'daily_schedule',
            'total_budget',
            'additional_needs',
            'additional_equipments',
            'contact_name',
            'contact_phone',
            'contact_email',
            'notes',
            'documents',
        ]);

        $activity = Activity::create([
            'user_id' => Auth::user()->id,
            'slug' => \Str::slug($validated['name'] . '-' . time()),
            ...$validated,
        ]);

        if ($validated['documents'] && is_array($validated['documents'])) {
            foreach ($validated['documents'] as $document) {
                if (isset($document['file']) && isset($document['name'])) {
                    $file = $document['file'];
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('activity-documents', $filename, 'public');

                    ActivityFile::create([
                        'activity_id' => $activity->id,
                        'name' => $document['name'],
                        'file' => $filePath,
                    ]);
                }
            }
        }

        return redirect()->route('lembaga.pelatihan.index')->with('success', "Kegiatan {$validated['name']} berhasil dibuat");
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        $activity->load('files');

        return Inertia::render('lembaga/activity/form', [
            'title' => 'Detail Kegiatan ' . $activity->name,
            'breadcrumbs' => [
                [
                    'title' => 'Pengajuan Kegiatan BA / DA',
                    'href' => route('lembaga.pelatihan.index'),
                ],
                [
                    'title' => 'Detail Kegiatan ' . $activity->name,
                    'href' => route('lembaga.pelatihan.show', $activity->slug)
                ]
            ],
            'description' => 'Lihat atau edit detail kegiatan',
            'activity' => $activity
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreActivityRequest $request, Activity $activity)
    {

        if ($activity->user_id !== Auth::user()->id && Auth::user()->role->identity !== 'admin') {
            return redirect()->route('lembaga.pelatihan.index')->with('error', "Anda tidak memiliki akses untuk mengubah kegiatan ini");
        }

        $validated = $request->safe()->only([
            'type',
            'name',
            'description',
            'goals',
            'date_start',
            'date_end',
            'time_start',
            'time_end',
            'registration_deadline',
            'participant_count',
            'location',
            'daily_schedule',
            'total_budget',
            'additional_needs',
            'additional_equipments',
            'contact_name',
            'contact_phone',
            'contact_email',
            'notes',
            'documents',
        ]);

        dd($validated);

        $activity->update($validated);

        if ($validated['documents'] && is_array($validated['documents'])) {
            dd($validated['documents']);
        }

        return redirect()->route('lembaga.pelatihan.index')->with('success', "Kegiatan {$validated['name']} berhasil diubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }

    /**
     * Upload payment proof for the activity.
     */
    public function uploadPaymentProof(Request $request, Activity $activity)
    {

        // Check if user owns this activity
        if ($activity->user_id !== Auth::user()->id) {
            return redirect()->route('lembaga.pelatihan.index')
                ->with('error', 'Anda tidak memiliki akses untuk mengunggah bukti pembayaran untuk kegiatan ini');
        }

        $request->validate([
            'payment_proof_file' => 'required|file|mimes:pdf,png,jpg,jpeg|max:10240', // 10MB max
            'payment_proof_notes' => 'nullable|string|max:255',
        ]);

        $file = $request->file('payment_proof_file');
        $filename = time() . '_bukti_pembayaran_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('payment-proofs', $filename, 'public');

        $activity->update([
            'payment_proof_file' => $filePath,
            'payment_proof_name' => $request->payment_proof_notes ?: 'Bukti Pembayaran ' . $activity->name,
        ]);

        return redirect()->route('lembaga.pelatihan.show', $activity->slug)
            ->with('success', 'Bukti pembayaran berhasil diunggah');
    }

    /**
     * Download payment proof for the activity.
     */
    public function downloadPaymentProof(Activity $activity)
    {

        // Check if user owns this activity
        if ($activity->user_id !== Auth::user()->id) {
            return redirect()->route('lembaga.pelatihan.index')
                ->with('error', 'Anda tidak memiliki akses untuk mengunduh bukti pembayaran untuk kegiatan ini');
        }

        if (!$activity->payment_proof_file || !Storage::disk('public')->exists($activity->payment_proof_file)) {
            return redirect()->route('lembaga.pelatihan.show', $activity->slug)
                ->with('error', 'File bukti pembayaran tidak ditemukan');
        }

        return response()->download(Storage::disk('public')->path($activity->payment_proof_file));
    }

    /**
     * Download invoice for the activity.
     */
    public function downloadInvoice(Activity $activity)
    {

        // Check if user owns this activity
        if ($activity->user_id !== Auth::user()->id) {
            return redirect()->route('lembaga.pelatihan.index')
                ->with('error', 'Anda tidak memiliki akses untuk mengunduh invoice untuk kegiatan ini');
        }

        if (!$activity->invoice_file || !Storage::disk('public')->exists($activity->invoice_file)) {
            return redirect()->route('lembaga.pelatihan.show', $activity->slug)
                ->with('error', 'File invoice tidak ditemukan');
        }

        return response()->download(
            Storage::disk('public')->path($activity->invoice_file),
            $activity->invoice_name . '.' . pathinfo($activity->invoice_file, PATHINFO_EXTENSION)
        );
    }
}
