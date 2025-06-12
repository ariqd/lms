<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $activities = Activity::where('status', 'approved')->get();

        return Inertia::render('welcome', [
            'activities' => $activities
        ]);
    }
}
