<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre',
        'adresse',
        'description',
        'budget',
        'telephone',
        'photo',
        'dateExecution',
        'category',
        'status',
        'dateCreation',
        'idClient'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class, 'idClient', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Specialite::class, 'category', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'idClient');
    }
    public function offres()
    {
        return $this->hasMany(Offre::class, 'idDemande', 'id');
    }
}
