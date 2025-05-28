import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DISHDECK_URI = `https://dish-deck-be.vercel.app`

// Get All recipes from db
export const fetchRecipes = createAsyncThunk('fetch/recipes', async () => {
    const response = await axios.get(`${DISHDECK_URI}/recipes`);
    return response.data;
});

// Get a recipe by Id
export const fetchRecipeById = createAsyncThunk('fetch/recipeById', async (recipeId) => {
    const response = await axios.get(`${DISHDECK_URI}/recipes/${recipeId}`);
    return response.data;
});

// Add a new Recipe
export const addRecipe = createAsyncThunk('post/recipe', async (recipeData) => {
    const response = await axios.post(`${DISHDECK_URI}/recipes`, { recipe: recipeData });
    return response.data;
});

// Delete a recipe by Id
export const deleteRecipeById = createAsyncThunk('delete/recipeById', async (recipeId) => {
    const response = await axios.delete(`${DISHDECK_URI}/recipes/${recipeId}`);
    return response.data;
});

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        filteredRecipes: [], // <-- Add filteredRecipes to store searched results
        selectedRecipe: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedRecipe: (state, action) => {
            state.selectedRecipe = action.payload;
        },
        setSearch: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredRecipes = state.recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm)
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'success';
                state.recipes = action.payload;
                state.filteredRecipes = action.payload; 
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(fetchRecipeById.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.status = 'success';
                state.selectedRecipe = action.payload
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(addRecipe.pending, state => {
                state.status = 'loading';
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.status = 'success';
                state.recipes = [...state.recipes, action.payload]
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(deleteRecipeById.pending, state => {
                state.status = 'loading';
            })
            .addCase(deleteRecipeById.fulfilled, (state, action) => {
                state.status = 'success';
                state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload._id);
                state.filteredRecipes = state.filteredRecipes.filter(recipe => recipe._id !== action.payload._id);
            })
            .addCase(deleteRecipeById.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
    }
});

export const { setSelectedRecipe, setSearch } = recipeSlice.actions;

export default recipeSlice.reducer;
