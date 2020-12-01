import { ContactsOutlined } from '@material-ui/icons';
import React, { useReducer, createContext } from 'react';
import { SET_POSTS, LOADING_DATA } from './types';

export const AppContext = createContext();

const initialState = {
    post: {
        posts: [],
        post: {},
        loading: false,
    },
    user: {
        authenticated: false,
        loading: false,
        credentials: {},
        likes: [],
        notifications: []
    },
    ui: {
        loading: false,
        errors: null
    }
}

const appReducer = (state, action) => {
    switch (action.type) {
        case LOADING_DATA: 
        // console.log('setting LOADING_DATA to true')
        // console.log({...state.posts})
            return {
                ...state,
                post: {
                    ...state.post,
                    loading: true
                }
            }
        case SET_POSTS:
            console.log(action.payload)
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: action.payload,
                    loading: false
                }
            }
        default:
            return state
    }
}

export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return(
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}