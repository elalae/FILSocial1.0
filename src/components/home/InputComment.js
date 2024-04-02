import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'

const InputComment = ({ children, post, onReply, setOnReply }) => {
    const [content, setContent] = useState('')

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!content.trim()){
        if(setOnReply) return setOnReply(false)
        return;
      }
  
      setContent('');
  
      const newComment = {
          content,
          likes: [],
          user: auth.user,
          createdAt: new Date().toISOString(),
          reply: onReply && onReply._commentId,
          tag: onReply && onReply.user
      };
  
    
    dispatch(createComment({ post, newComment, auth }))
    if(setOnReply) return setOnReply(false)
  };
  

    return (<form className="flex items-center justify-between border-t p-3 bg-white" onSubmit={handleSubmit}>
    {children}
    <input 
      type="text" 
      placeholder="Add a comment..." 
      className="flex-1 mx-4 outline-none border-none placeholder-gray-400" 
      value={content} 
      onChange={e => setContent(e.target.value)} 
    />
    <button 
      type="submit" 
      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-50" 
      disabled={!content.trim()}
    >
      Post
    </button>
  </form>
  
    )
}

export default InputComment
