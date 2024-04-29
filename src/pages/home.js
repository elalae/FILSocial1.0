import React from 'react'
import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import RightSideBar from './RightSideBar'

const Home = () => {
  const { homePosts } = useSelector(state => state)
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">  
      <div className="md:col-span-3">  
        <div className="home">
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

      <div className="md:col-span-1">  
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
