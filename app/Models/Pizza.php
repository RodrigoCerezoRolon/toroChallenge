<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    public function ingredients() {
        return $this->belongsToMany(Ingredient::class, 'pizza_ingredients', 'pizza_id', 'ingredient_id')->orderby('name',"ASC");
    }
}
