<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roles = [
            ['name' => 'Super Admin', 'identity' => 'superadmin'],
            ['name' => 'Admin', 'identity' => 'admin'],
            ['name' => 'Kader', 'identity' => 'kader'],
            ['name' => 'Lembaga', 'identity' => 'lembaga'],
            ['name' => 'Instruktur', 'identity' => 'instruktur'],
        ];

        $role = fake()->randomElement($roles);

        return [
            'name' => $role['name'],
            'identity' => $role['identity'],
        ];
    }

    /**
     * Create a Super Admin role.
     */
    public function superAdmin(): static
    {
        return $this->state([
            'name' => 'Super Admin',
            'identity' => 'superadmin',
        ]);
    }

    /**
     * Create an Admin role.
     */
    public function admin(): static
    {
        return $this->state([
            'name' => 'Admin',
            'identity' => 'admin',
        ]);
    }

    /**
     * Create a Kader role.
     */
    public function kader(): static
    {
        return $this->state([
            'name' => 'Kader',
            'identity' => 'kader',
        ]);
    }
}
