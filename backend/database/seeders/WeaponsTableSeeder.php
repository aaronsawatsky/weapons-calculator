<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Weapon; 

class WeaponsTableSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = database_path('data/weapons.json');
        $weapons = json_decode(file_get_contents($jsonPath), true);

        foreach ($weapons as $weapon) {
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
            ]);
        }

        $this->command->info(count($weapons) . ' weapons seeded!');
    }
}