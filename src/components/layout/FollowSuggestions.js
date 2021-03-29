import React from 'react';
import User from './../layout/User';
import { useContext, useEffect, useCallback } from 'react';
import { AppContext } from './../../context/appContext';
import  { SET_USERS } from './../../context/types';

const FollowSuggestions = () => {
  const [ state, dispatch ] = useContext(AppContext);

  const refresh = useCallback( async() => {
    // dispatch({ type: LOADING_DATA });
    try {
        const response = await fetch('/api/users/');
        const usersRes = await response.json();
        // console.log(postRes);
        dispatch({ type: SET_USERS, payload: usersRes })
    } catch(err) {
        console.log(err)
        dispatch({ type: SET_USERS, payload: [] })
    }
  }, []);

  useEffect(() => {
      refresh(); 
  }, [refresh]);

   const usersMarkup = state.users.map(user =>{
            return <User key={user._id} user={user} />
        }
        )

  return (
    <div className="classes root">
      {usersMarkup}
    </div>
  )
}

export default FollowSuggestions;