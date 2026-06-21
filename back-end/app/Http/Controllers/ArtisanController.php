<?php

namespace App\Http\Controllers;

use App\Models\Artisan;
use App\Models\Demande;
use App\Models\Offre;
use Illuminate\Http\Request;

class ArtisanController extends Controller
{
    public function statistiques(Request $request)
    {
        try {
            $artisanId = $request->input('artisanId');

            $totalOffres = Offre::where('idArtisan', $artisanId)->count();
            $totalDemandeFaire = Offre::where('idArtisan', $artisanId)
                ->where('statut', 'acceptable')
                ->count();
            return response()->json([
                'success' => true,
                'message' => 'Statistiques list successfully retrieved.',
                'data' => [
                    'totalOffres' => $totalOffres,
                    'totalDemandeFaire' => $totalDemandeFaire,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving statistiques.',
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
            $artisans = Artisan::with(['specialite', 'offres.demande.client', 'user'])->get();

            return response()->json([
                'success' => true,
                'message' => 'Artisan list successfully retrieved.',
                'data' => $artisans
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving artisans.',
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $artisan = Artisan::with(['user', 'specialite'])->where('idUser', '=', $id)->first();
            if (!$artisan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Artisan not found.'
                ], 404);
            }
            return response()->json([
                'success' => true,
                'message' => 'Artisan information successfully retrieved.',
                'data' => $artisan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving artisan.',
                'error' => $e->getMessage()
            ], 500);
        }
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
            $technicien = Artisan::find($id);
            if (!$technicien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Technicien not found.'
                ], 404);
            }
            $technicien->update([
                'status' => $request->status
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Technicien updated successfully.',
                'data' => $technicien
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating the technicien.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $technicien = Artisan::find($id);
            if (!$technicien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Technicien not found.'
                ], 404);
            }

            $technicien->delete();

            return response()->json([
                'success' => true,
                'message' => 'Technicien deleted successfully.',
                'data' => Artisan::all()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting the technicien.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
