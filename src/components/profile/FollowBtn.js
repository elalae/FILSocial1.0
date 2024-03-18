import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../../redux/actions/profileAction'
const FollowBtn = ({user}) => {
  const [followed, setFollowed] = useState(false)

  const{auth, profile} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
     if(auth.user.following.find(item => item.id === user._id)){
        setFollowed(true)
     }
  },[auth.user.following, user._id]) 
  const handleFollow = () => {
    setFollowed(true)
    dispatch(follow({users: profile.users, user, auth}))
  }

  const handleUnFollow = () => {
    setFollowed(false)
    dispatch(unfollow({users: profile.users, user, auth}))
  
  }

  return (

    <div>
    {
        followed
        ? <button className="btn btn-outline-danger"
        onClick={handleUnFollow}>
            Unfollow
        </button>
        : <button className="btn btn-outline-info"
        onClick={handleFollow}>
            Follow
        </button>
    }
    </div>
  )
}

export default FollowBtn
