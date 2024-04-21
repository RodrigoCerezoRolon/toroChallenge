import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import IngredientList from './IngredientList';
import { Head } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { router } from '@inertiajs/react'

const CreateOrder = ({auth,pizzas,ingredients}) => {
   console.log(pizzas);
    const [pizzasState,setPizzas]=useState(pizzas);
    const [messageSuccess,setMessageSuccess]=useState(false);
    const [pizzaOriginalState,setPizzaOriginalState]=useState({
        name:'',
        id:null,
        ingredients:[]
    });
    const [changePizza,setEditing]=useState('');

    const [pizzaState,setPizza]= useState({
        name:'',
        id:null,
        ingredients:[],
        selling_price: null,
    });
    const handleIngredientChange = (ingredient,nameParam) => {
        // 1. Obtener el state actual de la pizza
        const { ingredients, name , id ,selling_price } = pizzaState;
        let otherPizzaData={ingredients,name,id,selling_price};
        if(ingredients.length==0){
            const newIngredient = { id: ingredient.id, name:ingredient.name,cost_price:ingredient.cost_price }; // Añade el nuevo ingrediente
          otherPizzaData.ingredients.push(newIngredient);
        }else{
            // 2. Identificar el índice del ingrediente seleccionado en el array de ingredientes
            const ingredientIndex = otherPizzaData.ingredients.findIndex(
                (ingredientState) => ingredientState.id === ingredient.id
            );
            
            // 3. Si el ingrediente está seleccionado, elimínalo del array
            // Si no está seleccionado, agrégalo al array
            if (ingredientIndex !== -1) {
                otherPizzaData.ingredients.splice(ingredientIndex, 1);
            } else {
                const newIngredient = { id: ingredient.id, name:ingredient.name }; // Añade el nuevo ingrediente
                otherPizzaData.ingredients.push(newIngredient);
            }
        }
       otherPizzaData.name=nameParam;
    
        // 4. Actualizar el state de la pizza usando `setPizzas`
        setPizza(otherPizzaData);
        console.log(otherPizzaData);
      };
    const handleElection = ({name,ingredients,id,selling_price}) =>{
        setPizzaOriginalState({ name, ingredients: [...ingredients],id:id,selling_price:selling_price });
        
        setPizza({name,ingredients,id,selling_price});
        setEditing(name);
        setMessageSuccess(false);
    }
    const handleCancel = () => {
        // 1. Iterate through the pizzasState array
        const updatedPizzasState = pizzasState.map((pizzaStateItem) => {
            if (pizzaStateItem.name === changePizza) {
              return pizzaOriginalState; // Replace with original state
            } else {
              return pizzaStateItem; // Keep other pizzas unchanged
            }
        });
        console.log(pizzaOriginalState);
        setPizzas(updatedPizzasState);
        setEditing(null);
      };
    const successMessage = ()=>{
        setEditing(false)
        setMessageSuccess(true);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(pizzaState.id);
        router.patch(route('orders.update',pizzaState.id),pizzaState,{onSuccess:()=>successMessage()})
    }
    useEffect(()=>{
        setPizzas(pizzas);
    },[messageSuccess])
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold">Customize your Pizza</h2>}>
        <Head title="Create Order" />
        {messageSuccess && (
            <div className="w-100 bg-green-500 text-white p-4 rounded text-center">
            <p>Pizza changed correctly!</p>
          </div>
        )}
        <div className="flex flex-wrap justify-center mt-5">
        <h3 className='text-danger w-full text-center my-5'>Choose the pizza that you want </h3>
       
        {pizzasState.map((pizza) => (
            <div key={pizza.id} className="ms-5 bg-white shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 mb-8">
            
            {changePizza==pizza.name ? (
            <form onSubmit={handleSubmit}>
           <h2 className="text-lg font-bold">{pizza.name}</h2>
            <ul className="list-disc list-outside ml-4">
                {/* {pizza.ingredients.map((ingredientPizza, index) => (
                <li key={ingredientPizza.id}>
                    <input type="checkbox" id={`ingredient-${index}`} defaultChecked/>
                    <label htmlFor={`ingredient-${index}`}>{ingredientPizza.name}</label>
                </li>
                ))} */}
                {ingredients.map((ingredient,index)=>(
                
                <li key={ingredient.id}>
                <input type="checkbox" onChange={() => handleIngredientChange(ingredient,pizza.name)} id={`ingredient-${index}`} defaultChecked={pizza.ingredients.some(ingredientPizza => ingredientPizza.id === ingredient.id)}/>
                <label htmlFor={`ingredient-${index}`}>{ingredient.name}</label>
                </li>
                ))}
            </ul>
            <button onClick={() => handleCancel()} className='btn lex w-50 me-3 mt-7 justify-center rounded-md bg-rose-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Cancel
                </button>
                <button type='submit' className='btn lex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Confirm
                </button>
            </form>        
            
              
            ):
            (
                <>
                  <h2 className="text-lg font-bold">{pizza.name}</h2>
                    <ul className="list-disc list-outside ml-4">
                    {pizza.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                    </ul>
                    <strong>Total Price: {pizza.selling_price} eur</strong>
                    <button onClick={() => handleElection(pizza)} className='btn lex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >Choose</button>
                </>
              
            )}
          
           
            </div>
        ))}
        
        </div>
       
    </AuthenticatedLayout>
  );
};

export default CreateOrder;