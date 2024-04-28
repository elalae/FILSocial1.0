import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard';
import { getPost } from '../../../redux/actions/postAction'

const Post = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const detailPost = useSelector(state => state.detailPost)
    const post = detailPost.find(post => post._id === id) || null

    useEffect(() => {
        if (!post) {
            dispatch(getPost({id}))
        }
    }, [id, dispatch, post])

    return (
        <div className="posts">
            {post ? (
                <PostCard key={post._id} post={post} />
            ) : (
                <img src="../images/loading.gif" alt="loading" className="d-block mx-auto my-4" />
            )}
        </div>
    )
}

export default Post
