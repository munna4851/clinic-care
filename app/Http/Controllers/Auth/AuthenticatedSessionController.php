<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

   
public function store(LoginRequest $request): RedirectResponse
{
    // ১. ডিফল্ট ল্যারাভেল অথেন্টিকেশন চেক (পাসওয়ার্ড মিলল কি না)
    $request->authenticate();

    // ২. লগইন করা ইউজারের আসল রোল এবং ফর্ম থেকে আসা টাইপ চেক করা
    $user = auth()->user();
    $intendedType = $request->input('type'); // 👈 এখন হিডেন ইনপুট থেকে ডাটা আসবে

    // 🚨 সিকিউরিটি লক: ডক্টর/স্টাফ লিংকে ক্লিক করে অ্যাডমিন আইডি দিলে আটকে দাও
    if ($intendedType && $user->role !== $intendedType) {
        auth()->logout(); // লগইন বাতিল

        // ইউজারের ইনপুট করা আইডিটি ইমেইল নাকি ফোন, তা মেসেজে দেখানোর জন্য
       $loginIdentifier = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'Email' : 'Mobile number';
        
        throw ValidationException::withMessages([
            'email' => "This account is registered as a " . ucfirst($user->role) . ". You cannot log in through the " . ucfirst($intendedType) . " portal.",
        ]);
    }

    $request->session()->regenerate();

    // ৩. রোল অনুযায়ী ড্যাশবোর্ডে পাঠানো
    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    if ($user->role === 'doctor') {
        return redirect()->route('doctor.dashboard');
    }
    if ($user->role === 'staff') {
        return redirect()->route('staff.dashboard');
    }

    return redirect()->route('dashboard');
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
