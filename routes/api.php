<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::middleware('api')->group(function () {
    Route::post('/register', [LoginRegisterController::class, 'register']);
    Route::post('/login', [LoginRegisterController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [LoginRegisterController::class, 'getUser']);
        Route::get('/products', [ProductController::class, 'index']);
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/checkout', [OrderController::class, 'store']);
        Route::post('/logout', [LoginRegisterController::class, 'logout']);
    });
});
