<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Get or create the 'lembaga' role
        $lembagaRole = Role::firstOrCreate(
            ['identity' => 'lembaga'],
            ['name' => 'Lembaga', 'identity' => 'lembaga']
        );

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $lembagaRole->id,
        ]);

        return back()->with('success', 'Lembaga berhasil ditambahkan!');
    }
}
