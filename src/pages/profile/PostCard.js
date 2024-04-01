import React from 'react'
import CardBody from '../../components/home/post_card/CardBody'
import CardFooter from '../../components/home/post_card/CardFooter'
import CardHeader from '../../components/home/post_card/CardHeader'

import Comment from '../../components/home/Comment'
import InputComment from '../../components/home/InputComment'
const PostCard = ({post}) => {
  return (

    <div className="bg-white shadow-md rounded-lg p-4 my-4">
    <CardHeader post={post} />
    <CardBody post={post} />
    <CardFooter post={post} />
    
    <Comment post={post} />
    <InputComment post={post} />
  </div>
  )
}

export default PostCard
