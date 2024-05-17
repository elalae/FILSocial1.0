import React from 'react';
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';

const Conversation = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 border-r border-gray-300 p-4 overflow-y-auto">
        <LeftSide />
      </div>
      <div className="w-3/4 flex flex-col bg-white p-6 overflow-y-auto">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
