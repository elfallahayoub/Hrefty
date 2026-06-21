<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;
    protected $fillable = [
        'note',
        'commentaire',
        'idClient',
        'idArtisan',
        'dateCreation'
    ];
public function client()
{
    return $this->belongsTo(Client::class, 'idClient');
}

public function technicien()
{
    return $this->belongsTo(Artisan::class, 'idArtisan');
}

}
