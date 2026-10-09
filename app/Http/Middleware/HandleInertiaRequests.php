<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
   
    
   public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            
            // 🚨 ইনাসিয়ার ডিফল্ট এরর শেয়ারিং রুল
            'errors' => fn () => $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->getMessages()
                : (object) [],

            // 👤 গ্লোবাল ইউজার ডাটা শেয়ারিং
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'phone' => $request->user()->phone, 
                    'role' => $request->user()->role, 
                ] : null,
            ],

            // 🎯 ফ্ল্যাশ মেসেজ শেয়ারিং ফিক্সড করা হলো (success এবং error দুটোই যোগ করা হলো)
            'flash' => [
                'message' => $request->session()->get('message'),
                'success' => $request->session()->get('success'), // 👈 এখন থেকে 'with('success')' কাজ করবে!
                'error' => $request->session()->get('error'),
            ],
        ];
}  }