<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DoctorProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 🌐 ল্যান্ডিং বা হোম পেজ
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 📊 কমন ড্যাশবোর্ড (লগইন করা সাধারণ সবার জন্য)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

// 🟢 পাবিলক সিরিয়াল বুকিং রাউটসমূহ (লগইন ছাড়াই অ্যাক্সেস করা যাবে)
Route::get('/book-serial', [AppointmentController::class, 'create'])->name('serial.create');
Route::post('/book-serial', [AppointmentController::class, 'store'])->name('serial.store');
// ডক্টরের টাইম শিডিউল চেক করার এপিআই রাউট
Route::get('/get-doctor-schedule', [AppointmentController::class, 'getSchedule'])->name('doctor.schedule.check');
 // show token
Route::get('/appointments/print/{id}', [AppointmentController::class, 'showToken'])->name('serial.print');
//Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

// 🔴 ২. অ্যাডমিন রাউটসমূহ (শুধুমাত্র লগইন করা অ্যাডমিনদের জন্য)
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('admin.appointments.index');

    // ➕ অ্যাডমিন সিরিয়াল ক্রিয়েট রুট
    Route::get('/appointments/create', [AppointmentController::class, 'createAdmin'])->name('admin.appointments.create');
    Route::post('/appointments', [AppointmentController::class, 'storeAdmin'])->name('admin.appointments.store');
});



// 👑 ১. শুধুমাত্র অ্যাডমিনের রাউটসমূহ
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    // অ্যাডমিন ড্যাশবোর্ড
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    // 🎯 ইউজার/ডক্টর তৈরি করার মূল রাউটসমূহ
    Route::get('/create-user', [UserController::class, 'create'])->name('users.create');
    Route::post('/create-user', [UserController::class, 'store'])->name('users.store');
    
    // 🔑 মেইন ফিক্স: ফ্রন্টএন্ড ফর্ম থেকে /admin/users ও /admin/users/store দুটি ইউআরএলই হ্যান্ডেল করবে
    Route::post('/users', [UserController::class, 'store']); 
    Route::post('/users/store', [UserController::class, 'store'])->name('admin.users.store');

    // 🩺 ডক্টর তৈরি করার ফর্ম পেজ ও ডাটা সেভ
    Route::get('/add-doctor', function () {
        return Inertia::render('Admin/AddDoctor');
    })->name('admin.add-doctor');
    Route::post('/doctor/store', [DoctorController::class, 'store'])->name('doctor.store');

    // AdminController এর ব্যাকআপ ফর্ম হ্যান্ডলার
    Route::get('/users/create', [AdminController::class, 'createUserForm'])->name('admin.users.create');

    // ইউজার লিস্ট ও স্ট্যাটাস ম্যানেজমেন্ট
    Route::get('/users', [AdminController::class, 'userList'])->name('admin.users.index');
    Route::patch('/users/{id}/toggle-status', [AdminController::class, 'toggleStatus'])->name('admin.toggle-status');
    Route::put('/users/{id}/change-password', [AdminController::class, 'changePassword'])->name('admin.change-password');
});


// 🩺 ২. শুধুমাত্র ডক্টরদের রাউটসমূহ
Route::middleware(['auth', 'verified', 'role:doctor'])->prefix('doctor')->group(function () {
    Route::get('/dashboard', [DoctorController::class, 'index'])->name('doctor.dashboard');
});

// 💼 ৩. শুধুমাত্র স্টাফদের রাউটসমূহ
Route::middleware(['auth', 'verified', 'role:staff'])->prefix('staff')->group(function () {
    Route::get('/dashboard', [StaffController::class, 'index'])->name('staff.dashboard');
});

// 👤 প্রোফাইল ম্যানেজমেন্ট (সব লগইন করা ইউজারের জন্য)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';

