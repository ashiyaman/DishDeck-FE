import { useEffect, useState } from 'react'
import { deleteRecipeById, fetchRecipeById, fetchRecipes } from './recipeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isActualImage } from '../../utils/ValidationUtils'
import AlertMessage from '../../components/AlertMessage'

const Recipes = () => {
    const dispatch = useDispatch()
    const {filteredRecipes, status} = useSelector(state => state.recipes)

    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch])

    const deleteHandler = (recipeId) => {
      setSuccess(null)
      setError(null)
      dispatch(deleteRecipeById(recipeId))
      .then(result => {
        if(deleteRecipeById.fulfilled.match(result)){
          setSuccess(`Recipe Deleted Successfully!!!`)
        }
      })
      
    };

    return (
      <main className="container">
        <div>
          <h1 className="my-3 text-primary">Recipes</h1>
          {status === "loading" && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {success && <AlertMessage type='primary' message={success}/>}
          <div className="row">
            {status === "success" &&
              filteredRecipes.map((recipe) => (
                <div key={recipe._id} className="col-md-3 my-3">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={ isActualImage(recipe.image)                         
                          ? recipe.image
                          : "https://placehold.co/600x500"
                      }
                      className="img-fluid card-img-top"
                      alt={recipe.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{recipe.name}</h5>
                      <p className="card-text">
                        <span className="badge bg-primary p-2 fw-normal text-light">
                          <strong>🥘 Cuisine:</strong> {recipe.cuisine}
                        </span>
                      </p>
                      <p className="card-text">
                        <strong>Ingredients: </strong>
                        <Link
                          to={`/recipes/${recipe._id}`}
                          state={{ recipeId: recipe._id }}
                        >
                          See Recipe
                        </Link>
                      </p>
                      <p className="card-text">
                        <strong>Instructions: </strong>
                        <Link
                          to={`/recipes/${recipe._id}`}
                          state={{ recipeId: recipe._id }}
                        >
                          See Recipe
                        </Link>
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(recipe._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    );
}

export default Recipes