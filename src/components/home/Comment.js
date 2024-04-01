import React, {useState, useEffect} from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comment = ({post}) => {

  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])

  const [next, setNext] = useState(2)

  useEffect(() => {
    const newCm = post.comments.filter(cm => !cm.reply)
    setComments(newCm)
    setShowComments(newCm.slice(newCm.length - next))
},[post.comments, next])

//TODO: Fix bug with showing all comments when there are 10 or 11 comments in the post
  return (
   <div className="comment">
  {showComments.map(comment => (
    <CommentDisplay key={comment._id} comment={comment} post={post}/>
  ))}
  {comments.length > next ? (
    <div 
      className="p-2 border-top"
      style={{ cursor: 'pointer', color: 'crimson' }}
      onClick={() => setNext(next + 10)}>
      See more comments...
    </div>
  ) : (
    comments.length > 2 && (
      <div 
        className="p-2 border-top"
        style={{ cursor: 'pointer', color: 'crimson' }}
        onClick={() => setNext(2)}>
        Hide comments...
      </div>
    )
  )}
</div>

  )
}

export default Comment
