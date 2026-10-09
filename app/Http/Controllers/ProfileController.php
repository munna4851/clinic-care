<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    // 📄 ১. প্রোফাইল পেজ দেখানো (ডাটা মার্জ করে পাঠানো)
    public function edit(Request $request): \Inertia\Response
    {
        $user = $request->user();
        
        // লগইন করা ইউজারের ডক্টর প্রোফাইল তুলে আনা
        $doctor = Doctor::where('user_id', $user->id)->first();

        // ইউজার এবং ডক্টরের ডাটা একসাথে একটি অবজেক্টে সাজানো
        $profileData = [
            'name'       => $user->name,
            'email'      => $user->email,
            'phone'      => $user->phone ?? ($doctor->phone ?? ''), // যেখানে ফোন আছে সেখান থেকে নেবে
            'address'    => $doctor->address ?? '',      // 🎯 ডক্টর টেবিল থেকে
            'license_no' => $doctor->license_no ?? '',    // 🎯 ডক্টর টেবিল থেকে
            'specialization' => $doctor->specialization ?? '',
            'photo'      => $doctor->photo ?? null,       // 🎯 ডক্টর টেবিল থেকে ফটো
        ];

        return Inertia::render('Profile/Edit', [
            'user' => $profileData, // ফ্রন্টঅ্যান্ডে এই মার্জড ডাটাটাই 'user' হিসেবে যাবে
            'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // 💾 ২. প্রোফাইল ডাটা আপডেট করা (ইউজার ও ডক্টর দুই টেবিলে আলাদা সেভ হবে)
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phone'      => 'nullable|string|max:20',
            'address'    => 'nullable|string|max:500',
            'license_no' => 'nullable|string|max:100',
            'specialization' => 'nullable|string|max:255',
            'photo'      => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // ১. ইউজার টেবিলে নাম ও ইমেইল আপডেট
        $user->name = $request->name;
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        // ২. ডক্টর প্রোফাইল ধরা বা তৈরি করা
        $doctor = Doctor::firstOrNew(['user_id' => $user->id]);

        // 🖼️ ডক্টর টেবিলে ফটো আপলোড হ্যান্ডেল করা
        if ($request->hasFile('photo')) {
            if ($doctor->photo) {
                Storage::disk('public')->delete($doctor->photo);
            }
            $path = $request->file('photo')->store('doctor_photos', 'public');
            $doctor->photo = $path;
        }

        // ৩. ডক্টর টেবিলে বাকি ডাটা সেভ করা
        $doctor->name = $request->name; // ডক্টর টেবিলে নাম থাকলে
        $doctor->specialization = $doctor->specialization ?? 'General'; // ডিফল্ট বা এক্সিস্টিং
        $doctor->license_no = $request->license_no;
        $doctor->address = $request->address; // ডক্টর টেবিলে অ্যাড্রেস কলাম থাকলে
        $doctor->phone = $request->phone;
        $doctor->is_active = true;
        $doctor->save();

        return redirect()->route('profile.edit')->with('status', 'profile-updated');
    }
}