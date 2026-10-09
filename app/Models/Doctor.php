<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    // 🎯 ডাটাবেজের কলামগুলো মাস-অ্যাসাইনমেন্টের জন্য পারমিশন দেওয়া হলো
    protected $fillable = [
        'user_id',
        'name',
        'phone',        
        'email',        
        'specialization',
        'license_no',
        'is_active',
    ];

    // ⚙️ ডাটা টাইপ কাস্টিং
    protected $casts = [
        'is_active' => 'boolean',
    ];

    // 🔗 ইউজারের সাথে রিলেশন
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔗 ডক্টরের শিডিউলের সাথে রিলেশন
    public function schedules()
    {
        return $this->hasMany(DoctorSchedule::class);
    }
}