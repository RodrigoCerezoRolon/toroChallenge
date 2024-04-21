<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingredient;
use App\Models\Pizza;
use Inertia\Inertia;
class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ingredients=Ingredient::orderby('name',"ASC")->get();
        $pizzas = Pizza::all();
        foreach ($pizzas as $pizza) {
            $pizza->load('ingredients');
            
        }
       
        return Inertia::render('Orders/CreateOrder',[
            'ingredients'=>$ingredients,
            'pizzas'=> $pizzas
        ]);
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       
        $pizza=Pizza::find($id);
        $pizza->ingredients()->sync(collect($request->ingredients)->pluck('id'));
        $ingredientsPriceSum = $pizza->ingredients->sum('cost_price');
        $totalWith50Percent = $ingredientsPriceSum * 1.5; // Aumenta el 50%
        $pizza->selling_price=$totalWith50Percent;
        $pizza->update();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
