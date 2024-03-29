
import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import CardHeader from './post_card/CardHeader'
import CardBody from './post_card/CardBody'
import CardFooter from './post_card/CardFooter'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from './LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'


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
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4 my-4">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />

          </div>
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
