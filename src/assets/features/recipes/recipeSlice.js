import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DISHDECK_URI = `http://localhost:3000`

//Get All recipes from db
export const fetchRecipes = createAsyncThunk('fetch/recipes',
    async() => {
        const response = await axios.get(`${DISHDECK_URI}/recipes`)
        return response.data
    }
)

//Get a recipe by Id
export const fetchRecipeById = createAsyncThunk('fetch/recipeById',
    async(recipeId) => {
        const response = await axios.get(`${DISHDECK_URI}/recipes/${recipeId}`)
        return response.data
    }
)

//Add a new Recipe
export const addRecipe = createAsyncThunk('post/recipe',
    async(recipeData) => {
        const response = await axios.post(`${DISHDECK_URI}/recipes`, {recipeDate: recipeData})
        console.log(response.data)
        return response.data
    }
)

//Get a recipe by Id
export const deleteRecipeById = createAsyncThunk('delete/recipeById',
    async(recipeId) => {
        const response = await axios.delete(`${DISHDECK_URI}/recipes/${recipeId}`)
        console.log('...resp...', response.data)
        return response.data
    }
)

export const recipeSlice = createSlice({
    name: 'Recipes',
    initialState: {
        recipes: [],
        selectedRecipe: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedRecipe: (state, action) => {
            state.selectedRecipe = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'success'
                state.recipes = action.payload
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            .addCase(fetchRecipeById.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.status = 'success'
                state.selectedRecipe = action.payload
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export const { setSelectedRecipe } = recipeSlice.actions

export default recipeSlice.reducer