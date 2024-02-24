import React from 'react';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className={`toast show fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}>
      <div className={`toast-header ${bgColor}`}>
        <strong className="mr-auto">{msg.title}</strong>
        <button className="ml-2 mb-1 close" data-dismiss="toast" style={{ outline: 'none' }}
          onClick={handleShow}>&times;</button>
      </div>
      <div className="toast-body">
        {msg.body}
      </div>
    </div>
  );
}

export default Toast;
