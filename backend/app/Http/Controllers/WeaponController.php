<?php

namespace App\Http\Controllers;

use App\Models\Weapon;
use Illuminate\Http\Request;

class WeaponController extends Controller
{
    public function index(Request $request)
    {
        
        $query = Weapon::query();

        if ($weaponType = $request->string('weapon_type')->toString()) {
            $query->where('weapon_type', $weaponType);
        }

        if ($attackType = $request->string('attack_type')->toString()) {
            $query->where('attack_type', 'like', '%' . $attackType . '%');
        }

        $weapons = $query->paginate($request->integer('per_page', 12));
        
        return response()->json([
            'data' => $weapons->items(),
            'meta' => [
                'current_page' => $weapons->currentPage(),
                'per_page' => $weapons->perPage(),
                'total' => $weapons->total(),
                'total_pages' => $weapons->lastPage(),
                'has_next_page' => $weapons->hasMorePages(),
                'has_prev_page' => $weapons->currentPage() > 1,
            ]
        ]);
    }

    public function show($id)
    {
        return Weapon::findOrFail($id);
    }
}