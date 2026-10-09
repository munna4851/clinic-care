<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *//*
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // ইউজার লগইন করা আছে কি না এবং তার রোলটি রিকোয়েস্টেড রোলের সাথে মিলছে কি না চেক করা
        if (! $request->user() || $request->user()->role !== $role) {
            
            // যদি রোল না মিলে, তবে তাকে ড্যাশবোর্ডে ফেরত পাঠানো বা ৪0৩ এরর দেওয়া
            return redirect()->route('dashboard')->with('error', 'You do not have access to this page.');
        }

        return $next($request);
    } */

    public function handle(Request $request, Closure $next, string $role): Response
    {
        // 🚨 ইউজার লগইন না থাকলে অথবা ইউজারের রোল যদি রাউটের রোলের সাথে না মিলে, তবে আটকে দাও!
        if (!$request->user() || $request->user()->role !== $role) {
            
            // অপশন ১: সরাসরি ৪MD৩ (Unauthorized) এরর পেজ দেখানো
            abort(403, 'Unauthorized action.'); 
            
            // অথবা অপশন ২: মেসেজসহ মেইন ড্যাশবোর্ডে ব্যাক পাঠানো (১ম স্ক্রিনশটের মতো)
            // return redirect()->route('dashboard')->with('error', 'You do not have access.');
        }

        return $next($request);
    }


}