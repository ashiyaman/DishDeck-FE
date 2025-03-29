import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./src/assets/features/recipes/recipeSlice";

const store = configureStore({
    reducer: {
        recipes: recipeSlice.reducer
    }
})

export default store