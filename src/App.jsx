import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Header from './assets/components/Header'
import AddRecipe from './assets/features/recipes/AddRecipe'
import RecipeDetail from './assets/features/recipes/RecipeDetail'
import Recipes from './assets/features/recipes/Recipes'

function App() {
  return (
    <div className='bg-light minh-100 !important'>
      <Router>
        <Header />      
        <Routes>
          <Route path='/' element={<Recipes />} />
          <Route path='/addRecipe' element={<AddRecipe />} />
          <Route path='/recipes/:recipeId' element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
