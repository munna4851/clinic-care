<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            // 🔗 users টেবিলের সাথে রিলেশন (লগইন অ্যাকাউন্ট কানেক্ট করার জন্য)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            
            // 📢 আপনার নতুন রিকোয়ারমেন্ট: ডাক্তারের নাম সরাসরি এই টেবিলে থাকবে
            $table->string('name'); 
            
            $table->string('specialization');
            $table->string('phone', 11)->unique(); // ১১ ডিজিটের ইউনিক মোবাইল নম্বর
            $table->string('email')->nullable(); // অপশনাল বা কন্টাক্ট ইমেইল
            $table->string('license_no')->unique(); // BMDC লাইসেন্স নম্বর
            $table->boolean('is_active')->default(true); // ডাক্তার একটিভ নাকি ইন-একটিভ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};