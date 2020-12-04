import { ContactsOutlined } from '@material-ui/icons';
import React, { useReducer, createContext } from 'react';
import { SET_USER, SET_USER_POSTS, SET_POSTS, LOADING_DATA , LOADING_UI, POST_POST, SET_ERRORS, CLEAR_ERRORS, LOADING_USER, LIKE_POST, UNLIKE_POST, SUBMIT_COMMENT, DELETE_POST } from './types';

export const AppContext = createContext();

const initialState = {
    post: {
        posts: [],
        post: {},
        loading: false,
    },
    user: {
        authenticated: false,
        credentials: {},
        myPosts: [],
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
        case SET_USER:
            console.log(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticated: true,
                    credentials: {...action.payload}
  
                }
            }
        case SET_USER_POSTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    myPosts: action.payload
                }
            }
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
            // console.log('inside post-post')
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: [
                        action.payload,
                        ...state.post.posts
                    ]
                },
                ui: {
                    loading: false,
                }
            }
        case LIKE_POST:
        case UNLIKE_POST: 
            const likeUpdatedPosts = state.post.posts.map(post => {
                // console.log(post, action.payload)
                if(post._id == action.payload._id){
                    return post = action.payload;
                } else { return post } 
            })
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: likeUpdatedPosts
                }
            }
        case SUBMIT_COMMENT:
            // console.log(state.post.posts, action.payload)
            const commentUpdatedPosts = state.post.posts.map(post => {
                if(post._id == action.payload._id){
                    // console.log('found a match')
                    return post = action.payload;
                } else {return post}
            })
            // console.log(commentUpdatedPosts);
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: commentUpdatedPosts
                }
            }
        case DELETE_POST: 
        // console.log(action.payload)
            const deleteUpdatedPosts = state.post.posts.filter(post => post._id !== action.payload._id) 
            // console.log( 'deleteUpdatedposts', deleteUpdatedPosts);
            return {
                ...state,
                post: {
                    ...state.post,
                    posts: deleteUpdatedPosts
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