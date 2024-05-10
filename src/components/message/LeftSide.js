import React, { useState } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { addUser } from '../../redux/actions/messageAction'

const LeftSide = () => {
    const { auth, message } = useSelector(state => state)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const history = useHistory()
    const { id } = useParams()


    const handleSearch = async e => {
        e.preventDefault()
        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch(addUser({ user, message }))
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        return id === user._id ? 'bg-blue-100' : 'bg-white'
    }

    return (
        <div className="flex flex-col h-full overflow-auto">
            <form className="p-4 border-b border-gray-300" onSubmit={handleSearch}>
                <input type="text" value={search}
                placeholder="Enter to search..."
                onChange={e => { setSearch(e.target.value) }}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Search
                </button>
            </form>

            <div className="message_chat_list flex-grow overflow-y-auto">
                {
                    searchUsers.length !== 0 ?
                    searchUsers.map(user => (
                        <div key={user._id} className={`message_user p-3 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer ${isActive(user)}`}
                        onClick={() => handleAddUser(user)}>
                            <UserCard user={user}>
                                <i className="fas fa-circle text-green-500"/>
                            </UserCard>
                        </div>
                    ))
                    :
                    message.users.map(user => (
                        <div key={user._id} className={`message_user p-3 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer ${isActive(user)}`}
                        onClick={() => handleAddUser(user)}>
                            <UserCard user={user} msg={true}>
                                <i className="fas fa-circle text-green-500"/>
                            </UserCard>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LeftSide;
