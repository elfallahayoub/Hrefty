<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                'description' => 'required|string',
                'montant' => 'required|numeric',
                'statut' => 'required|string|in:ecceptable,inacceptable,en_attente',
                'idDemande' => 'required|integer',
                'idArtisan' => 'required|integer',
                'dateCreation' => 'required|date',
            ]);
            $offre = new Offre();
            $offre->description = $vaildatedData['description'];
            $offre->montant = $vaildatedData['montant'];
            $offre->montant = $vaildatedData['montant'];
            $offre->statut = $vaildatedData['statut'];
            $offre->idDemande = $vaildatedData['idDemande'];
            $offre->idArtisan = $vaildatedData['idArtisan'];
            $offre->dateCreation = $vaildatedData['dateCreation'];
            $offre->save();
            return response()->json([
                'success' => true,
                'message' => 'Offre ajouté avec succée.',
                'data' => $offre
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
                'message' => "erreur dans l'ajout de offre.",
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
    public function update(Request $request, $id)
    {
        try {
            $offre = Offre::find($id);
            $vaildatedData = $request->validate([
                'statut' => 'required|string|in:acceptable,inacceptable',
            ]);
            if (!$offre) {
                return response()->json([
                    'success' => false,
                    'message' => 'Offre not found.'
                ], 404);
            }
            $offre->update([
                'statut' => $vaildatedData['statut']
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Offre updated successfully.',
                'data' => $offre
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating the offre.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $offre = Offre::find($id);
            if (!$offre) {
                return response()->json([
                    'success' => false,
                    'message' => 'Offre not found.'
                ], 404);
            }

            $offre->delete();

            return response()->json([
                'success' => true,
                'message' => 'Offre successfully removed.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting offre.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
