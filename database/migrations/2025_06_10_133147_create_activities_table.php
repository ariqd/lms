<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['ba', 'da']);
            $table->string('name');
            $table->string('slug')->unique();
            $table->longText('description');
            $table->longText('goals');
            $table->date('date_start');
            $table->date('date_end');
            $table->time('time_start');
            $table->time('time_end');
            $table->date('registration_deadline');
            $table->integer('participant_count');
            $table->string('location');
            $table->longText('daily_schedule');
            $table->integer('total_budget');
            $table->longText('additional_needs');
            $table->longText('additional_equipments');
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->string('contact_email');
            $table->longText('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['pending', 'approved', 'rejected', 'in_progress', 'finished', 'cancelled'])->default('pending');
            $table->string('invoice_file')->nullable();
            $table->string('payment_proof_file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
