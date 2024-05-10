import React from 'react';
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';

const Conversation = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <LeftSide />
      </div>
      <div className="w-3/4 bg-white"> 
        <RightSide/>
      </div>
    </div>
  );
};

export default Conversation;
