import React from 'react';

// user 안 의 세부적이 값을 입력 해서 받습니다.
export default function User({ user: {photoURL, displayName} }) {
    return (
        <div className='flex items-center shrink-0'>
            <img className='w-10 h-10 rounded-full mr-2' 
            src={photoURL} alt={displayName} />
            <span className='hidden md:block'>{displayName}</span>
        </div>
    );
}

