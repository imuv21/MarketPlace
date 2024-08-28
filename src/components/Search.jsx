import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searching } from '../slices/usersSlice';

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { searchedUsers, loadingSearchedUsers, errorSearchedUsers } = useSelector((state) => state.users);

  const handleSearch = () => {
    dispatch(searching({ searchQuery }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clear = () => {
    setSearchQuery('');
    dispatch(searching({ searchQuery: '' }));
  };

  return (
    <div className="search-component">
      <div className='flex center wh'>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search here...' onKeyPress={handleKeyPress} /><button onClick={handleSearch}>Search</button>
      </div>
      
     { searchQuery && <button className='clear-btn' onClick={clear}>Clear</button>}

      {loadingSearchedUsers && <p className='text'>Loading...</p>}
      {errorSearchedUsers && <p className='text'>{errorSearchedUsers.message}</p>}
      {!loadingSearchedUsers && !errorSearchedUsers && searchedUsers.length === 0 && (
        <p className="text">There are no users yet.</p>
      )}

      <div className='flexcol start-center wh g5'>
        {!loadingSearchedUsers && !errorSearchedUsers && searchedUsers && searchedUsers.length > 0 && (
          searchedUsers.map(user => (
            <div key={user._id}>
              <div className="notification">
                <img src={user.image} alt={user.firstName} /> {user.firstName} {user.lastName}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
};

export default Search;