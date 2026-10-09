<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor; 
use App\Models\DoctorSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    // 📄 ১. অ্যাপয়েন্টমেন্ট পেজ রেন্ডার (শুধুমাত্র অ্যাক্টিভ ডক্টর)
    public function create()
    {
        $doctors = Doctor::whereHas('user', function ($query) {
                $query->where('is_active', 1);
            })
            ->where('is_active', 1)
            ->select('id', 'name', 'specialization')
            ->get();

        return Inertia::render('Appointments/Create', [
            'doctors' => $doctors
        ]);
    }

    // 💾 ২. রোগীর অ্যাপয়েন্টমেন্ট ডাটাবেজে সেভ করা
    public function store(Request $request)
    {
        // ১. ইনপুট ডাটা ভ্যালিডেশন
        $request->validate([
            'patient_name'     => 'required|string|max:255',
            'gender'           => 'required|in:male,female,other',
            'patient_mobile'   => ['required', 'regex:/^01[3-9]\d{8}$/'],
            'doctor_id'        => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'patient_email'    => 'nullable|email',
            'address'          => 'nullable|string',
            'dob'              => 'nullable|date',
            'chief_complaint'  => 'nullable|string',
        ]);

        // ২. সিকিউরিটি চেক: ঐ নির্দিষ্ট দিনে ডক্টরের শিডিউল আছে কিনা যাচাই
        $dayOfWeek = Carbon::parse($request->appointment_date)->dayOfWeek;

        $schedule = DoctorSchedule::where('doctor_id', $request->doctor_id)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->first();

        if (!$schedule) {
            return redirect()->back()->withErrors([
                'appointment_date' => 'নির্বাচিত তারিখে এই ডক্টরের কোনো চেম্বার শিডিউল নেই।'
            ]);
        }

        // 🎯 ৩. ট্রানজ্যাকশন ব্যবহার করে নিরাপদভাবে সিরিয়াল ও অ্যাপয়েন্টমেন্ট তৈরি
            $appointment = DB::transaction(function () use ($request, $schedule) {
                
                // ওই নির্দিষ্ট ডক্টরের ওই দিনের শেষ সিরিয়াল নম্বর বের করা
                $lastAppointment = Appointment::where('doctor_id', $request->doctor_id)
                    ->where('appointment_date', $request->appointment_date)
                    ->lockForUpdate()
                    ->orderBy('serial_no', 'desc')
                    ->first();

                $nextSerialNo = $lastAppointment ? $lastAppointment->serial_no + 1 : 1;

                // ⏱️ সিরিয়াল অনুযায়ী সময় হিসাব (প্রতি সিরিয়ালে ৩০ মিনিট যোগ)
                $baseStartTime = Carbon::parse($schedule->start_time); // যেমন: 04:00 PM
                $minutesToAdd = ($nextSerialNo - 1) * 30; // সিরিয়াল ১ হলে +0 min, সিরিয়াল ৫ হলে +120 min (২ ঘণ্টা)
                
                $calculatedStartTime = $baseStartTime->copy()->addMinutes($minutesToAdd);
                $calculatedEndTime = $calculatedStartTime->copy()->addMinutes(30); // প্রতিটি সেশনের সময় ৩০ মিনিট

                // ইউনিক অ্যাপয়েন্টমেন্ট কোড তৈরি
                $appointmentCode = 'BS-' . date('Y') . '-' . strtoupper(Str::random(5));

                // ডাটাবেজে অ্যাপয়েন্টমেন্ট তৈরি
                return Appointment::create([
                    'patient_id'       => auth()->id(),
                    'appointment_code' => $appointmentCode,
                    'patient_name'     => $request->patient_name,
                    'gender'           => $request->gender,
                    'patient_mobile'   => $request->patient_mobile,
                    'patient_email'    => $request->patient_email,
                    'address'          => $request->address,
                    'dob'              => $request->dob,
                    'doctor_id'        => $request->doctor_id,
                    'serial_no'        => $nextSerialNo,
                    'appointment_date' => $request->appointment_date,
                    'start_time'       => $calculatedStartTime->format('H:i:s'), // ডাটাবেজে পার্সনাল টাইম সেভ হবে
                    'end_time'         => $calculatedEndTime->format('H:i:s'),
                    'booking_source'   => 'online',
                    'status'           => 'pending',
                    'chief_complaint'  => $request->chief_complaint,
                ]);
            });

        // 🟢 বুকিং সফল হলে সরাসরি টোকেন প্রিন্ট পেজে নিয়ে যাবে
        return redirect()->route('serial.print', $appointment->id)
                         ->with('success', 'আপনার সিরিয়াল #' . $appointment->serial_no . ' সফলভাবে বুক করা হয়েছে!');
    }

    // 🕒 ৩. ডক্টরের ডেট অনুযায়ী শিডিউল টাইম খুঁজে বের করার এপিআই
    public function getSchedule(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date'      => 'required|date'
        ]);

        $dayOfWeek = Carbon::parse($request->date)->dayOfWeek;

        $schedule = DoctorSchedule::where('doctor_id', $request->doctor_id)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->first();

        if ($schedule) {
            return response()->json([
                'available'  => true,
                'start_time' => Carbon::parse($schedule->start_time)->format('h:i A'),
                'end_time'   => Carbon::parse($schedule->end_time)->format('h:i A'),
            ]);
        }

        return response()->json([
            'available' => false,
            'message'   => 'এই দিনে ডক্টরের কোনো চেম্বার শিডিউল নেই।'
        ]);
    }

    // 🖨️ ৪. সিরিয়াল প্রিন্ট স্লিপ পেজ
    public function showToken($id)
    {
        $appointment = Appointment::with('doctor')->findOrFail($id);

        return Inertia::render('Appointments/PrintToken', [
            'appointment' => [
                'id'             => $appointment->id,
                'code'           => $appointment->appointment_code,
                'serial_no'      => $appointment->serial_no,
                'patient_name'   => $appointment->patient_name,
                'patient_mobile' => $appointment->patient_mobile,
                'doctor_name'    => $appointment->doctor->doctor_name ?? $appointment->doctor->name ?? 'N/A',
                'specialization' => $appointment->doctor->specialization ?? '',
                'date'           => Carbon::parse($appointment->appointment_date)->format('d M, Y'),
                'start_time'     => $appointment->start_time ? Carbon::parse($appointment->start_time)->format('h:i A') : 'N/A',
            ]
        ]);
    }

    // 📊 অ্যাডমিনের জন্য সব সিরিয়ালের লিস্ট
    public function index(Request $request)
    {
        $query = Appointment::with('doctor')
            ->latest('appointment_date')
            ->orderBy('serial_no', 'asc');

        // নির্দিষ্ট তারিখে ফিল্টার
        if ($request->filled('date')) {
            $query->whereDate('appointment_date', $request->date);
        }

        // নির্দিষ্ট ডাক্তারের ফিল্টার
        if ($request->filled('doctor_id')) {
            $query->where('doctor_id', $request->doctor_id);
        }

        $appointments = $query->paginate(15)->withQueryString();

        $doctors = Doctor::where('is_active', 1)->select('id', 'name')->get();

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments,
            'doctors'      => $doctors,
            'filters'      => $request->only(['date', 'doctor_id'])
        ]);
    }


    // ➕ ১. অ্যাডমিনের ম্যানুয়াল বুকিং ফর্ম
    public function createAdmin()
    {
        $doctors = Doctor::whereHas('user', function ($query) {
                $query->where('is_active', 1);
            })
            ->where('is_active', 1)
            ->select('id', 'name', 'specialization')
            ->get();

        return Inertia::render('Admin/Appointments/Create', [
            'doctors' => $doctors
        ]);
    }

    // 💾 ২. অ্যাডমিন দ্বারা সিরিয়াল সেভ করা
    public function storeAdmin(Request $request)
    {
        $request->validate([
            'patient_name'     => 'required|string|max:255',
            'gender'           => 'required|in:male,female,other',
            'patient_mobile'   => ['required', 'regex:/^01[3-9]\d{8}$/'],
            'doctor_id'        => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'patient_email'    => 'nullable|email',
            'address'          => 'nullable|string',
            'dob'              => 'nullable|date',
            'chief_complaint'  => 'nullable|string',
        ]);

        $dayOfWeek = Carbon::parse($request->appointment_date)->dayOfWeek;

        $schedule = DoctorSchedule::where('doctor_id', $request->doctor_id)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->first();

        if (!$schedule) {
            return redirect()->back()->withErrors([
                'appointment_date' => 'নির্বাচিত তারিখে এই ডক্টরের কোনো চেম্বার শিডিউল নেই।'
            ]);
        }

        $appointment = DB::transaction(function () use ($request, $schedule) {
            $lastAppointment = Appointment::where('doctor_id', $request->doctor_id)
                ->where('appointment_date', $request->appointment_date)
                ->lockForUpdate()
                ->orderBy('serial_no', 'desc')
                ->first();

            $nextSerialNo = $lastAppointment ? $lastAppointment->serial_no + 1 : 1;

            $baseStartTime = Carbon::parse($schedule->start_time);
            $minutesToAdd = ($nextSerialNo - 1) * 30;
            
            $calculatedStartTime = $baseStartTime->copy()->addMinutes($minutesToAdd);
            $calculatedEndTime = $calculatedStartTime->copy()->addMinutes(30);

            $appointmentCode = 'BS-' . date('Y') . '-' . strtoupper(Str::random(5));

            return Appointment::create([
                'patient_id'       => null,
                'created_by'       => auth()->id(), // অ্যাডমিনের আইডি সেভ থাকবে
                'appointment_code' => $appointmentCode,
                'patient_name'     => $request->patient_name,
                'gender'           => $request->gender,
                'patient_mobile'   => $request->patient_mobile,
                'patient_email'    => $request->patient_email,
                'address'          => $request->address,
                'dob'              => $request->dob,
                'doctor_id'        => $request->doctor_id,
                'serial_no'        => $nextSerialNo,
                'appointment_date' => $request->appointment_date,
                'start_time'       => $calculatedStartTime->format('H:i:s'),
                'end_time'         => $calculatedEndTime->format('H:i:s'),
                'booking_source'   => 'admin', // বুকিং সোর্স অ্যাডমিন
                'status'           => 'confirmed', // অ্যাডমিন বুক করলে সরাসরি Confirmed
                'chief_complaint'  => $request->chief_complaint,
            ]);
        });

        //return redirect()->route('serial.print', $appointment->id)
                      //  ->with('success', 'পেশেন্টের সিরিয়াল সফলভাবে তৈরি করা হয়েছে!');

        return redirect()->route('admin.appointments.index')
                     ->with('success', 'পেশেন্টের সিরিয়াল সফলভাবে সংরক্ষণ করা হয়েছে!');
    }

}