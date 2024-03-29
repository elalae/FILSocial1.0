import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Carousel = ({ images, id }) => {
    const { theme } = useSelector(state => state);
    const [activeIndex, setActiveIndex] = useState(0);

    const goPrev = () => {
        setActiveIndex(prevIndex => prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1);
    };

    const goNext = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    if (!images || images.length === 0) {
        return null; // Or some fallback UI
    }

    return (
        <div id={`image${id}`} className="relative w-full">
            <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
                {images.map((img, index) => {
                    if (!img || !img.url) {
                        return null; // Skip rendering this item if the image is not valid
                    }
                    return (
                        <div key={index} className={`absolute inset-0 transition duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                            {img.url.match(/video/i) ? (
                                <video controls src={img.url} className="w-full h-full object-contain" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                            ) : (
                                <img src={img.url} className="w-full h-full object-contain" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} alt="" />
                            )}
                        </div>
                    );
                })}
            </div>
            {images.length > 1 && (
                <>
                    <div className="absolute z-30 flex justify-center w-full bottom-5">
                        {images.map((_, index) => (
                            <button key={index} onClick={() => setActiveIndex(index)} type="button" className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-400'} mx-1 focus:outline-none`} aria-label={`Slide ${index + 1}`}></button>
                        ))}
                    </div>
                    <button onClick={goPrev} type="button" className="absolute left-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-60 hover:bg-opacity-80 focus:ring-4 focus:ring-white focus:ring-opacity-70">
                            <svg className="w-5 h-5 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </span>
                    </button>
                    <button onClick={goNext} type="button" className="absolute right-0 top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-60 hover:bg-opacity-80 focus:ring-4 focus:ring-white focus:ring-opacity-70">
                            <svg className="w-5 h-5 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M9 5l7 7-7 7"></path>
                            </svg>
                        </span>
                    </button>
                </>
            )}
        </div>
    );
};

export default Carousel;