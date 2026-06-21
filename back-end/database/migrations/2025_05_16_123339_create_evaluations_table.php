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
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->enum('note', ['1', '2', '3', '4', '5']);
            $table->text('commentaire');
            $table->unsignedBigInteger('idClient');
            $table->unsignedBigInteger('idArtisan');
            $table->dateTime('dateCreation');
            $table->timestamps();

            $table->foreign('idClient')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('idArtisan')->references('id')->on('artisans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
