<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginRegisterController extends Controller
{
    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);


            $this->guard()->login($user);

            $user->token = $user->createToken('authToken')->plainTextToken;

            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Registration failed. Please try again.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Authenticate the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            $user->tokens()->delete();

            $user->token = $user->createToken('authToken')->plainTextToken;

            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Login failed. Please try again.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getUser()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }
}
