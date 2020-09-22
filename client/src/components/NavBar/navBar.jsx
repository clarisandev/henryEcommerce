import React, { useEffect, useState } from 'react'
import Logo from './Images/Logo.png'
import './navBar.css'
import SearchBar from '../SearchBar/SearchBar'
import { Modal } from 'reactstrap'
import Login from '../LogIn/Login'
import Register from '../Register/Register'
import gatito from './Images/gatito.png'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOrder } from '../../redux/ordersActions'
import UserLogged from '../UserLogged/UserLogged'
import { useCookies } from 'react-cookie';
import Cart from '../UserLogged/Cart'
import { actionSetVerified, actionVerifyCookies, actionSetCookieToStore } from '../../redux/usersActions'

const NavBar = () => {
    //// ---------------------------- DEV ---------------------------- //
    const [cookie, setCookie] = useCookies(['ttkk']);
    const dispatch = useDispatch()
    // ---------------------------- States ---------------------------- //
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const idUser = useSelector(state => state.usersReducer.idUser)
    const level = useSelector(state => state.usersReducer.level)
    const verified = useSelector(state => state.usersReducer.verified)

    if (verified) {
        setCookie('idUser', idUser)
        setCookie('level', level)
        dispatch(actionSetVerified(false))
    }
    useEffect(() => {
        dispatch(actionSetCookieToStore(cookie))
        dispatch(actionGetOrder(idUser));
        handleChancha();
    },[])
    // ---------------------------- Functions ---------------------------- //
    // ----- To Open Modals ----- //
    const modalLoginView = () => setModalLogin(!modalLogin);
    const modalRegisterView = () => setModalRegister(!modalRegister);

    // ----- To Close Modals ----- //
    const modalLoginClose = () => setModalLogin(false);
    const modalRegisterClose = () => setModalRegister(false);

    const handleChancha = () => {
        dispatch(actionVerifyCookies({ ...cookie }))
    }
    const ChangeModal = () => {
        modalLoginView()
        modalRegisterView()
    }
    return (

        <div >
            <div className='navContainer'>
                <div className='logoContainer'>
                    <a href="/">
                        <img className='imageLogo' src={Logo} alt='Logo' />

                    </a>
                </div>
                <div> <img className='nomematen' src={gatito} /></div>
                <div className='routerContainer'>
                    <div className='buttonsContainer'>
                        <form action="/">
                            <div><button className='buttonHome'><p className='textnav'>Home</p></button></div>

                        </form>
                        <form action="/catalogue">
                            <button className='buttonProducts'><p className='textnav'>Products</p></button>
                        </form>
                        {level === 'USER' ? (
                            <button className='buttonProducts' onClick={handleChancha} >My Account</button>
                        ) : (<div></div>)}
                    </div>
                    <div className='searchBar'>
                        <SearchBar />
                    </div>
                    {level === 'USER' ?
                        (
                            <div className='userLogged' >
                                <UserLogged />
                                <div className='cartContainer'>
                                    <Cart />
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='SessionContainer'>
                                <div className='registerContainer'>
                                    <button className='signup' onClick={e => modalLoginView()}>Login</button>
                                    <button className='login' onClick={e => modalRegisterView()}>Register</button>
                                </div>
                                <div className='cartContainer'>
                                    <Cart />
                                </div>

                            </div>
                        )}
                    <Modal isOpen={modalLogin}>
                        <Login modalLoginClose={modalLoginClose} ChangeModal={ChangeModal} />
                    </Modal>

                    <Modal isOpen={modalRegister}>
                        <Register modalRegisterClose={modalRegisterClose} ChangeModal={ChangeModal} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default NavBar;