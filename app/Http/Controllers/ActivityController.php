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
}
