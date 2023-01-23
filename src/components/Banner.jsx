import React from 'react';

export default function Banner() {
    return (
        // tailwind에서 local이미지를 사용하는 방법은 className에 bg-banner을 설정해주고, tailwind파일에 추가해줍니다.
        <section className='h-96 bg-yellow-900 relative'>
            <div className='w-full h-full bg-cover bg-banner opacity-90'></div>
            <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                <h2 className='text-6xl'>Shop With US</h2>
                <p className='text-2xl'>Best Products, High Quality</p>
            </div>
        </section>
    );
}

