import React, { useState, useEffect } from 'react';

import Avatar from '../alert/Avatar';
import EditProfile from './EditProfile';
import FollowBtn from './FollowBtn';
import Followers from './Followers';
import Following from './Following';

const Info = ({id, auth, profile, dispatch}) => {
  
 
  const [user, setUserData] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowes, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData(auth.user);
    } else {
     
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile.users])

  useEffect(() => {
    
    if (id !== auth.user._id) {
      const userProfile = profile.users.find(user => user._id === id);
      if (userProfile) {
        setUserData(userProfile);
      } else {
       
        setUserData(null);
      }
    }
  }, [profile.users, id, auth.user._id, dispatch]);


  const isCurrentUserProfile = auth.user && user && auth.user._id === user._id;

  return (
    <div className="info bg-white shadow-lg rounded-lg p-4">
      {user && (
        <div className="info_container flex flex-col items-center">
          <Avatar src={user.avatar} size="profile" className="w-32 h-32 rounded-full object-cover" />
          <div className="info_content mt-4">
            <div className="info_content_title flex flex-col items-center">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              {isCurrentUserProfile && (
            <button onClick={() => setOnEdit(!onEdit)} className="btn btn-outline-info mt-2 px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out">
              Edit Profile
            </button>

            
          )}

             {!isCurrentUserProfile && <FollowBtn user={user} />} 
            </div>
          </div>
          <div className="flex justify-around w-full mt-4">
            <span className="text-lg" onClick={()=>setShowFollowers(true)}>
              {user.followers.length} <span className="text-sm text-gray-600">Followers</span>
            </span>
            <span className="text-lg" onClick={()=>setShowFollowing(true)}>
              {user.following.length} <span className="text-sm text-gray-600">Following</span>
            </span>
          </div>
          <div className="mt-4 text-center">
            <h6 className="text-md font-medium">{user.fullname}</h6>
            <h6 className="text-sm text-gray-500">{user.role}</h6>
            <h6 className="text-sm text-gray-500">{user.group}</h6>
            <h6 className="text-sm text-gray-500">{user.email}</h6>
            <h6 className="text-sm text-gray-500">{user.story}</h6>
            <a href={user.website} className="text-sm text-blue-500">{user.website}</a>
          </div>

          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>}

          {showFollowes && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}

          {showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}

        </div>
      )}
    </div>
  );
};

export default Info;
