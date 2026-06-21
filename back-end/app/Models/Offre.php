<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'montant',
        'statut',
        'idDemande',
        'idArtisan',
        'dateCreation'
    ];
    public function artisan()
    {
        return $this->belongsTo(Artisan::class, 'idArtisan');
    }
    public function demande()
    {
        return $this->belongsTo(Demande::class, 'idDemande', 'id');
    }
    public function conversations()
    {
        return $this->hasMany(Conversation::class, 'idOffre', 'id');
    }
}
