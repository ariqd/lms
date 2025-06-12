<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role_id' => $this->getRandomRoleId(),
        ];
    }

    /**
     * Get a random role ID from existing roles or create default roles if none exist.
     */
    private function getRandomRoleId(): int
    {
        // Try to get existing roles first
        $roleCount = Role::count();

        if ($roleCount === 0) {
            // If no roles exist, create the default ones
            $roles = [
                ['name' => 'Super Admin', 'identity' => 'superadmin'],
                ['name' => 'Admin', 'identity' => 'admin'],
                ['name' => 'Kader', 'identity' => 'kader'],
                ['name' => 'Lembaga', 'identity' => 'lembaga'],
                ['name' => 'Instruktur', 'identity' => 'instruktur'],
            ];

            foreach ($roles as $roleData) {
                Role::firstOrCreate(['identity' => $roleData['identity']], $roleData);
            }
        }

        // Return a random role ID
        return Role::inRandomOrder()->first()->id;
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
