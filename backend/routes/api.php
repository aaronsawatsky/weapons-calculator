<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeaponController;

Route::get('/weapons', [WeaponController::class, 'index']);
Route::get('/weapons/{id}', [WeaponController::class, 'show']);