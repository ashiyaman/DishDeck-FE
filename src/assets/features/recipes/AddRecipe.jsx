import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addRecipe } from './recipeSlice'
import { useNavigate } from 'react-router-dom'

import isActualImage  from '../../utils/ValidationUtils'
import AlertMessage from '../../components/AlertMessage'

const AddRecipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [servings, setServings] = useState('')
    const [ingredientInput, setIngredientInput] = useState('')
    const [instructionInput, setInstructionInput] = useState('')
    const [nutritionInput, setNutritionInput] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [image, setImage] = useState('')
    const [instructions, setInstructions] = useState([])
    const [nutritionComponent, setNutritionComponent] = useState('calories')
    const [nutrition, setNutrition] = useState({})
    const [details, setDetails] = useState('')

    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const ingredientsHandler = (e) => {
        e.preventDefault()
        if (ingredientInput.trim() !== '') {
            setIngredients([...ingredients, ingredientInput.trim()])
            setIngredientInput('')
        }
    }

    const instructionsHandler = (e) => {
        e.preventDefault()
        if (instructionInput.trim() !== '') {
            setInstructions([...instructions, instructionInput.trim()])
            setInstructionInput('')
        }
    }

    const nutritionHandler = (e) => {
        e.preventDefault()
        if (nutritionInput) {
            setNutrition(prevValue => ({
                ...prevValue, 
                [nutritionComponent]: `${nutritionInput}g`
            }))
            setNutritionInput('')
        }
    }

    const formSubmitHandler = async(e) => {
        e.preventDefault()
        const isImage = await isActualImage(image)
        if (!isImage) {
            
            setError(`Please enter a valid image URL`)
            return
        }        

        const recipe = {
            name,
            cuisine,
            prepTime,
            cookingTime,
            servings,
            image,
            ingredients,
            instructions,
            nutrition,
            details
        }
        dispatch(addRecipe(recipe))
            .then(result => {
                if(addRecipe.fulfilled.match(result)){
                    setSuccess(`Recipe Added Successfully!!!`)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                }
                else{
                    setError('Failed to add recipe')
                }
            })
    }

    return (
        <main className='container'>
            <h2 className='my-3'>Add New Recipe</h2>
            {error !== null && 
                <AlertMessage type='danger' message={error} />
            }
            {success !== null && 
                <AlertMessage type='primary' message={success} />
            }
            <form onSubmit={formSubmitHandler} className='my-3'>
                <label htmlFor='name'>Name:</label><br/>
                <input className='form-control shadow-sm' required value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' /><br/>

                <label htmlFor='cuisineType'>Cuisine Type:</label><br/>
                <input className='form-control shadow-sm' required value={cuisine} onChange={(e) => setCuisine(e.target.value)} type='text' placeholder='Cuisine Type' /><br/>

                <label htmlFor='prepTime'>Prep Time:</label><br/>
                <input className='form-control shadow-sm' required value={prepTime} onChange={(e) => setPrepTime(e.target.value)} type='text' placeholder='Prep Time (e.g., 20 minutes)' /><br/>

                <label htmlFor='cookingTime'>Cooking Time:</label><br/>
                <input className='form-control shadow-sm' required value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} type='text' placeholder='Cooking Time (e.g., 40 minutes)' /><br/>

                <label htmlFor='servings'>Servings:</label><br/>
                <input className='form-control shadow-sm' required value={servings} onChange={(e) => setServings(e.target.value)} type='number' placeholder='Servings (e.g., 2 or 4 persons)' /><br/>

                <label htmlFor='image'>Image URL:</label><br/>
                <input className='form-control shadow-sm' required value={image} onChange={(e) => setImage(e.target.value)} type='text' placeholder='Image URL' /><br/>

                <label htmlFor='ingredients'>Ingredients:</label><br/>
                <div className='d-flex'>
                    <input className='form-control shadow-sm'  type='text' value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} placeholder='Ingredient (e.g., 1 cup onion sliced)' />
                    <button className='btn btn-primary shadow' onClick={ingredientsHandler}> + </button>
                </div><br/>
                <ol>
                    {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                </ol><br/>

                <label htmlFor='instructions'>Instructions:</label><br/>
                <div className='d-flex'>
                    <input className='form-control shadow-sm'  type='text' value={instructionInput} onChange={(e) => setInstructionInput(e.target.value)} placeholder='Instruction (e.g., Heat oil in a wok and sauté garlic and red chili.)' />
                    <button className='btn btn-primary shadow' onClick={instructionsHandler}> + </button>
                </div><br/>
                <ol>
                    {instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                </ol><br/>

                <label htmlFor='nutrition'>Nutrition:</label><br/>
                <div className='d-flex'>
                    <select className='shadow-sm' value={nutritionComponent} onChange={(e) => setNutritionComponent(e.target.value)}>
                        {['calories', 'fat', 'carbs', 'proteins', 'fiber', 'sugar'].map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <input className='form-control shadow-sm' type='number' value={nutritionInput} onChange={(e) => setNutritionInput(e.target.value)} placeholder='Amount (e.g., 30g)' />
                    <button className='btn btn-primary shadow' onClick={nutritionHandler}> + </button>
                </div><br/>
                {Object.keys(nutrition).length > 0 && (
                    <div>
                        {Object.entries(nutrition).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                        ))}
                    </div>
                )}

                <label htmlFor='details'>Details:</label><br/>
                <textarea className='form-control shadow-sm' required value={details} onChange={(e) => setDetails(e.target.value)} placeholder='Details (e.g., A simple yet delicious classic, Margherita pizza highlights fresh ingredients and bold flavors.)' ></textarea><br/>

                <input className='btn btn-primary shadow' type='submit' value='Add Recipe' />
            </form>
        </main>
    )
}

export default AddRecipe
