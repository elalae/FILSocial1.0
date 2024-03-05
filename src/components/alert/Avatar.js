import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, size }) => {
    const { theme } = useSelector(state => state)

    let sizeClass = '';
    if(size === 'large') {
        sizeClass = 'w-24 h-24'; 
    } else if(size === 'medium') {
        sizeClass = 'w-15 h-15'; 
    } else if (size === 'super_large') {
        sizeClass = 'w-34 h-34';
    }else {
        sizeClass = 'w-10 h-10'; 
    } 

    return (
        <img src={src} alt="avatar" 
             className={`${sizeClass} rounded-full object-cover ${theme ? 'filter invert' : ''}`} />
    )
}

export default Avatar

