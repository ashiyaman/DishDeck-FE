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
                <div className='my-4 py-2'>
                    <h1>{selectedRecipe.name}</h1>
                    <div className='row border-2 my-4' style={{height: '20vh'}}>
                        <div className='col-md-4 ' >
                            <img src='https://placehold.co/' className='img-fluid' alt={selectedRecipe.name}/>
                        </div>
                        <div className='col-md-8 border-2'>
                            <h4>Cuisine: {selectedRecipe.cuisine}</h4>
                            {selectedRecipe.details && <p>{selectedRecipe.details}</p>}
                            <div className='d-flex justify-content-between'>
                                <span><strong>Prep Time:</strong> {selectedRecipe.prepTime}</span>
                                <span><strong>Cooking Time:</strong> {selectedRecipe.cookingTime}</span>
                            </div>
                            <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
                            <section className='my-2'>
                                <h5>Ingredients:</h5>
                                <div>{selectedRecipe.ingredients.map((ingredient, index) => 
                                    <span key={index}>{ingredient},</span>
                                )}</div>
                            </section>
                            <section className='my-2'>
                                <h5>Instructions: </h5>
                                <ol>
                                    {selectedRecipe.instructions.map((instruction, index) => 
                                        <li key={index}>{instruction}</li>
                                    )}
                                </ol>
                            </section>
                            {selectedRecipe?.nutrition &&
                                <section className='my-2 mb-4'>
                                <h5>Nutrition: </h5>
                                <div>
                                    {Object.entries(selectedRecipe.nutrition).map(([key, value]) => (
                                        <p>{key}: {value}</p>
                                    ))}
                                </div>
                            </section>}
                        </div>
                    </div>
                </div>
            }
            
        </main>
    )
}

export default RecipeDetail