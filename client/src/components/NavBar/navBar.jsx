import React from 'react'
import Logo from './Images/Logo.png'
import Cart from './Images/Cart.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'

const NavBar = () => {
    return (

        <div >
            {window.location.pathname === "/" ? (

                // ---------------------------- When the user is in "/" ---------------------------- //

                <div className='navContainer'>
                    <div className='routerContainer'>
                        <div className='buttonsContainer'>
                            <form action="/home">
                                <button className='buttonHome'>Home</button>
                            </form>
                            <form action="/catalogue">
                                <button className='buttonProducts'>Products</button>
                            </form>

                            {/* Si esta logeado se muestra el boton My Account */}

                            <form action="/Account">
                                <button className='buttonProducts'>My Account</button>
                            </form>

                        </div>

                        {/* Si no esta logeado, se muestra para crear cuenta o logearse */}

                        {/* <div className='registerContainer'>
                                <div className='signup'>Crear Cuenta</div>
                                <div className='login'>Iniciar Sesion</div>
                            </div> */}


                        {/* Carrito para cuanto esta logeado */}

                        <div className='cartContainer'>
                            <a href='/order'>
                                <img className='buttonCart' src={Cart} alt='Cart' />
                            </a>
                            <div className='quantityProducts'>7</div>
                        </div>
                    </div>
                </div>

            ) : (

                    // ---------------------------- When the user is in on any page ---------------------------- //

                    <div className='navContainer'>
                        <div className='logoContainer'>
                            <a href="/">
                                <img className='imageLogo' src={Logo} alt='Logo' />
                            </a>
                        </div>
                        <div className='routerContainer'>
                            <div className='buttonsContainer'>
                                <form action="/home">
                                    <button className='buttonHome'>Home</button>
                                </form>
                                <form action="/catalogue">
                                    <button className='buttonProducts'>Products</button>
                                </form>

                                {/* Si esta logeado se muestra el boton My Account */}

                                <form action="/Account">
                                    <button className='buttonProducts'>My Account</button>
                                </form>
                            </div>
                            <div className='searchBar'>
                                <SearchBar/>
                            </div>

                            {/* Si no esta logeado, se muestra para crear cuenta o logearse */}

                            {/* <div className='registerContainer'>
                                    <div className='signup'>Crear Cuenta</div>
                                    <div className='login'>Iniciar Sesion</div>
                                </div> */}


                            {/* Carrito para cuanto esta logeado */}

                            <div className='cartContainer'>
                                <a href='/order'>
                                    <img className='buttonCart' src={Cart} alt='Cart' />
                                </a>
                                <div className='quantityProducts'>7</div>
                            </div>
                        </div>
                    </div>
                )}
        </div>

    )
}
export default NavBar;