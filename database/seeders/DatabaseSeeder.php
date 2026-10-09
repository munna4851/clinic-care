<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Chamber Admin',
            'email' => 'munnaict@yahoo.com',
            'phone' => '01730335108', // ১১ ডিজিটের স্যাম্পল ফোন
            'password' => Hash::make('aaaaaaaa'),
            'role' => 'admin',
        ]);
    }
}