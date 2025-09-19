<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weapons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('weapon_type');
            $table->string('attack_type')->nullable();
            $table->json('requirements');
            $table->json('damage');
            $table->json('damage_reduction')->nullable();
            $table->json('bonus')->nullable();
            $table->float('weight');
            $table->integer('durability');
            $table->timestamps();
            $table->string('image')->nullable();
            $table->boolean('enchantable')->default(true);
            $table->boolean('special')->default(false);
            $table->json('upgrade_paths')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weapons');
    }
};