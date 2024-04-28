import React, { useEffect } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useSelector } from 'react-redux'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Profile =() => {
  const {profile,  auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const {id} = useParams()

  useEffect(() => {

    if(profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
   
  },[id,  auth, dispatch, profile.ids])
  return (
    <div>

      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {
        profile.loading
        ? <img className="loading" src="../../images/loading.gif" alt="loading" />
        :<Posts auth={auth} profile={profile} dispatch={dispatch} id={id}  />
      }
      
      </div>

  )
}

export default Profile