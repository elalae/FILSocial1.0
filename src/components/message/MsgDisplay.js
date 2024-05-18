import React from 'react';
import Avatar from '../alert/Avatar';
import { imageShow, videoShow } from '../../utils/mediaShow';

const MsgDisplay = ({ user, msg }) => {
  const isSender = msg.sender === user._id;

  return (
    <div className={`mb-2 flex ${isSender ? 'justify-end' : 'justify-end'}`}>
      <div className={`flex flex-col items-start max-w-xs md:max-w-md lg:max-w-lg ${isSender ? 'items-end' : 'items-end'}`}>
        <div className="flex items-center mb-1">
          <Avatar src={user.avatar} />
          <span className="ml-2 font-semibold text-sm">{user.username}</span>
        </div>
        {msg.text && (
          <div className={`p-3 rounded-md text-sm ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {msg.text}
          </div>
        )}
        {msg.media.map((item, index) => (
          <div key={index} className="mb-1 max-w-xs">
            {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
          </div>
        ))}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(msg.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default MsgDisplay;
