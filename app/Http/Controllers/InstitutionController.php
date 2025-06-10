<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin');
    }

    public function index()
    {
        $institutions = User::whereHas('role', function ($query) {
            $query->where('identity', 'lembaga');
        })->with('role')->get();

        return Inertia::render('Institution/Index', [
            'title' => 'List Lembaga',
            'institutions' => $institutions,
        ]);
    }
}
