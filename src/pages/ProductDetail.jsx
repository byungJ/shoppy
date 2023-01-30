import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useAuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function ProductDetail() {

    const { addOrUpdateItem } = useCart();

    // navigate에서 param으로 보낸 state를 받습니다.
    const {
        state: {
            product : { id, image, title, description, category, price, options }
        }
    } = useLocation();
    //console.log(useLocation());
    
    const [success, setSuccess] = useState();

    // 상품 옵션을 저장하기 위한 state를 별도로 만들어 줍니다.
    const [selected , setSelected] = useState(options && options[0]);
    
    const handleSelect = (e) => {
        return setSelected(e.target.value);
    }
    const handleClick = (e) => {
        const product = { id, image, title, price, option: selected, quantity: 1};
        addOrUpdateItem.mutate(product, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.');
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            }
        });
    }
    
    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col md:flex-row p-4 justify-items-center items-center'>
                <img className='w-96 px-4' src={image} alt={title} />
                <div className='w-full basis-7/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2'>{title}</h2>
                    <p className='text-2xl font-bold py-2  border-b border-gray-400'>₩{price}</p>
                    <p className='text-lg py-4'>{description}</p>
                    <div className='flex items-center'>
                        <label className='text-brand font-bold' htmlFor='select'>옵션:</label>
                        <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' id='select' onChange={handleSelect} value={selected}>
                            {options && options.map((option, index) => (<option key={index}>{option}</option>))}
                        </select>
                    </div>
                    {success && <p className='my-2 font-bold'>{success}</p>}
                    <Button onClick={handleClick} text='장바구니 추가'/>
                </div>
            </section>
        </>
    );
}

