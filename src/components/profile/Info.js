import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../alert/Avatar';
import { getProfileUsers } from '../../redux/actions/profileAction';

const Info = () => {
  const { id } = useParams();
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const [user, setUserData] = useState(null);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData(auth.user);
    }
  }, [id, auth.user]);

  return (
    <div className="info bg-white shadow-lg rounded-lg p-4">
      {user && (
        <div className="info_container flex flex-col items-center">
          <Avatar src={user.avatar} size="super_large" className="w-32 h-32 rounded-full object-cover" />
          <div className="info_content mt-4">
            <div className="info_content_title flex flex-col items-center">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <button className="btn btn-outline-info mt-2 px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out">Edit Profile</button>
            </div>
          </div>
          <div className="flex justify-around w-full mt-4">
            <span className="text-lg">
              {user.followers.length} <span className="text-sm text-gray-600">Followers</span>
            </span>
            <span className="text-lg">
              {user.following.length} <span className="text-sm text-gray-600">Following</span>
            </span>
          </div>
          <div className="mt-4 text-center">
            <h6 className="text-md font-medium">{user.fullname}</h6>
            <h6 className="text-sm text-gray-500">{user.role}</h6>
            <h6 className="text-sm text-gray-500">{user.group}</h6>
            <h6 className="text-sm text-gray-500">{user.email}</h6>
            <a href={user.website} className="text-sm text-blue-500">{user.website}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
