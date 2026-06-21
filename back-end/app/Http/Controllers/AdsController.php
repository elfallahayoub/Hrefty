<?php

namespace App\Http\Controllers;

use App\Models\Ads;
use Illuminate\Http\Request;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $ads = Ads::all();
            return response()->json([
                'success' => true,
                'message' => 'Acs list successfully retrieved.',
                'data' => $ads
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving ads.',
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
            // Validation des données
            $validatedData = $request->validate([
                'link' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpg,png,jpeg|max:2048', // Optionnel : limite de taille 2MB
            ]);

            // Traitement de l'image
            $imageName = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads/ads'), $imageName);
            }

            // Création de la publicité
            $ads = new Ads();
            $ads->link = $validatedData['link'];
            $ads->actif = true;
            $ads->image = 'uploads/ads/' . $imageName;
            $ads->save();

            return response()->json([
                'success' => true,
                'message' => 'Publicité ajoutée avec succès.',
                'data' => $ads
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout de la publicité.',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(), // Supprime ça en production
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
            $ads = Ads::findOrFail($id);

            $validatedData = $request->validate([
                'actif' => 'required|boolean',
            ]);

            $ads->actif = $validatedData['actif'];
            $ads->save();

            return response()->json([
                'success' => true,
                'message' => 'Publicité mise à jour avec succès.',
                'data' => $ads
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour.',
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
            $ads = Ads::findOrFail($id);

            $ads->delete();

            return response()->json([
                'success' => true,
                'message' => 'Publicité supprimée avec succès.',
                'data' => ['id' => $id]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
