import React from 'react';
import { Link } from 'react-router-dom';

const PostThumb = ({ posts, result}) => {

  if (result===0) return <h1 className="text-center text-2xl">No posts</h1> 
  return (
    <div className="flex flex-wrap">
      {posts.map(post => (
        <Link key={post._id} to={`/post/${post._id}`} className="w-1/4 relative">
          <div className="bg-gray-100 overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
            <div className="w-full h-0 pb-[100%] relative"> {/* Padding-bottom of 100% ensures a square */}
              {post.images && post.images.length > 0 ? (
                <img 
                  src={post.images[0].url} 
                  alt="post"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">{post.content}</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50 transition-opacity duration-300">
              <span className="text-lg font-bold">
                {post.likes.length} Likes • {post.comments.length} Comments
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostThumb;
