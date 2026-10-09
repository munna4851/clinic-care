<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctor_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctor_id'); 
            $table->tinyInteger('day_of_week')->comment('0=Sun to 6=Sat'); 
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('slot_duration')->default(15)->comment('In minutes'); 
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctor_schedules');
    }
};