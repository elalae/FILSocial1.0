import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, size }) => {
    const { theme } = useSelector(state => state)

    let sizeClass = '';
    if(size === 'large') {
        sizeClass = 'w-24 h-24'; // large size
    } else if(size === 'medium') {
        sizeClass = 'w-15 h-15'; // medium size
    } else {
        sizeClass = 'w-10 h-10'; // default or small size
    }

    return (
        <img src={src} alt="avatar" 
             className={`${sizeClass} rounded-full object-cover ${theme ? 'filter invert' : ''}`} />
    )
}

export default Avatar

