
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className='navbar bg-dark text-light'>
            <div className='container'>
                <Link to="/">DishDeck</Link>
                <ul className='navbar nav'>
                    <li className='nav-item'><Link className='nav-link' to='/'>Recipes</Link></li>
                    <li className='nav-item'><Link className='nav-link' to='/addRecipe'>Add Recipes</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header