<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role == 'technicien') {
            $conversations = Conversation::with(['offre.artisan.user', 'messages'])
                ->join('offres', 'conversations.idOffre', '=', 'offres.id')
                ->join('artisans', 'offres.idArtisan', '=', 'artisans.id')
                ->join('users', 'artisans.idUser', '=', 'users.id')
                ->where('users.id', $user->id)
                ->select('conversations.*')
                ->get();
        } else if ($user->role == 'client') {
            $conversations = Conversation::with(['offre.demande.client.user', 'messages'])
                ->join('offres', 'conversations.idOffre', '=', 'offres.id')
                ->join('demandes', 'offres.idDemande', '=', 'demandes.id')
                ->join('clients', 'demandes.idClient', '=', 'clients.id')
                ->join('users', 'clients.idUser', '=', 'users.id')
                ->where('users.id', $user->id) // filtrer par client connecté
                ->select('conversations.*')
                ->get();
        }

        return $conversations->map(function ($conv) use ($user) {
            if ($user->role == 'technicien') {
                $autreUser = $conv->offre->demande->client->user ?? null;
                $nomAutre = $conv->offre->demande->client->nom ?? $autreUser?->name ?? 'inconnu';
            } else if ($user->role == 'client') {
                $autreUser = $conv->offre->artisan->user ?? null;
                $nomAutre = $conv->offre->artisan->nom ?? $autreUser?->name ?? 'inconnu';
            }

            return [
                'id' => $conv->id,
                'idOffre' => $conv->idOffre,
                'nomAutreUtilisateur' => $nomAutre,
                'autreUserId' => $autreUser?->id,
                'expediteurType' => $user->role,
                'messages' => $conv->messages,
            ];
        });
    }




    public function store(Request $request)
    {
        $request->validate([
            'idOffre' => 'required|exists:offres,id',
            'dateDebut' => 'required|date',
        ]);

        $conversation = Conversation::create([
            'idOffre' => $request->idOffre,
            'dateDebut' => $request->dateDebut,
        ]);

        return response()->json($conversation);
    }

    public function show($id)
    {
        $conversation = Conversation::with('messages')->findOrFail($id);
        return response()->json($conversation);
    }
}
