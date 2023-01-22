import React from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi'
import {BsFillPencilFill} from 'react-icons/bs'
import User from './User.jsx';
import Button from './ui/Button.jsx';
import { useAuthContext } from './context/AuthContext.jsx';

export default function Navbar() {

    const { userState, login, logout } = useAuthContext();

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                {userState && <Link to='/carts'>Carts</Link>}
                { userState && userState.isAdmin && (
                    <Link to='/products/new' className='text-2xl'>
                        <BsFillPencilFill/>
                    </Link>
                )}
                {userState && <User user={userState}/>}
                {!userState && <Button onClick={login} text={'Login'}/>}
                {userState && <Button onClick={logout} text={'Logout'}/>}
            </nav>
        </header>
    );
}

