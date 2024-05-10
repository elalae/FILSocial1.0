import React from 'react'
import Avatar from '../alert/Avatar'
import {imageShow, videoShow} from '../../utils/mediaShow'

const MsgDisplay = ({ user, msg }) => {
    return (
        <div className="flex items-start space-x-2 my-1">
            <Avatar src={user.avatar} size="small" className="shrink-0" />
            <div className="flex flex-col bg-gray-200 rounded-lg p-3 shadow">
                <div className="text-sm font-medium">{user.username}</div>
                <div className="text-xs text-gray-600">
                    {
                    msg.text && <div className="chat_text">{msg.text}</div>
                    }
                    {
                             msg.media.map((item,index)=>(
                                <div key={index}>
                                    {
                                        item.url.match(/video/i)
                                        ? videoShow(item.url)
                                        : imageShow(item.url)
                                    }
                                </div>
                             )) 
                    }
                </div>
                <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</div>
            </div>
        </div>
    );
};

export default MsgDisplay;

