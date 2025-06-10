<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin');
    }

    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'title' => 'List Pengguna',
        ]);
    }
}
