<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'name',
        'description',
        'goals',
        'start_date',
        'end_date',
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
        'is_approved',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
