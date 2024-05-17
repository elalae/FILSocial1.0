import React from "react";
import Avatar from "./alert/Avatar";
import { Link } from "react-router-dom";


const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {
    const avatarSize = 'small';


    const handleCloseAll = () => {
        if(handleClose) handleClose();
        if(setShowFollowers) setShowFollowers(false);
        if(setShowFollowing) setShowFollowing(false);
    }

    return (
        <div className={`flex justify-between items-center bg-white rounded-lg shadow p-3 ${border ? 'border border-gray-300' : ''}`}>
            <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="flex items-center">
                <Avatar src={user.avatar} size={avatarSize} className="rounded-full" />
                <div className="ml-4">
                    <span className="block font-medium text-gray-700 hover:text-blue-500">{user.username}</span>
                    
                    <small className="text-gray-500 hover:text-orange-500">
                    {
                        msg
                        ? <>
                        <div>{user.text}</div>
                        {user.media.length > 0 && 
                        <div>
                            {user.media.length} <i className="fas fa-image"/>
                        </div>
                        }
                        </>
                        :user.fullname
                    }
                    </small>
                </div>
            </Link>
            
            <div>
                {children}
            </div>
        </div>
    );
};

export default UserCard;