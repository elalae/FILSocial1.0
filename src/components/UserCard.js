import React from "react"
import Avatar from "./alert/Avatar"
import {Link} from "react-router-dom"

const UserCard = ({ user, border, handleClose }) => {
    const avatarSize = 'small';

    const handleCloseAll = () => {
        if(handleClose) handleClose();
    }

    return (
        <div className={`flex items-center justify-between bg-white rounded-lg shadow p-3 ${border ? 'border border-gray-300' : ''}`}>
            <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="flex items-center w-full">
                <Avatar src={user.avatar} size={avatarSize} className="rounded-full" />
                <div className="ml-4 flex-grow">
                    <span className="block font-medium text-gray-700 hover:text-blue-500">{user.username}</span>
                    <small className="text-gray-500 hover:text-orange-500">{user.fullname}</small>
                </div>
            </Link>
        </div>
    )
}

export default UserCard
