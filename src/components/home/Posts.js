
import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from './LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
import PostCard from '../../pages/profile/PostCard'

function Posts() {
  const { homePosts, auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  const handleLoadMore = async () => {
      setLoad(true)
      const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

      dispatch({
          type: POST_TYPES.GET_POSTS, 
          payload: {...res.data, page: homePosts.page + 1}
      })

      setLoad(false)
  }
  return (
    <div>
      {
        homePosts.posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
      }
         {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
      
    </div>
  )
}

export default Posts
