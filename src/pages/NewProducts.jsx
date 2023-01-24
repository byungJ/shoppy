import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

export default function NewProducts() {
    const [product, setProduct] = useState({});
    // 이미지는 url를 value로 설정해야 합니다.
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSucess] = useState();

    const queryClient = useQueryClient();
    // mutation은 일반적으로 데이터를 생성/업데이트/삭제 하거나 서버 부작용(side-effects)을 수행하는 데 사용됩니다.
    const addProduct = useMutation(({product, url}) => addNewProduct(product, url), {
        onSuccess: () => queryClient.invalidateQueries(['products']),
    });

    const handleSubmit = (e) => {
        // 제품의 사진을 Cloudinary 업로드 하고 URL을 획득 합니다.
        // Firebase에 새로운 제품을 추가합니다.
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file)
        .then(url => {
            addProduct.mutate({product, url}, 
                {
                    onSuccess: () => {
                        setSucess('성공적으로 제품이 추가되었습니다.');
                        setTimeout(() => {
                            setSucess(null);
                        }, 3000);
            }});
        }).finally(setIsUploading(false));

        setProduct({});
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            console.log(e.target.value);
            return;
        }
        setProduct((product) => {
          return  { ...product, [name] :  value}
        })
    }

    return <section className='w-full text-center'>
        <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
        {success && <p className='my-2'>✅ {success}</p>}
        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
            {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file'/>}
            <input type='file' accept='image/*' name='file' required onChange={handleChange}/>
            <input type='text' name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange}/>
            <input type='number' name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange}/>
            <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' required onChange={handleChange}/>
            <input type='text' name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange}/>
            <input type='text' name='options' value={product.options ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange}/>
            <Button text={isUploading? '업로드중...' : '제품 등록하기'} disabled={isUploading}/>
        </form>
    </section>
}

