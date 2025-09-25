<?php

namespace App\Http\Controllers;

use App\Models\Weapon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class WeaponController extends Controller
{
    public function index(Request $request)
    {
        
        $query = Weapon::query();

        $weaponTypes = array_filter(Arr::wrap($request->input('weapon_type')));
        if (!empty($weaponTypes)) {
            $query->whereIn('weapon_type', $weaponTypes);
        }
        
        $attackTypes = array_filter(Arr::wrap($request->input('attack_type')));
        if (!empty($attackTypes)) {
            $query->where(function ($q) use ($attackTypes) {
                foreach ($attackTypes as $attackType) {
                    $q->orWhere('attack_type', 'like', '%' . $attackType . '%');
                }
            });
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

    public function categories()
    {
        return response()->json([
            'weapon_types' => Weapon::query()->distinct()->pluck('weapon_type')->sort()->values(),
            'attack_types' => Weapon::query()->distinct()->pluck('attack_type')->sort()->values(),
        ]);
    }
}