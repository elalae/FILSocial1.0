import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'
import { Link } from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
     
    useEffect(() => {
        if(search && auth.token){
            getDataAPI(`search?username=${search}`,auth.token)
            .then(res => setUsers(res.data.users))
            .catch(err => {
                dispatch({
                    type: GLOBALTYPES.ALERT, payload: {
                        error: err.response.data.msg
                    }
                })
            })
        }
    },[search, auth.token, dispatch])


    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    return (
        
        <div className="relative md:flex items-center bg-white rounded-full shadow-md">
            <input
                type="text"
                name="search"
                value={search}
                id="search"
                placeholder="Enter to Search"
                title="Enter to Search"
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                className="w-full rounded-full py-2 px-14 text-sm focus:outline-none"
                onSubmit={handleClose}
                />
          

                {!search && (
                    <button className="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-500">search</span>
                    </button>
                )}

                {search && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <span className="material-icons text-gray-500" onClick={handleClose}>×</span>
                </div>
                )}
                
                <div className="absolute bg-white rounded-md shadow-lg overflow-hidden mt-2 w-full z-10" style={{ top: '100%' }} >
            {users.length > 0 && (
                users.map(user => (
       
                        <UserCard 
                        key={user._id}
                        user={user} 
                        border="border"
                         handleClose={handleClose}/>
             
                ))
            )}
        </div>
    </div>
)
}

export default Search