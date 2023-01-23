import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ProductDetail() {
    // navigate에서 param으로 보낸 state를 받습니다.
    const {
        state: {
            product : { id, image, title, description, category, price, options }
        }
    } = useLocation();
    //console.log(useLocation());
    
    // 상품 옵션을 저장하기 위한 state를 별도로 만들어 줍니다.
    const [selected , setSelected] = useState(options && options[0]);
    
    const handleSelect = (e) => {
        return setSelected(e.target.value);
    }
    const handleClick = (e) => {

    }
    
    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' src={image} alt={title} />
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2>{title}</h2>
                    <p>₩{price}</p>
                    <p>{description}</p>
                    <select onChange={handleSelect} value={selected}>
                        {options && options.map((option, index) => (<option key={index}>{option}</option>))}
                    </select>
                    <Button onClick={handleClick} text='장바구니 추가'/>
                </div>
            </section>
        </>
    );
}

