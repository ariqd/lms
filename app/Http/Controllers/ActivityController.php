<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'activities' => Activity::where('user_id', Auth::user()->id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('lembaga/activity/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:ba,da',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'goals' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'participant_count' => 'required|integer',
            'location' => 'required|string',
            'daily_schedule' => 'required|string',
            'total_budget' => 'required|numeric',
            'additional_needs' => 'required|string',
            'additional_equipments' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_email' => 'required|email|max:255',
            'notes' => 'nullable|string',
        ]);

        $activity = Activity::create([
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'name' => $request->name,
            'description' => $request->description,
            'goals' => $request->goals,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'participant_count' => $request->participant_count,
            'location' => $request->location,
            'daily_schedule' => $request->daily_schedule,
            'total_budget' => $request->total_budget,
            'additional_needs' => $request->additional_needs,
            'additional_equipments' => $request->additional_equipments,
            'contact_name' => $request->contact_name,
            'contact_phone' => $request->contact_phone,
            'contact_email' => $request->contact_email,
            'notes' => $request->notes,
        ]);

        return redirect()->route('lembaga.pelatihan.index')->with('success', "Kegiatan {$request->name} berhasil dibuat");
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        // return Inertia::render('lembaga/activity/show', [
        //     'title' => 'Detail Kegiatan',
        //     'activity' => $activity
        // ]);
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
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
