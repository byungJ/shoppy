import React from 'react';
import { useNavigate } from 'react-router-dom';

// product을 가져오고 추가로 product안에 있는 내용도 풀어서 가져옵니다.
export default function ProductCard({product, product: {id, image, title, category, price}}) {
    const navigate = useNavigate();
    return (
        <li onClick={() => {navigate(`/products/${id}`, { state: {product}})}}
        className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
            <img className='w-full' src={image} alt={title} />
            <div className='mt-2 px-2 flex justify-between items-center'>
                <h3 className='truncate'>{title}</h3>
                <p>{`₩${price}`}</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>{category}</p>
        </li>
    );
}

