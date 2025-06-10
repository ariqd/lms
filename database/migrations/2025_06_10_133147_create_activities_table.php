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
            $table->longText('description');
            $table->longText('goals');
            $table->date('start_date');
            $table->date('end_date');
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
            $table->boolean('is_approved')->default(false);
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
