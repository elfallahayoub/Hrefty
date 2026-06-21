<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    protected $except = [
        'api/*',      // Exclut les routes api de la vérif CSRF
        'login',      // Exclut login (si tu le souhaites)
        'register',   // Exclut register (idem)
        // ajoute ici d'autres routes à exclure si besoin
    ];
}
