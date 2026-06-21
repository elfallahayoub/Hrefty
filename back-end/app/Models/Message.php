<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'idExpediteur',
        'idDestinataire',
        'expediteurType',
        'message',
        'idConversation',
        'lire',
        'dateCreation',
    ];
    public function conversation()
    {
        return $this->belongsTo(Conversation::class, 'idConversation');
    }
    public function expediteur()
    {
        return $this->belongsTo(User::class, 'idExpediteur');
    }

    public function destinataire()
    {
        return $this->belongsTo(User::class, 'idDestinataire');
    }
}
