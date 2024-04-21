<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ingredient;
class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ingredient::truncate();

        $ingredients = [
            ['name' => 'Tomato', 'cost_price' => 0.5],
            ['name' => 'Sliced Mushrooms', 'cost_price' => 0.5],
            ['name' => 'Feta Cheese', 'cost_price' => 1.0],
            ['name' => 'Sausages', 'cost_price' => 1.0],
            ['name' => 'Sliced Onion', 'cost_price' => 0.5],
            ['name' => 'Mozzarella Cheese', 'cost_price' => 0.5],
            ['name' => 'Oregano', 'cost_price' => 1.0],
            ['name' => 'Bacon', 'cost_price' => 1.0],
        ];

        Ingredient::insert($ingredients);
    }
}
