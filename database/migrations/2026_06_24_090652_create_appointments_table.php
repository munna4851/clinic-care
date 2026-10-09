<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            // 🎯 রিলেশনের সব কলামকে শুধু unsignedBigInteger রাখা হলো
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('doctor_id'); 
            
            $table->string('appointment_code');
            $table->string('patient_name');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('patient_mobile');
            $table->string('patient_email')->nullable();
            $table->string('address')->nullable();
            $table->date('dob');
            $table->integer('serial_no'); //
            $table->date('appointment_date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->string('booking_source')->default('online');
            $table->string('status')->default('pending'); //
            $table->text('chief_complaint')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};