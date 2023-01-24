import React from 'react';
import useProducts from '../hooks/useProducts.jsx';
import ProductCard from './ProductCard';

export default function Products() {

    // const { isLoading, error, data: products } = useQuery(['products'], getProducts); 별도의 hook을 만들어서 한번에 관리 해줍니다. 밑에 코드처럼 사용하면 됩니다.
    const { productsQuery: { isLoading, error, data: products }} = useProducts();

    console.log('products', products);
    return <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {
                products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </ul>
    </>
}

