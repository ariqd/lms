<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'identity' => 'superadmin'
            ],
            [
                'name' => 'Admin',
                'identity' => 'admin'
            ],
            [
                'name' => 'Kader',
                'identity' => 'kader'
            ],
            [
                'name' => 'Lembaga',
                'identity' => 'lembaga'
            ],
            [
                'name' => 'Instruktur',
                'identity' => 'instruktur'
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['identity' => $role['identity']],
                $role
            );
        }
    }
}
