<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->index();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });

        DB::table('users')->insert([
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@mail.com',
                'password' => Hash::make('password'),
                'role_id' => 1,
                'created_at' => Carbon::now()
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'created_at' => Carbon::now()
            ],
            [
                'name' => 'Kader',
                'email' => 'kader@mail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => Carbon::now()
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
