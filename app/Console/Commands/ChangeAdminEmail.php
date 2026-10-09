<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ChangeAdminEmail extends Command
{
    protected $signature = 'admin:change-email {new_email}';
    protected $description = 'Change admin email address';

    public function handle()
    {
        $newEmail = $this->argument('new_email');
        $user = User::where('role', 'admin')->first() ?? User::where('email', 'admin@gmail.com')->first();

        if (!$user) {
            $this->error('Admin user not found!');
            return;
        }

        $oldEmail = $user->email;
        $user->email = $newEmail;
        $user->save();

        $this->info("Admin email updated from {$oldEmail} to {$newEmail} successfully!");
    }
}