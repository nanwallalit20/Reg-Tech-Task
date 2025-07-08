<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Generate 10 fake products
        for ($i = 0; $i < 10; $i++) {
            Product::create([
                'name' => $faker->words(2, true), // Generate 2-word product names
                'price' => $faker->randomFloat(2, 10, 1000), // Random price between 10 and 1000
            ]);
        }
    }
}
