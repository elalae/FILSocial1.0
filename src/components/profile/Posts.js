import React, { useState, useEffect } from 'react'
import PostThumb from './PostThumb'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../home/LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'

const Posts = ({auth, id, dispatch, profile}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(8) 
    const [page, setPage] = useState(1) 
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const loadInitialPosts = async () => {
            setLoad(true)
            const res = await getDataAPI(`user_posts/${id}?limit=8`, auth.token)
            if (res.data && res.data.posts) {
                setPosts(res.data.posts)
                setResult(res.data.result)
                setPage(page + 1)
            }
            setLoad(false)
        }
        loadInitialPosts()
    }, [id, auth.token]) 

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`user_posts/${id}?limit=8&page=${page}`, auth.token)
        if (res.data && res.data.posts) {
            const newPosts = [...posts, ...res.data.posts]
            setPosts(newPosts)
            setResult(res.data.result)
            setPage(page + 1) 
        }
        setLoad(false)
    }

    return (
        <div>
            <PostThumb posts={posts} result={result} />

            {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

            <LoadMoreBtn 
                result={result} 
                page={page} 
                load={load} 
                handleLoadMore={handleLoadMore} 
            />
        </div>
    )
}

export default Posts
