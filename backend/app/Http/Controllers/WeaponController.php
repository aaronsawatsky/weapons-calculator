<?php

namespace App\Http\Controllers;

use App\Models\Weapon;
use Illuminate\Http\Request;

class WeaponController extends Controller
{
    public function index()
    {
        return Weapon::all();
    }

    public function show($id)
    {
        return Weapon::findOrFail($id);
    }
}