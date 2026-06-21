<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $demandes = Demande::with([
                'category',
                'offres.artisan.specialite',
                "client.user"
            ])->get();
            return response()->json([
                'success' => true,
                'message' => 'Demande list successfully retrieved.',
                'data' => $demandes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving demandes.',
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
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'category' => 'required|integer',
            'description' => 'required|string',
            'budget' => 'required|numeric',
            'status' => 'required|string|in:en_cours,en_attente,Annulé',
            'telephone' => 'required|string|max:16',
            'photo' => 'required|image|mimes:jpg,png,jpeg',
            'dateExecution' => 'required|date',
            'idClient' => 'required|integer',
        ]);

        $demande = new Demande();
        $demande->titre = $validatedData['titre'];
        $demande->adresse = $validatedData['adresse'];
        $demande->ville = $validatedData['ville'];
        $demande->category = $validatedData['category'];
        $demande->budget = intval($validatedData['budget']);
        $demande->status = $validatedData['status'];
        $demande->description = $validatedData['description'];
        $demande->telephone = $validatedData['telephone'];
        $demande->dateExecution = $validatedData['dateExecution'];
        $demande->idClient = $validatedData['idClient'];

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $uploadPath = public_path('uploads/demandes_images');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0777, true); // créer le dossier si nécessaire
            }
            $image->move(public_path('uploads/demandes_images'), $imageName);
            $demande->photo = 'uploads/demandes_images/' . $imageName;
        }

        $demande->save();

        return response()->json([
            'success' => true,
            'message' => 'Demande ajoutée avec succès.',
            'data' => $demande
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation.',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
    \Log::error('Erreur Demande Store: ' . $e->getMessage());
    return response()->json([
        'success' => false,
        'message' => "erreur dans l'ajout de demande.",
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
            $demande = Demande::find($id);
            if (!$demande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Demande not found.'
                ], 404);
            }
            $demande->update([
                'status' => $request->status
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Demande updated successfully.',
                'data' => $demande
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating the demande.',
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
            $demande = Demande::find($id);
            if (!$demande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Demande not found.'
                ], 404);
            }

            $demande->delete();

            return response()->json([
                'success' => true,
                'message' => 'Demande successfully removed.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting demande.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
