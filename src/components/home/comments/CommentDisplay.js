import React from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({comment, post, replyCm}) => {
  return (
    <div >
        <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div > 
          {
            replyCm.map((item, index) => (
              item.reply && 
              <CommentCard 
              key={index}
              comment={item}
              post={post}
              commentId={comment._id}
              />
            ))
          }
        </div>
        </CommentCard>
      
    </div>
  )
}

export default CommentDisplay
