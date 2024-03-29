import React from 'react'

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
    return (
        <>
            {
                result < 3 * (page - 1) ? '' : 
                !load && <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline mx-auto block"
                onClick={handleLoadMore}>
                    Load more
                </button>
            }
            
        </>
    )
}

export default LoadMoreBtn
