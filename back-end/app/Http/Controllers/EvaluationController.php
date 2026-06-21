<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    public function moyenneNoteArtisan(Request $request)
    {
        try {
            $userId = $request->input('userId');
            $moyenne = Evaluation::whereHas('technicien.user', function ($query) use ($userId) {
                $query->where('id', $userId);
            })->avg('note');
            return response()->json([
                'success' => true,
                'message' => 'moyenne successfully retrieved.',
                'data' => round($moyenne)

            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving moyenne.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $evaluations = Evaluation::with([
                'client',
                'technicien.user'
            ])->get();
            return response()->json([
                'success' => true,
                'message' => 'Evaluations list successfully retrieved.',
                'data' => $evaluations
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving evaluations.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $vaildatedData = $request->validate([
                'note' => 'required|integer|in:1,2,3,4,5',
                'comment' => 'required|string|max:500',
                'idClient' => 'required|integer',
                'idArtisan' => 'required|integer',
                'dateCreation' => 'required|date',
            ]);
            $evaluation = new Evaluation();
            $evaluation->note = $vaildatedData['note'];
            $evaluation->commentaire = $vaildatedData['comment'];
            $evaluation->idClient = $vaildatedData['idClient'];
            $evaluation->idArtisan = $vaildatedData['idArtisan'];
            $evaluation->dateCreation = $vaildatedData['dateCreation'];
            $evaluation->save();
            return response()->json([
                'success' => true,
                'message' => 'Evaluation ajouté avec succée.',
                'data' => $evaluation
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'erreur de validation.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "erreur dans l'ajout de evaluation.",
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
