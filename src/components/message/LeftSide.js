import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../UserCard';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useHistory, useParams } from 'react-router-dom';
import { addUser, getConversations } from '../../redux/actions/messageAction';

const LeftSide = () => {
    const { auth, message } = useSelector(state => state);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);

    const history = useHistory();
    const { id } = useParams();

    const pageEnd = useRef();
    const [page, setPage] = useState(0);

    const handleSearch = async e => {
        e.preventDefault();
        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token);
            setSearchUsers(res.data.users);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            });
        }
    };

    const handleAddUser = (user) => {
        setSearch('');
        setSearchUsers([]);
        dispatch(addUser({ user, message }));
        return history.push(`/message/${user._id}`);
    };

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return '';
    };

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }));
    }, [dispatch, auth, message.firstLoad]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1);
            }
        }, {
            threshold: 0.1
        });
        observer.observe(pageEnd.current);
    }, [setPage]);

    useEffect(() => {
        if (message.resultUsers >= (page - 1) * 9 && page > 1) {
            dispatch(getConversations({ auth, page }));
        }
    }, [message.resultUsers, page, auth, dispatch]);

    return (
        <>
            <form className="message_header flex items-center p-3 border-b border-gray-300 bg-white" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                    Search
                </button>
            </form>

            <div className="message_chat_list overflow-y-auto p-4">
                {searchUsers.length !== 0 ? (
                    <>
                        {searchUsers.map(user => (
                            <div key={user._id} className={`message_user p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${isActive(user)}`} onClick={() => handleAddUser(user)}>
                                <UserCard user={user} />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {message.users.map(user => (
                            <div key={user._id} className={`message_user p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${isActive(user)}`} onClick={() => handleAddUser(user)}>
                                <UserCard user={user} msg={true} />
                            </div>
                        ))}
                    </>
                )}
                <button ref={pageEnd} style={{ opacity: 0 }}>Load More</button>
            </div>
        </>
    );
};

export default LeftSide;
