<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use Inertia\Inertia; 
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorController extends Controller
{
    public function store(Request $request)
    {
        // ১. ভ্যালিডেশন
        $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'nullable|email|unique:users,email',
            'phone'          => ['required', 'regex:/^01[3-9]\d{8}$/', 'unique:users,phone'],
            'password'       => 'required|string|min:8',
            'specialization' => 'required|string|max:255',
            'license_no'     => 'required|string|max:100',
            'days'           => 'required|array|min:1', // অন্তত ১ দিন সিলেক্ট করতে হবে
            'start_time'     => 'required',
            'end_time'       => 'required',
            'slot_duration'  => 'nullable|integer',
        ]);

        // ২. ট্রানজ্যাকশন দিয়ে ডাটা সেভ
        DB::transaction(function () use ($request) {
            // (ক) User Create
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'phone'    => $request->phone, 
                'password' => Hash::make($request->password),
                'role'     => 'doctor', 
            ]);

            // (খ) Doctor Profile Create
            $doctor = Doctor::create([
                'user_id'        => $user->id,
                'name'           => $request->name,
                'specialization' => $request->specialization,
                'license_no'     => $request->license_no,
                'is_active'      => true,
            ]);

            // (গ) নির্বাচিত দিনগুলোর জন্য doctor_schedules এন্ট্রি
            $schedules = [];
            foreach ($request->days as $dayOfWeek) {
                $schedules[] = [
                    'doctor_id'     => $doctor->id,
                    'day_of_week'   => $dayOfWeek, // Selected Day (0-6)
                    'start_time'    => $request->start_time,
                    'end_time'      => $request->end_time,
                    'slot_duration' => $request->slot_duration ?? 15,
                    'is_active'     => true,
                    'created_at'    => now(),
                    'updated_at'    => now(),
                ];
            }

            DoctorSchedule::insert($schedules);
        });

        return redirect()->back()->with('success', 'Doctor created with schedules successfully!');
    }
}