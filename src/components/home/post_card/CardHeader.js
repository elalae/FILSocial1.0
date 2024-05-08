import React, { useState } from 'react';
import Avatar from '../../alert/Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { BASE_URL } from '../../../utils/config';

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const History = useHistory();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleEditPost = () => {
    dispatch({
        type: GLOBALTYPES.STATUS,
        payload: { ...post, onEdit: true }
    });
};

const handleDeletePost =  () => {
  if (window.confirm('Are you sure you want to delete this post?')) {
  dispatch(deletePost({post, auth, socket}))
  return History.push("/")
  }
}

const handleCopyLink = () => {
  navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
}


 

  return (
    <div className="flex justify-between items-start bg-white p-4 rounded-lg shadow"> 
      <div className="flex items-start space-x-2"> 
        <Avatar src={post.user.avatar} size="small" />
        <div className="flex flex-col">
          <Link to={`/profile/${post.user._id}`} className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
            {post.user.username}
          </Link>
          <small className="text-xs text-gray-500">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="relative">
        <button onClick={toggleDropdown} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:ring">
          <span className="material-icons">more_horiz</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <div className="py-1">
              {auth.user._id === post.user._id && (
                <>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEditPost}>
                    <span className="material-icons mr-3">create</span> Edit Post
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDeletePost}>
                    <span className="material-icons mr-3">delete_outline</span> Remove Post
                  </button>
                </>
              )}
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleCopyLink}>
                <span className="material-icons mr-3">content_copy</span> Get Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHeader;

