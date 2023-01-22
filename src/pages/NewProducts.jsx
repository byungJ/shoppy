import React, { useState } from 'react';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

export default function NewProducts() {
    const [product, setProduct] = useState({});

    // 이미지는 url를 value로 설정해야 합니다.
    const [file, setFile] = useState();

    const handleSubmit = (e) => {
        // 제품의 사진을 Cloudinary 업로드 하고 URL을 획득 합니다.
        // Firebase에 새로운 제품을 추가합니다.
        e.preventDefault();
        uploadImage(file)
        .then(url => {
            console.log(url);
        })
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

    return <section>
        <form onSubmit={handleSubmit}>
            {file && <img src={URL.createObjectURL(file)} alt='local file'/>}
            <input type='file' accept='image/*' name='file' required onChange={handleChange}/>
            <input type='text' name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange}/>
            <input type='number' name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange}/>
            <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' required onChange={handleChange}/>
            <input type='text' name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange}/>
            <input type='text' name='option' value={product.option ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange}/>
            <Button text={'제품 등록하기'}/>
        </form>
    </section>
}

