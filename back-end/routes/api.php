<?php

use App\Http\Controllers\AdsController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OffreAcceptController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\SpecialiteController;
use App\Models\Specialite;
use Illuminate\Support\Facades\Route;

Route::controller(DemandeController::class)->group(function () {
    Route::options('/demande', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
    Route::post('/demande', 'store');
    Route::put('/demande/{id}', 'update');
    Route::delete('/demande/{id}', 'destroy');
    Route::get('/demande', 'index');
});
Route::controller(EvaluationController::class)->group(function () {
    Route::options('/evaluation', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
    Route::get('/evaluation', 'index');
    Route::post('/evaluation/moyenne', 'moyenneNoteArtisan');
    Route::post('/evaluation', 'store');
});
Route::controller(SpecialiteController::class)->group(function () {
    Route::options('/specialite', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
    Route::get('/specialite', 'index');
});
Route::controller(ArtisanController::class)->group(function () {
    Route::options('/artisan', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
    Route::get('/artisan', 'index');
    Route::post('/artisan/statistiques', 'statistiques');
    Route::get('/artisan/{id}', 'show');
    Route::put('/artisan/{id}', 'update');
});
Route::controller(OffreController::class)->group(function () {
    Route::options('/offre', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
    Route::post('/offre', 'store');
    Route::put('/offre/{id}', 'update');
    Route::delete('/offre/{id}', 'destroy');
});
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});
Route::controller(AdsController::class)->group(function () {
    Route::post('/ads', 'store');
    Route::get('/ads', 'index');
    Route::delete('/ads/{id}', 'destroy');
    Route::put('/ads/{id}', 'update');
});
Route::get('/', function () {
    return response()->json(['message' => 'API is working']);
});

Route::middleware('auth:sanctum')->controller(AuthController::class)->group(function () {
    Route::get('/me', 'me');
    Route::post('/logout', 'logout');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::controller(ConversationController::class)->group(function () {
        Route::get('/conversations', 'index');
        Route::post('/conversations', 'store');
        Route::get('/conversations/{id}', 'show');
    });

    Route::controller(MessageController::class)->group(function () {
        Route::get('/conversations/{conversationId}/messages', 'index');
        Route::post('/messages', 'store');
    });
});
