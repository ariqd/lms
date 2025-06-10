<?php

use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // ADMIN ROUTES

    Route::middleware('role:admin')->group(function () {
        Route::get('classes', function () {
            return Inertia::render('blank', ['title' => 'Program & Kelas']);
        })->name('classes');

        Route::get('users', [UserController::class, 'index'])->name('users.index');

        Route::get('institutions', [InstitutionController::class, 'index'])->name('institutions.index');

        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');

        Route::get('organizations', function () {
            return Inertia::render('blank', ['title' => 'Organisasi']);
        })->name('organizations');

        Route::get('materials', function () {
            return Inertia::render('blank', ['title' => 'Materi & Tugas']);
        })->name('materials');

        Route::get('monitoring', function () {
            return Inertia::render('blank', ['title' => 'Monitoring']);
        })->name('monitoring');

        Route::get('certificates', function () {
            return Inertia::render('blank', ['title' => 'Sertifikat']);
        })->name('certificates');

        Route::get('reports', function () {
            return Inertia::render('blank', ['title' => 'Laporan']);
        })->name('reports');
    });

    // KADER ROUTES

    Route::middleware('role:kader')->group(function () {
        Route::get('schedule', function () {
            return Inertia::render('blank', ['title' => 'Jadwal & Kehadiran']);
        })->name('schedule');

        Route::get('materials', function () {
            return Inertia::render('blank', ['title' => 'Materi & Kelas']);
        })->name('materials');

        Route::get('progress', function () {
            return Inertia::render('blank', ['title' => 'Progress Belajar']);
        })->name('progress');

        Route::get('my-certificates', function () {
            return Inertia::render('blank', ['title' => 'Sertifikat Saya']);
        })->name('my-certificates');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
