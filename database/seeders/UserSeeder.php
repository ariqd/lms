<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@lms.com',
                'password' => Hash::make('password'),
                'role_id' => 1
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@lms.com',
                'password' => Hash::make('password'),
                'role_id' => 2
            ],
            [
                'name' => 'Kader',
                'email' => 'kader@lms.com',
                'password' => Hash::make('password'),
                'role_id' => 3
            ],
            [
                'name' => 'Lembaga',
                'email' => 'lembaga@lms.com',
                'password' => Hash::make('password'),
                'role_id' => 4
            ],
            [
                'name' => 'Instruktur',
                'email' => 'instruktur@lms.com',
                'password' => Hash::make('password'),
                'role_id' => 5
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => $userData['password'],
                    'role_id' => $userData['role_id'],
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
