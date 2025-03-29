import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import { fetchRecipeById } from "./recipeSlice"

const RecipeDetail = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const recipeId = location.state?.recipeId
    const {selectedRecipe, status, error} = useSelector(state => state.recipes)
    
    useEffect(() => {
        if(recipeId){
            dispatch(fetchRecipeById(recipeId))  
        }          
    }, [dispatch, recipeId])
    return (
        <main className='container'>
            {status === 'success' && selectedRecipe &&
                <div className='my-4'>
                    <h1>{selectedRecipe.name}</h1>
                    <div className='row border-2' style={{height: '20vh'}}>
                        <div className='col-md-4 ' >
                            <img src='https://placehold.co/' className='img-fluid' alt={selectedRecipe.name}/>
                        </div>
                        <div className='col-md-8 border-2'>
                            <h4>Cuisine: {selectedRecipe.cuisine}</h4>
                            <section className='my-2'>
                                <h5>Ingredients:</h5>
                                <div>{selectedRecipe.ingredients.map(ingredient => 
                                    <span>{ingredient.amount} {ingredient.name}, </span>
                                )}</div>
                            </section>
                            <section className='my-2'>
                                <h5>Instructions: </h5>
                                <ol>
                                    {selectedRecipe.instructions.map(instruction => 
                                        <li>{instruction}</li>
                                    )}
                                </ol>
                            </section>
                        </div>
                    </div>
                </div>
            }
            
        </main>
    )
}

export default RecipeDetail