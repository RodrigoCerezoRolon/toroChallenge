<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pizza1 = new \App\Models\Pizza();
        $pizza1->name = 'The Fun Pizza';
        $pizza1->selling_price=7.5;
        $pizza1->save();

        $pizza2 = new \App\Models\Pizza();
        $pizza2->name = 'The Super Mushroom Pizza';
        $pizza2->selling_price=5.25;
        $pizza2->save();

        $pizza1->ingredients()->attach([1,2,3,4,5]);
        $pizza2->ingredients()->attach([1,7,5,2,6]);
    }
}
