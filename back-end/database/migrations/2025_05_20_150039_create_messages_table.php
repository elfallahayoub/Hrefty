b<?php

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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('idExpediteur');
            $table->integer('idDestinataire');
            $table->enum('expediteurType', ['client', 'artisan']);
            $table->text('message');
            $table->unsignedBigInteger('idConversation');
            $table->boolean('lire');
            $table->dateTime('dateCreation');
            $table->timestamps();

            $table->foreign('idConversation')->references('id')->on('conversations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
