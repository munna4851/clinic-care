<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'created_by',
        'appointment_code',
        'patient_name',
        'gender',
        'patient_mobile',
        'patient_email',
        'address',
        'dob',
        'doctor_id',
        'serial_no',
        'appointment_date',
        'start_time',
        'end_time',
        'booking_source',
        'status',
        'chief_complaint',
    ];

    /**
     * ডক্টরের সাথে বেলংস-টু (belongsTo) রিলেশনশিপ
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }
}