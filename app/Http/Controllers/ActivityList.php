<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityList extends Controller
{
    public function index()
    {
        $activities = Activity::where('is_approved', true)->get();

        return Inertia::render('kader/activity/index', [
            'activities' => $activities,
            'title' => 'Daftar Pelatihan BA / DA'
        ]);
    }
    public function show($id)
    {
        $activity = Activity::find($id);

        return Inertia::render('kader/activity/show', [
            'activity' => $activity,
        ]);
    }
}
