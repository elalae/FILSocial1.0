import React from 'react'

const LikeButton = ({isLike, handleLike, handleUnlike}) => {
  return (
    <>
      {
        isLike
        ? <i className="fas fa-heart text-xl cursor-pointer text-orange-500" onClick={handleUnlike} ></i>
        : <i className="far fa-heart text-xl cursor-pointer" onClick={handleLike}></i>
      }
    </>
  )
}

export default LikeButton
