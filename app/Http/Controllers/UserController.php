<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/CreateUser');
    }

    public function store(Request $request)
    {
        // ১. ভ্যালিডেশন
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|max:20|unique:users,phone',
            'email'           => 'nullable|email|max:255',
            'role'            => 'required|string|in:admin,doctor,staff',
            'password'        => 'required|string|min:6|confirmed',
            'specialization'  => 'required_if:role,doctor|nullable|string',
            'license_no'      => 'required_if:role,doctor|nullable|string',
            'days'            => 'nullable|array',
            'start_time'      => 'nullable',
            'end_time'        => 'nullable',
            'slot_duration'   => 'nullable|numeric',
        ]);

        DB::transaction(function () use ($validated, $request) {
            // ২. Users টেবিলে সেভ
            $user = User::create([
                'name'     => $validated['name'],
                'phone'    => $validated['phone'],
                'email'    => $validated['email'] ?? null,
                'role'     => $validated['role'],
                'password' => Hash::make($validated['password']),
            ]);

            // ৩. রোল 'doctor' হলে Doctors ও DoctorSchedules টেবিলে সেভ
            if ($validated['role'] === 'doctor') {
                $doctor = Doctor::create([
                    'user_id'        => $user->id,
                    'name'           => $user->name,
                    'phone'          => $user->phone,
                    'email'          => $user->email,
                    'specialization' => $validated['specialization'] ?? 'Dentist',
                    'license_no'     => $validated['license_no'] ?? null,
                    'is_active'      => true,
                ]);

                // ৪. বার (Day Name -> Number Mapping: Sun=0, Mon=1, ..., Sat=6)
                $dayMap = [
                    'Sun' => 0, 'Mon' => 1, 'Tue' => 2,
                    'Wed' => 3, 'Thu' => 4, 'Fri' => 5, 'Sat' => 6
                ];

                $selectedDays = $request->input('days', []);
                $schedules = [];

                foreach ($selectedDays as $day) {
                    $dayNum = is_numeric($day) ? $day : ($dayMap[$day] ?? null);

                    if ($dayNum !== null) {
                        $schedules[] = [
                            'doctor_id'     => $doctor->id,
                            'day_of_week'   => $dayNum,
                            'start_time'    => $validated['start_time'] ?? '16:00:00',
                            'end_time'      => $validated['end_time'] ?? '22:00:00',
                            'slot_duration' => $validated['slot_duration'] ?? 15,
                            'is_active'     => true,
                            'created_at'    => now(),
                            'updated_at'    => now(),
                        ];
                    }
                }

                if (!empty($schedules)) {
                    DoctorSchedule::insert($schedules);
                }
            }
        });

        return redirect()->route('admin.dashboard')->with('success', 'User created successfully!');
    }
}