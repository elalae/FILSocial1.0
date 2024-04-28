// CommentCard.jsx

import React, { useState, useEffect } from 'react';
import Avatar from '../../alert/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LikeButton from '../../profile/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu';
import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction';
import InputComment from '../InputComment';

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(comment.likes.some(like => like._id === auth.user._id));
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    setOnReply(prev => !prev ? { ...comment, commentId } : false);
  };

  // Style to apply for nested replies
  const replyClass = commentId !== comment._id ? 'pl-4 border-l-2 border-gray-200 ml-4' : '';

  return (
    <div className={`mt-2 bg-white shadow border rounded-lg p-4 relative ${replyClass}`}>
      <div className="flex items-center space-x-2">
        <Link to={`/profile/${comment.user._id}`}>
          <Avatar src={comment.user.avatar} size="small" />
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Link to={`/profile/${comment.user._id}`} className="font-medium text-gray-900">
              {comment.user.username}
            </Link>
            <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
          </div>
          {onEdit ? (
            <textarea 
              rows="5" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              className="w-full border p-2 mt-2 rounded-md"
            />
          ) : (
            <p className="text-gray-700 mt-2">
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1 text-blue-500">
                  @{comment.tag.username}
                </Link>
              )}
              {content.length < 100 ? content : readMore ? content : `${content.slice(0, 100)}...`}
              {content.length > 100 && (
                <span 
                  className="readMore cursor-pointer text-blue-500" 
                  onClick={() => setReadMore(!readMore)}>
                  {readMore ? ' Hide content' : ' Read more'}
                </span>
              )}
            </p>
          )}
          <div className="flex items-center justify-between mt-2 text-gray-500 text-sm">
            <span>{moment(comment.createdAt).fromNow()}</span>
            <div>
              {onEdit ? (
                <>
                  <span className="cursor-pointer" onClick={handleUpdate}>Update</span>
                  <span className="mx-2">•</span>
                  <span className="cursor-pointer" onClick={() => setOnEdit(false)}>Cancel</span>
                </>
              ) : (
                <>
                  <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnLike} />
                  <span className="mx-2">•</span>
                  <span>{comment.likes.length} likes</span>
                  <span className="mx-2">•</span>
                  <span className="cursor-pointer" onClick={handleReply}>{onReply ? 'Cancel' : 'Reply'}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="text-blue-500">
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      
      {/* Render replies */}
      <div className="children-comments">
        {children}
      </div>
    </div>
  );
};

export default CommentCard;
