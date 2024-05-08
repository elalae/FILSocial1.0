import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../components/UserCard';
import FollowBtn from '../components/profile/FollowBtn';
import { getSuggestions } from '../redux/actions/suggestionsAction';

const RightSideBar = () => {
  const { auth, suggestions } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="sticky top-20 mt-16 max-h-screen overflow-y-auto p-4 bg-white border-l">
      <UserCard user={auth.user} className="border p-3 rounded-lg shadow-sm mb-4" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">Suggestions for you</h3>
        {!suggestions.loading && (
          <i className="fas fa-redo text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => dispatch(getSuggestions(auth.token))} />
        )}
      </div>

      {suggestions.loading ? (
        <img src="../../images/loading.gif" alt="loading" className="block mx-auto" />
      ) : (
        suggestions.users.map(user => (
          <div key={user._id} className="border p-3 rounded-lg shadow-sm space-y-4">
            <UserCard user={user}>
              <FollowBtn user={user} />
            </UserCard>
          </div>
        ))
      )}
    </div>
  );
}


export default RightSideBar;
