import React, { useState } from 'react'
import Carousel from '../../profile/Carousel'
{/* TODO: continue this*/}
const CardBody = ({post}) => {
const [readMore, setReadMore] = useState(false)

  return (
  

      <div>
        <div>
        <span>
          {
          post.content.length < 60 
          ? post.content 
          :readMore ? post.content + ' ' : post.content.slice(0, 60) + '...'
          }
          </span>
          {
             post.content.length > 60 &&
             <span className="readMore cursor-pointer text-blue-500 hover:text-orange-500" onClick={() => setReadMore(!readMore)}>
             {readMore ? 'Hide content' : 'Read more'}
            </span>


          }
        </div>
        {
            post.images.length > 0 && <Carousel images={post.images} id={post._id} />
        }
      </div>
  
  )
}

export default CardBody
