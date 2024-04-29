import React, { useEffect, useState } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useSelector } from 'react-redux'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Saved from '../../components/profile/Saved'


const Profile =() => {
  const {profile,  auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const {id} = useParams()
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {

    if(profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
   
  },[id,  auth, dispatch, profile.ids])
  return (
    <div>

      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {
  auth.user._id === id &&
  <div className="flex border-b gap-1 bg-white shadow-md rounded-lg overflow-hidden">
    <button
      className={`flex-1 text-sm md:text-lg py-3 transition duration-300 ease-in-out font-semibold text-center ${
        !saveTab
          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-inner'
          : 'text-orange-500 hover:bg-orange-100'
      }`}
      onClick={() => setSaveTab(false)}
    >
      Posts
    </button>
    <button
      className={`flex-1 text-sm md:text-lg py-3 transition duration-300 ease-in-out font-semibold text-center ${
        saveTab
          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-inner'
          : 'text-orange-500 hover:bg-orange-100'
      }`}
      onClick={() => setSaveTab(true)}
    >
      Saved
    </button>
  </div>
}
      {
        profile.loading
        ? <img className="loading" src="../../images/loading.gif" alt="loading" />
        :<>
        {
          saveTab
          ? <Saved auth={auth}  dispatch={dispatch} />
          : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}  />
        }
        </>
      }
      
      </div>

  )
}

export default Profile