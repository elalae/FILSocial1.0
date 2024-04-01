import React, { useState } from 'react';

const CommentMenu = ({ post, comment, auth, setOnEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const MenuItem = () => {
    return (
      <>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOnEdit(true)}>
          <span className="material-icons">create</span>
          <span>Edit</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
          <span className="material-icons">delete_outline</span>
          <span>Remove</span>
        </div>
      </>
    );
  };

  return (
    <div className="relative">
      {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
        <div className="relative">
          <span className="material-icons cursor-pointer" id="moreLink" onClick={toggleMenu}>
            more_vert
          </span>
          {showMenu && (
            <div className="dropdown-menu absolute right-0 bg-white shadow-lg mt-1 py-1 rounded-md border border-gray-300 z-50">
              {
              post.user._id === auth.user._id
              ? comment.user._id === auth.user._id 
                ? <MenuItem />
                : <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"> 
                    <span className="material-icons">delete_outline</span> 
                    <span>Remove</span>          
                  </div>
                : comment.user._id === auth.user._id && <MenuItem />
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
