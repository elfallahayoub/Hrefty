<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'idOffre',
        'dateDebut',
    ];
    public function offre()
    {
        return $this->belongsTo(Offre::class, 'idOffre', 'id');
    }
    public function messages()
    {
        return $this->hasMany(Message::class, 'idConversation');
    }
}
