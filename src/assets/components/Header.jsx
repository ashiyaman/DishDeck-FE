import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearch } from '../features/recipes/recipeSlice';
import { FaSearch, FaHome, FaPlusCircle } from 'react-icons/fa'; // Import icons

const Header = () => {
    const dispatch = useDispatch();

    const searchHandler = (value) => {
        dispatch(setSearch(value));
    };

    return (
        <nav className='navbar bg-warning text-dark shadow-sm' style={{ padding: '10px 20px' }}>
            <div className='container d-flex justify-content-between align-items-center'>
                <Link className='fw-bold fs-4 text-dark d-flex align-items-center' to='/' style={{ textDecoration: 'none' }}>
                    🍽️ DishDeck
                </Link>

                <div className='d-flex align-items-center position-relative' style={{ width: '250px' }}>
                    <input 
                        type='text'
                        className='form-control shadow-sm'
                        onChange={(e) => searchHandler(e.target.value)}
                        placeholder='Search Recipes...'
                        style={{ paddingLeft: '35px' }}
                    />
                    <FaSearch className='position-absolute text-primary' style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}/>
                </div>

                <ul className='navbar-nav d-flex flex-row'>
                    <li className='nav-item mx-2'>
                        <Link className='nav-link fw-bold text-dark d-flex align-items-center' to='/' style={{ textDecoration: 'none' }}>
                            <FaHome className='me-1'/> Recipes
                        </Link>
                    </li>
                    <li className='nav-item mx-2'>
                        <Link className='nav-link fw-bold text-dark d-flex align-items-center' to='/addRecipe' style={{ textDecoration: 'none' }}>
                            <FaPlusCircle className='me-1'/> Add Recipes
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
