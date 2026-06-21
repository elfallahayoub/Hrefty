<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Client;
use App\Models\Technicien;
use App\Models\Admin;
use App\Models\Artisan;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'role' => 'required|in:admin,client,technicien',
        ]);

        $imageName = null;

        switch ($request->role) {
            case 'technicien':
                $request->validate([
                    'nom' => 'required|string',
                    'description' => 'required|string',
                    'adresse' => 'required|string',
                    'genre' => 'required|in:homme,femme',
                    'status' => 'required|in:actif,inactif',
                    'ville' => 'required|string',
                    'idSpecialite' => 'required|integer',
                    'telephone' => 'required|string',
                    'photo' => 'required|image|mimes:jpg,png,jpeg',
                    'email' => 'required|string|email|unique:users',
                    'password' => 'required|string|min:6',
                ]);
                if ($request->hasFile('photo')) {
                    $image = $request->file('photo');
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('uploads/techniciensPhoto'), $imageName);
                }
                break;

            case 'admin':
                $request->validate([
                    'nom' => 'required|string',
                ]);
                break;

            default:
                $request->validate([
                    'nom' => 'required|string',
                    'genre' => 'required|in:homme,femme',
                    'telephone' => 'required|string',
                    'ville' => 'required|string',
                    'photo' => 'required|image|mimes:jpg,png,jpeg',
                    'email' => 'required|string|email|unique:users',
                    'password' => 'required|string|min:6',
                ]);
                if ($request->hasFile('photo')) {
                    $image = $request->file('photo');
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('uploads/clientsPhoto'), $imageName);
                }
                break;
        }

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);


        switch ($user->role) {
            case 'client':
                Client::create([
                    'idUser' => $user->id,
                    'nom' => $request->nom,
                    'genre' => $request->genre,
                    'photo' => 'uploads/clientsPhoto/' . $imageName,
                    'telephone' => $request->telephone,
                    'ville' => $request->ville
                ]);
                break;
            case 'technicien':
                Artisan::create([
                    'idUser' => $user->id,
                    'nom' => $request->nom,
                    'genre' => $request->genre,
                    'telephone' => $request->telephone,
                    'ville' => $request->ville,
                    'photo' => 'uploads/techniciensPhoto/' . $imageName,
                    'adresse' => $request->adresse,
                    'status' => $request->status,
                    'idSpecialite' => $request->idSpecialite,
                    'description' => $request->description,
                ]);


                break;
            case 'admin':
                Admin::create([
                    'idUser' => $user->id,
                    'nom' => $request->nom
                ]);
                break;
        }

        $token = $user->createToken('authToken')->plainTextToken;

        switch ($user->role) {
            case 'client':
                $user->load('client');
                break;
            case 'technicien':
                $user->load('artisan');
                break;
            case 'admin':
                $user->load('admin');
                break;
        }


        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $request->email)->first();

        switch ($user->role) {
            case 'client':
                $user->load('client');
                break;
            case 'technicien':
                $user->load('artisan.specialite');
                break;
            case 'admin':
                $user->load('admin');
                break;
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }


    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
