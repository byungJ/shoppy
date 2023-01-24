import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getProducts as fetchProducts } from '../api/firebase';

// 한 곳에서 동일한 캐쉬키로 데이터를 읽어오는 거랑 업데이트하는게 같이 있으면 관리하기가 편리 합니다.
export default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery(['products'], fetchProducts, {
        staleTime: 1000 * 60,
    });

    // mutation은 일반적으로 데이터를 생성/업데이트/삭제 하거나 (첫번째 인자)
    // 서버 부(가)작용(side-effects)을 수행하는 데 사용됩니다. (두번째 인자)
    const addProduct = useMutation(
        ({ product, url }) => addNewProduct(product, url),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    );

    return { productsQuery, addProduct }
}