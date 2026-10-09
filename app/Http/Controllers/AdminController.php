<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AdminController extends Controller
{
    
     //ডক্টর ও স্টাফ তৈরির ফর্ম দেখানোর মেথড
    public function createUserForm()
    {
        return Inertia::render('Admin/CreateUser'); 
        // এটি আপনার resources/js/Pages/Admin/CreateUser.jsx ফাইলকে লোড করবে
    }
        public function index()
    {
        // resources/js/Pages/Admin/Dashboard.jsx ফাইলটি রেন্ডার করবে
        return Inertia::render('Admin/Dashboard', [
            'status' => 'Welcome to Admin Dashboard'
        ]);
    }
    
       //নতুন ডক্টর বা স্টাফ ডেটাবেজে সেভ করার মেথড
    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'phone' => 'required|string|size:11|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()], 
            'role' => 'required|in:doctor,staff',
        ]);

        //  ডেটাবেজে ইউজার তৈরি
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password), // পাসওয়ার্ড হ্যাশ করে সেভ করা
            'role' => $request->role,
        ]);

        return redirect()->back()->with('success', 'Account created successfully!');

    }

    // ডক্টর ও স্টাফদের লিস্ট দেখানো
    public function userList()
    {
        // এডমিন ছাড়া শুধু 'doctor' এবং 'staff' রোলধারী ইউজারদের লিস্ট আনা হলো
        $users = User::whereIn('role', ['doctor', 'staff'])
                    ->orderBy('id', 'desc')
                    ->get();

        return Inertia::render('Admin/UserList', [
            'users' => $users
        ]);

        
    }


    //অ্যাক্টিভ/ইনঅ্যাক্টিভ স্ট্যাটাস পরিবর্তন (Toggle Status)
  public function toggleStatus($id)
{
    // ১. ইউজার খুঁজে বের করা
    $user = \App\Models\User::findOrFail($id);
    
    // ২. একদম পরিষ্কারভাবে চেক করে মান পরিবর্তন করা
    if ($user->is_active == 1 || $user->is_active == true) {
        $user->is_active = 0;
    } else {
        $user->is_active = 1;
    }
    
    // ৩. ডাটাবেজে সেভ করা
    $user->save();

    // ৪. ইনার্শিয়াকে সাকসেস মেসেজ দিয়ে ব্যাক করানো
    return redirect()->back()->with('success', 'User status updated successfully!');
}
    // পাসওয়ার্ড পরিবর্তন করা (Change Password)
    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::findOrFail($id);
        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->back()->with('success', 'Password updated successfully!');

    }   


        // সফলভাবে সেভ হওয়ার পর মেসেজসহ রিডাইরেক্ট
       // return redirect()->route('admin.dashboard')->with('success', ucfirst($request->role) . ' created successfully!');
       
       //return redirect()->route('admin.users.create')->with('success', 'User created successfully!');
}    
