import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../profile/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import {likePost, unLikePost} from '../../../redux/actions/postAction'

const CardFooter = ({post}) => {

  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const { auth, theme, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(post.likes.find(like => like._id === auth.user._id)){
        setIsLike(true)
    }else{
        setIsLike(false)
    }
}, [post.likes, auth.user._id])

const handleLike = async () => {
  if(loadLike) return;
  setLoadLike(true)
  
  await dispatch(likePost({post, auth}))
  setLoadLike(false)
}

  const handleUnLike = async () => {
    if(loadLike) return;
    setLoadLike(true)

    await dispatch(unLikePost({post, auth}))
    setLoadLike(false)
  } 
  return (
    <div className="border-t border-gray-300">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
            <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnLike}/>
          <Link to={`/post/${post._id}`}>
            <i className="far fa-comment text-xl"></i>
          </Link>
          <i className="far fa-paper-plane text-xl cursor-pointer"></i>
        </div>
        <i className="far fa-bookmark text-xl cursor-pointer"></i>
      </div>
      <div className="px-3 py-1 text-sm font-semibold">
        <span>{post.likes.length} likes</span>
        <span className="block sm:inline ml-0 sm:ml-6">{post.comments.length} comments</span>
      </div>
    </div>
  )
}

export default CardFooter;
