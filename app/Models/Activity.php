<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'name',
        'slug',
        'description',
        'goals',
        'date_start',
        'date_end',
        'time_start',
        'time_end',
        'registration_deadline',
        'participant_count',
        'location',
        'daily_schedule',
        'total_budget',
        'additional_needs',
        'additional_equipments',
        'contact_name',
        'contact_phone',
        'contact_email',
        'notes',
        'is_active',
        'status',
        'invoice_name',
        'payment_proof_name',
        'invoice_file',
        'payment_proof_file',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function files()
    {
        return $this->hasMany(ActivityFile::class);
    }
}
