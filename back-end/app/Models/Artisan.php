<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artisan extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'description',
        'ville',
        'photo',
        'adresse',
        'genre',
        'status',
        'password',
        'email',
        'idSpecialite',
        'telephone',
        'idUser',
    ];
    public function offres()
    {
        return $this->hasMany(Offre::class, 'idArtisan', 'id');
    }
    public function specialite()
    {
        return $this->belongsTo(Specialite::class, 'idSpecialite', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'id');
    }
    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
