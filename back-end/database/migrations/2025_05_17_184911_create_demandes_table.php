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
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('adresse');
            $table->text('description');
            $table->float('budget');
            $table->string('telephone');
            $table->string('photo');
            $table->string('ville');
            $table->dateTime('dateExecution');
            $table->unsignedBigInteger('category');
            $table->enum('status', ['en_cours', 'en_attente', 'Annulé']);
            $table->dateTime('dateCreation');
            $table->unsignedBigInteger('idClient');
            $table->timestamps();

            $table->foreign('idClient')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('category')->references('id')->on('specialites')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
