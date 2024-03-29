import React from 'react'
import { useSelector } from 'react-redux'
import CardHeader from './post_card/CardHeader'
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'


function Posts() {
  const {homePosts} = useSelector((state) => state)
  return (
    <div>
      {
        homePosts.posts.map(post => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4 my-4">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />

          </div>
        ))
      }
    </div>
  )
}

export default Posts
