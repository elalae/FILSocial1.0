import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../../redux/actions/profileAction';

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const { auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();

  const[load, setLoad] = useState(false)

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
        setFollowed(true);
    }
}, [auth.user.following, user._id]);


  const handleFollow = async () => {
    if(load) return;
    setFollowed(true)
    setLoad(true)
    await dispatch(follow({ users: profile.users, user, auth }));
    setLoad(false)
  };

  const handleUnFollow = async () => {
    if(load) return;
    setFollowed(false);
    setLoad(true)
    await dispatch(unfollow({ users: profile.users, user, auth }));
    setLoad(false)
  };

  return (
    <div>
      {followed ? (
        <button
          className="px-4 py-2 text-white bg-red-500 border border-red-500 hover:bg-red-600 hover:border-red-600 rounded"
          onClick={handleUnFollow}>
          Unfollow
        </button>
      ) : (
        <button
          className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white rounded"
          onClick={handleFollow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowBtn;
