<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'genre',
        'telephone',
        'email',
        'ville',
        'password',
        'photo',
        'idUser',
    ];
    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
    public function demandes()
    {
        return $this->hasMany(Demande::class, 'idClient', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'id');
    }
}
