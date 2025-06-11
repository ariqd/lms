<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Inertia\Inertia;

class ActivityManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/activity-management/index', [
            'title' => 'Manajemen Kegiatan BA / DA',
            'activities' => Activity::with('user')->get()
        ]);
    }

    public function show($id)
    {
        return Inertia::render('admin/activity-management/form', [
            'title' => 'Detail Kegiatan',
            'activity' => Activity::with('user')->find($id),
            'breadcrumbs' => [
                [
                    'title' => 'Manajemen Kegiatan BA / DA',
                    'href' => route('admin.activity-management.index'),
                ],
                [
                    'title' => 'Detail Kegiatan',
                    'href' => route('admin.activity-management.show', $id),
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
}
