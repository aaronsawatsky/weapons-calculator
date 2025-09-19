<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Weapon; 
use Illuminate\Support\Str;

class WeaponsTableSeeder extends Seeder
{
    public function run(): void
    {
        $weaponsJsonPath = database_path('data/weapons.json');
        $specialWeaponsJsonPath = database_path('data/specialWeapons.json');

        $weapons = json_decode(file_get_contents($weaponsJsonPath), true);
        $specialWeapons = json_decode(file_get_contents($specialWeaponsJsonPath), true);

        foreach ($weapons as $weapon) {
            $upgradePaths = [];
            $special = false;
            $enchantable = false;

            if (in_array($weapon['name'], $specialWeapons['twinkling_titanite'])) {
                $special = true;
                $enchantable = false;
                $upgradePaths[] = 'twinkling_titanite';
            }

            if (in_array($weapon['name'], $specialWeapons['demon_titanite'])) {
                $special = true;
                $enchantable = false;
                $upgradePaths[] = 'demon_titanite';
            }

            if (in_array($weapon['name'], $specialWeapons['dragon_scales'])) {
                $special = true;
                $enchantable = false;
                $upgradePaths[] = 'dragon_scales';
            }

            if (! $special) {
                $special = false;
                $enchantable = true;
                $upgradePaths = ['regular', 'raw', 'crystal', 'lightning', 'magic', 'enchanted', 'divine', 'occult', 'fire', 'chaos'];
            }

            Weapon::create([
                'name' => $weapon['name'],
                'weapon_type' => $weapon['weapon_type'],
                'attack_type' => $weapon['attack_type'],
                'requirements' => $weapon['requirements'],
                'damage' => $weapon['damage'],
                'damage_reduction' => $weapon['damage_reduction'],
                'bonus' => $weapon['bonus'],
                'weight' => $weapon['weight'],
                'durability' => $weapon['durability'],
            
                'image' => '/images/weapons/' . Str::of($weapon['name'])
                    ->lower()
                    ->replace(["'"], '') 
                    ->replace([' ', '-', '(', ')'], '_')
                    ->__toString() . '.png',
                
                'special' => $special,
                'enchantable' => $enchantable,
                'upgrade_paths' => $upgradePaths,
            ]);
        }

        $this->command->info(count($weapons) . ' weapons seeded!');
    }
}