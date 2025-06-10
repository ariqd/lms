<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Institution/Index', [
            'title' => 'List Lembaga',
        ]);
    }
}
