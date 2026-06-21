<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialite extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom'
    ];
    public function artisan()
    {
        return $this->hasOne(Artisan::class, 'idSpecialite', 'id');
    }
    public function demandes()
    {
        return $this->hasMany(Demande::class, 'category', 'id');
    }
    
}
