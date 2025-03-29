import { useEffect } from "react"
import { deleteRecipeById, fetchRecipeById, fetchRecipes } from "./recipeSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Recipes = () => {
    const dispatch = useDispatch()
    const {recipes, status, error} = useSelector(state => state.recipes)

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch])

    const deleteHandler = (recipeId) => {
        dispatch(deleteRecipeById(recipeId))
    }

    return (
        <main className='container'>
            <div>
                <h1 className='my-3'>Recipes</h1>
                <div className='row'>
                    {status === 'success' &&
                        recipes.map(recipe => (
                            <div key={recipe._id} className='col-md-3 my-3'>
                                <div className='card' style={{height: '400px'}}>
                                    <div className='card-img-top'>
                                        <img src={'../images/Neapolitan_Pizza.avif' || 'https://placehold.co/600x500'} 
                                            className='img-fluid' alt={recipe.name}/>
                                    </div>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{recipe.name}</h5>
                                        <p className='card-text'><strong>🥘Cuisine: </strong>{recipe.cuisine}</p>
                                        <p className='card-text'><strong>Ingredients: </strong>
                                            <Link to={`/recipes/${recipe._id}`} state={{recipeId: recipe._id}}>See Recipe</Link>
                                        </p>
                                        <p className='card-text'><strong>Instructions: </strong>
                                            <Link  to={`/recipes/${recipe._id}`}state={{recipeId: recipe._id}}>See Recipe</Link>
                                        </p>
                                        <button className='btn btn-danger' onClick={() => deleteHandler(recipe._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default Recipes