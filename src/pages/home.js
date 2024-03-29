import React from 'react'
import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'


const Home = () => {
  const { homePosts} = useSelector(state => state)
  return (
    <div>
     <div className="home row mx-0">
      <Status />
      {
        homePosts.loading
        ? <img src={LoadIcon} alt="loading" /> 
        : homePosts.result === 0  
         ? <h2>No posts available</h2>
         : <Posts />
      }
    
      </div>    
      </div>
  )
}

export default Home
