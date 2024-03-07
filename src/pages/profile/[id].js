import React from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useSelector } from 'react-redux'

const Profile =() => {
  const {profile} = useSelector(state => state)
  return (
    <div>

      <Info />
      <Posts />
      </div>

  )
}

export default Profile