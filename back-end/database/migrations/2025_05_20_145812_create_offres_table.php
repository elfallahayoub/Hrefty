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
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->float('montant');
            $table->enum('statut', ['acceptable', 'inacceptable', 'en_attente']);
            $table->unsignedBigInteger('idDemande');
            $table->unsignedBigInteger('idArtisan');
            $table->dateTime('dateCreation');
            $table->timestamps();

            $table->foreign('idArtisan')->references('id')->on('artisans')->onDelete('cascade');
            $table->foreign('idDemande')->references('id')->on('demandes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offres');
    }
};
