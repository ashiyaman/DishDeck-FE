import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchRecipeById } from './recipeSlice';
import  isActualImage  from '../../utils/ValidationUtils';

const RecipeDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const recipeId = location.state?.recipeId;
    const { selectedRecipe, status } = useSelector((state) => state.recipes);

    useEffect(() => {
        if (recipeId) {
            dispatch(fetchRecipeById(recipeId));
        }
    }, [dispatch, recipeId]);

    return (
        <main className='container'>
            {status === "loading" && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
            {status === 'success' && selectedRecipe && (
                <div className='my-4 py-2'>
                    <h1 style={{ color: '#007bff', fontWeight: 'bold' }}>{selectedRecipe.name}</h1>
                    <div
                        className='row border-2 my-4'
                        style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            minHeight: '40vh',
                        }}
                    >
                        <div
                            className='col-md-6 d-flex align-items-stretch'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={isActualImage(selectedRecipe.image) ? 
                                    selectedRecipe.image : 'https://placehold.co/600x400'}
                                className='img-fluid rounded w-100'
                                alt={selectedRecipe.name}
                                style={{
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}
                            />
                        </div>
                        <div className='col-md-6 border-2' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <h4 style={{ fontSize: '1.2rem' }}>🥘 Cuisine: {selectedRecipe.cuisine}</h4>
                            {selectedRecipe.details && <p>{selectedRecipe.details}</p>}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>
                                    <strong>⏳ Prep Time:</strong> {selectedRecipe.prepTime}
                                </span>
                                <span>
                                    <strong>Cooking Time:</strong> {selectedRecipe.cookingTime}
                                </span>
                            </div>
                            <p>
                                <strong>🍽 Servings:</strong> {selectedRecipe.servings}
                            </p>
                            <section className='my-2'>
                                <h5>Ingredients:</h5>
                                <div>
                                    {selectedRecipe.ingredients.map((ingredient, index) => (
                                        <span key={index}>{ingredient}, </span>
                                    ))}
                                </div>
                            </section>
                            <section className='my-2'>
                                <h5>Instructions: </h5>
                                <ol>
                                    {selectedRecipe.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ol>
                            </section>
                            {selectedRecipe?.nutrition && (
                                <section className='my-2 mb-4'>
                                    <h5>Nutrition: </h5>
                                    <div>
                                        {Object.entries(selectedRecipe.nutrition).map(([key, value]) => (
                                            <p key={key}>
                                                {key}: {value}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default RecipeDetail;
