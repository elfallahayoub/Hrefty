<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // جلب كل الرسائل لمحادثة معينة
    public function index($conversationId)
    {
        $messages = Message::where('idConversation', $conversationId)
            ->orderBy('dateCreation', 'asc')
            ->get();

        return response()->json($messages);
    }

    // إرسال رسالة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'idConversation' => 'required|exists:conversations,id',
            'idDestinataire' => 'required|exists:users,id',
            'expediteurType' => 'required|in:client,artisan',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'idExpediteur' => Auth::id(),
            'idDestinataire' => $request->idDestinataire,
            'expediteurType' => $request->expediteurType,
            'message' => $request->message,
            'idConversation' => $request->idConversation,
            'lire' => false,
            'dateCreation' => now(),
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
