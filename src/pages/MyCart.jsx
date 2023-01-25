import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function MyCart() {

    // const { uid } = useAuthContext();
    // const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));
    const { cartQuery: {isLoading, data: products} } = useCart();


    if (isLoading) return <p>Loading.....</p>;

    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);
    const SHIPPING = 3000;
    return (
        <section className='p-8 flex flex-col'>
            <p className='text-2xl text-center font-bold pb-4 border-gray-300 border-b'>내 장바구니</p>
            {
                !hasProducts && <p>장바구니에 상품이 없습니다.</p>
            }
            { hasProducts && <>
                <ul className='border-gray-300 border-b mb-8 px-8 p-4'>
                    {products && products.map((product) => <CartItem key={product.id} product={product}/>)}
                </ul>
                <div className='flex justify-between items-center px-2 md:px-8 mb-6 lg:px-16'>
                    <PriceCard text="상품 총액" price={totalPrice}/>
                    <BsFillPlusCircleFill className='shrink-0'/>
                    <PriceCard text="배송액" price={SHIPPING}/>
                    <FaEquals className='shrink-0'/>
                    <PriceCard text="총가격" price={totalPrice + SHIPPING}/>
                </div>
                <Button text="주문하기"/>
            </>}
        </section>
    );
}

