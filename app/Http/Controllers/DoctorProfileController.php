<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorProfileController extends Controller
{
    // 📄 প্রোফাইল পেজ ডাটা সহ দেখানো
    public function edit()
    {
        $user = Auth::user();
        
        // ডক্টর ও শিডিউল টেবিল থেকে এক্সিস্টিং ডাটা তুলে আনা
        $doctor = Doctor::where('user_id', $user->id)->first();
        $schedules = $doctor ? DoctorSchedule::where('doctor_id', $doctor->id)->get() : [];

        return Inertia::render('Profile/Edit', [
            'doctor' => $doctor,
            'schedules' => $schedules,
            'status' => session('status'),
        ]);
    }

    // 💾 মূল "SAVE" বাটনে চাপ দিলে ডাটা দুই টেবিলে সেভ হবে
    public function update(Request $request)
    {
        $user = Auth::user();

        // ইনপুট ভ্যালিডেশন
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'license_no' => 'required|string|max:100',
            'specialization' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        // ১. প্রথমে users টেবিলে নাম, ইমেইল ও ফোন নাম্বার আপডেট করা
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone, // আপনার টেবিলে mobile হলে 'mobile' লিখবেন
        ]);

        // ২. ডক্টর টেবিলে ডাটা সেভ বা আপডেট করা
        $doctor = Doctor::updateOrCreate(
            ['user_id' => $user->id,],
            [
                'name' => $request->name,
                'specialization' => $request->specialization,
                'license_no' => $request->license_no,
                'is_active' => true
            ]
        );

        // ৩. doctor_schedules টেবিলে সপ্তাহের ৭ দিনের শিডিউল অটো জেনারেট/আপডেট করা
        foreach (range(0, 6) as $day) {
            DoctorSchedule::updateOrCreate(
                [
                    'doctor_id' => $doctor->id,
                    'day_of_week' => $day
                ],
                [
                    'start_time' => $request->start_time,
                    'end_time' => $request->end_time,
                    'slot_duration' => 15, // ১৫ মিনিট ডিফল্ট স্লট টাইম
                    'is_active' => true
                ]
            );
        }

        return redirect()->back()->with('status', 'profile-updated');
    }
}