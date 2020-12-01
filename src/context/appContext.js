import { ContactsOutlined } from '@material-ui/icons';
import React, { useReducer, createContext } from 'react';
import { SET_POSTS, LOADING_DATA , LOADING_UI, POST_POST, SET_ERRORS, CLEAR_ERRORS} from './types';

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
        case LOADING_UI:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loading: true
                }
            }
        case SET_ERRORS:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loading: false,
                    errors: action.payload
                }
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loading: false,
                    errors: null,
                }
            }
        case SET_POSTS:
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: action.payload,
                    loading: false
                }
            }
        case POST_POST:
            console.log('inside post-post')
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: [
                        action.payload,
                        ...state.post.posts
                    ]
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