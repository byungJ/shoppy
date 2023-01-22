import React from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi'
import {BsFillPencilFill} from 'react-icons/bs'
import { login, logout, onUserStateChange } from '../api/firebase.js'
import { useState } from 'react';
import { useEffect } from 'react';
import User from './User.jsx';

export default function Navbar() {
    const [userState, setUserState] = useState();

    useEffect(() => {
        onUserStateChange((user) => {
            console.log(user)
            setUserState(user)
        })
    }, []);


    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill/>
                </Link>
                {userState && <User user={userState}/>}
                {!userState && <button onClick={login}>Login</button>}
                {userState && <button onClick={logout}>Logout</button>}
            </nav>
        </header>
    );
}

