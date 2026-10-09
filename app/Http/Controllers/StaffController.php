<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        // resources/js/Pages/Staff/Dashboard.jsx ফাইলটি রেন্ডার করবে
        return Inertia::render('Staff/Dashboard', [
            'status' => 'Welcome to Staff Dashboard'
        ]);
    }
}
