<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityList;
use App\Http\Controllers\Admin\ActivityManagementController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('home');

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

        Route::resource('activity-management', ActivityManagementController::class)->names('admin.activity-management');

        Route::get('institutions', [InstitutionController::class, 'index'])->name('institutions.index');
        Route::post('institutions', [InstitutionController::class, 'store'])->name('institutions.store');

        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
        Route::post('roles', [RoleController::class, 'store'])->name('roles.store');

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
        Route::get('activity-list', [ActivityList::class, 'index'])->name('activity-list');

        Route::get('profile', function () {
            return Inertia::render('blank', ['title' => 'Profil Saya']);
        })->name('profile');

        Route::get('materials', function () {
            return Inertia::render('blank', ['title' => 'Materi & Kelas']);
        })->name('materials');

        Route::prefix('my-activity-list')->group(function () {
            Route::get('materials', function () {
                return Inertia::render('blank', ['title' => 'Materi & Kelas']);
            })->name('my-activity-list.materials');

            Route::get('assignments', function () {
                return Inertia::render('blank', ['title' => 'Tugas']);
            })->name('my-activity-list.assignments');

            Route::get('quizzes', function () {
                return Inertia::render('blank', ['title' => 'Quiz']);
            })->name('my-activity-list.quizzes');

            Route::get('progress', function () {
                return Inertia::render('blank', ['title' => 'Progress Belajar']);
            })->name('my-activity-list.progress');

            Route::get('schedule', function () {
                return Inertia::render('blank', ['title' => 'Jadwal dan Presensi']);
            })->name('my-activity-list.schedule');
        });

        Route::get('progress', function () {
            return Inertia::render('blank', ['title' => 'Progress Belajar']);
        })->name('progress');

        Route::get('my-certificates', function () {
            return Inertia::render('blank', ['title' => 'Sertifikat Saya']);
        })->name('my-certificates');
    });

    Route::middleware('role:lembaga')->group(function () {
        Route::resource('activities', ActivityController::class)->names('lembaga.pelatihan');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
