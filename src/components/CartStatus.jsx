import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { getCart } from '../api/firebase';

export default function CartStatus() {

    const {data: products } = useQuery(['carts'], getCart);
    return (
        <div>
            <AiOutlineShoppingCart/>
        </div>
    );
}

