<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'munnaict@yahoo.com'],
            [
                'name' => 'Chamber Admin',
                'phone' => '01730335108',
                'role' => 'admin',
                'password' => Hash::make('aaaaaaaa'),
                'email_verified_at' => now(),
            ]
        );
    }
}