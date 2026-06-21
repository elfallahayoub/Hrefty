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
        Schema::create('artisans', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('photo');
            $table->string('description');
            $table->string('adresse');
            $table->enum('genre', ['homme', 'femme']);
            $table->enum('status', ['actif', 'inactif']);
            $table->string('ville');
            $table->unsignedBigInteger('idSpecialite');
            $table->string('telephone');
            $table->unsignedBigInteger('idUser');
            $table->timestamps();

            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idSpecialite')->references('id')->on('specialites')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artisans');
    }
};
