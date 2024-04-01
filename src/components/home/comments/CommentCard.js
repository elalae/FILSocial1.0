import React, { useState, useEffect} from 'react';
import Avatar from '../../alert/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LikeButton from '../../profile/LikeButton';
import { useSelector, useDispatch} from 'react-redux';
import CommentMenu from './CommentMenu';
import { updateComment, likeComment , unLikeComment} from '../../../redux/actions/commentAction';


const CommentCard = ({ comment, post }) => {
  const { auth } = useSelector(state => state);

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);


  const handleUpdate = () => {
    if(comment.content !== content){
        dispatch(updateComment({comment, post, content, auth}))
        setOnEdit(false)
    }else{
        setOnEdit(false)
    }
}

  useEffect(() => {
    setContent(comment.content)
    if(comment.likes.find(like => like._id === auth.user._id)){
      setIsLike(true)
    }
  }, [comment, auth.user._id]);

  const handleLike =  async () => {
    if(loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({comment, post, auth}))
    setLoadLike(false);
  }

  const handleUnLike = async () => {
    if(loadLike) return;
    setIsLike(false);
    
    setLoadLike(true);
    await dispatch(unLikeComment({comment, post, auth}))
    setLoadLike(false);
  }

  const styleCard = `opacity-${comment.user._id === post.user._id ? '100' : '60'} pointer-events-${comment._id ? 'auto' : 'none'}`;

  return (
<div className="mt-4 bg-white shadow border rounded-lg p-4 relative">
  <Link to={`/profile/${comment.user._id}`} className="flex items-center space-x-2 no-underline text-gray-900">
    <Avatar src={comment.user.avatar} size="small" />
    <span className="font-medium">{comment.user.username}</span>
  </Link>

  <div className="comment_content mt-2 " >
  {
      onEdit 
      ? <textarea rows="5" value={content}
      onChange={e => setContent(e.target.value)} />
      :  <p className="text-gray-700">
 
      {content.length < 100 ? content : readMore ? content : content.slice(0, 100) + '...'}
      {content.length > 100 && (
        <span className="readMore cursor-pointer text-blue-500 hover:text-blue-600" onClick={() => setReadMore(!readMore)}>
          {readMore ? ' Hide content' : ' Read more'}
        </span>
        
      )}
    </p>
      }
   

    <div className="flex items-center justify-end  ">
    <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnLike} />
      <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
    </div>
    
    <div className=" flex items-stretch text-sm mt-2 text-gray-500">
      <span>{moment(comment.createdAt).fromNow()}</span>
      <span className="mx-2">•</span>
      <span>{comment.likes.length} likes</span>
      
    
    
        {
          onEdit
          ? <>
          <span className="mx-2">•</span><span className="cursor-pointer text-gray-500 hover:text-gray-600" onClick={handleUpdate}>update</span>
          <span className="mx-2">•</span><span className="cursor-pointer text-gray-500 hover:text-gray-600" onClick={() => setOnEdit(false)}>cancel</span>
          </>
          
          :<><span className="mx-2">•</span><span className="cursor-pointer text-gray-500 hover:text-gray-600">reply</span></>
        }
  
    

    </div>


  </div>
</div>

  );
};

export default CommentCard;
