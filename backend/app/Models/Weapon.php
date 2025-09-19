<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weapon extends Model
{
    protected $fillable = [
        'name',
        'weapon_type',
        'attack_type',
        'requirements',
        'damage',
        'damage_reduction',
        'bonus',
        'weight',
        'durability',
        'image',
        'enchantable',
        'special',
    ];

    protected $casts = [
        'requirements' => 'array',
        'damage' => 'array',
        'damage_reduction' => 'array',
        'bonus' => 'array',
        'image' => 'string',
        'upgrade_paths' => 'array',
    ];
}
