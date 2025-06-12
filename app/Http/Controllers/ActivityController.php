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
    public function show(string $slug)
    {
        $activity = Activity::where('slug', $slug)->with('files')->firstOrFail();

        return Inertia::render('lembaga/activity/form', [
            'title' => 'Detail Kegiatan ' . $activity->name,
            'breadcrumbs' => [
                [
                    'title' => 'Pengajuan Kegiatan BA / DA',
                    'href' => route('lembaga.pelatihan.index'),
                ],
                [
                    'title' => 'Detail Kegiatan ' . $activity->name,
                    'href' => route('lembaga.pelatihan.show', $slug)
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
    public function update(StoreActivityRequest $request, int $id)
    {
        $activity = Activity::where('id', $id)->firstOrFail();
        dd($activity);

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


        $activity->update($validated);

        // Handle file updates properly
        if ($validated['documents'] && is_array($validated['documents'])) {
            try {
                // Get current files for this activity
                $existingFiles = $activity->files()->get();
                $processedFileIds = [];

                foreach ($validated['documents'] as $document) {
                    // Skip if no name is provided
                    if (!isset($document['name']) || empty($document['name'])) {
                        continue;
                    }

                    // Check if this is a new file upload (File object) vs existing file (string path)
                    $hasNewFile = isset($document['file']) && $document['file'] instanceof \Illuminate\Http\UploadedFile;

                    if ($hasNewFile) {
                        // This is a new file upload - handle upload and optionally replace existing
                        $file = $document['file'];
                        $filename = time() . '_' . $file->getClientOriginalName();

                        try {
                            $filePath = $file->storeAs('activity-documents', $filename, 'public');
                        } catch (\Exception $e) {
                            // If file upload fails, skip this document and continue
                            \Log::error('Failed to upload file: ' . $e->getMessage());
                            continue;
                        }

                        // Check if we're replacing an existing file by looking at document ID
                        $existingFile = null;
                        if (isset($document['id']) && is_numeric($document['id'])) {
                            $existingFile = $existingFiles->where('id', $document['id'])->first();
                        }

                        // If no ID match, try to find by name (for replacement)
                        if (!$existingFile) {
                            $existingFile = $existingFiles->where('name', $document['name'])->first();
                        }

                        if ($existingFile) {
                            // Delete old file from storage
                            try {
                                if (Storage::disk('public')->exists($existingFile->file)) {
                                    Storage::disk('public')->delete($existingFile->file);
                                }
                            } catch (\Exception $e) {
                                \Log::warning('Failed to delete old file: ' . $e->getMessage());
                            }

                            // Update existing record
                            $existingFile->update([
                                'name' => $document['name'],
                                'file' => $filePath,
                            ]);

                            $processedFileIds[] = $existingFile->id;
                        } else {
                            // Create new file record
                            $newFile = ActivityFile::create([
                                'activity_id' => $activity->id,
                                'name' => $document['name'],
                                'file' => $filePath,
                            ]);

                            $processedFileIds[] = $newFile->id;
                        }
                    } else {
                        // This is an existing file - find it and update if needed
                        $existingFile = null;

                        // First try to find by database ID if provided
                        if (isset($document['id']) && is_numeric($document['id'])) {
                            $existingFile = $existingFiles->where('id', $document['id'])->first();
                        }

                        // If no ID match and we have a file path, try to find by file path
                        if (!$existingFile && isset($document['file']) && is_string($document['file'])) {
                            $existingFile = $existingFiles->where('file', $document['file'])->first();
                        }

                        // Last resort: find by name (but this can be unreliable if names change)
                        if (!$existingFile) {
                            $existingFile = $existingFiles->where('name', $document['name'])->first();
                        }

                        if ($existingFile) {
                            // Update name if it has changed
                            if ($existingFile->name !== $document['name']) {
                                $existingFile->update(['name' => $document['name']]);
                            }

                            $processedFileIds[] = $existingFile->id;
                        }
                        // If we can't find the existing file, it might have been deleted on frontend
                        // So we don't create a new one, just ignore it
                    }
                }

                // Delete files that are no longer in the documents array
                $filesToDelete = $existingFiles->whereNotIn('id', $processedFileIds);
                foreach ($filesToDelete as $fileToDelete) {
                    try {
                        // Delete file from storage
                        if (Storage::disk('public')->exists($fileToDelete->file)) {
                            Storage::disk('public')->delete($fileToDelete->file);
                        }

                        // Delete database record
                        $fileToDelete->delete();
                    } catch (\Exception $e) {
                        \Log::warning('Failed to delete file: ' . $e->getMessage());
                    }
                }
            } catch (\Exception $e) {
                \Log::error('Error processing file updates: ' . $e->getMessage());
                // Don't fail the entire update if file processing fails
            }
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
}
